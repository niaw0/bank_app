import os
import secrets

import bcrypt
import psycopg2
import psycopg2.pool as psypool
import redis
from dotenv import load_dotenv
from flask import Flask, jsonify, request, session
from flask_cors import CORS

app = Flask(__name__)


load_dotenv()


# connect to db and connect as customer with read only access
CORS(app, origins=["http://localhost:5173"])
# db_conn = psycopg2.connect("dbname=bank_db user=customer host=localhost")
db_pool = psypool.SimpleConnectionPool(
    3, 4, user="postgres", password="postgres", host="localhost"
)

r = redis.Redis(host="localhost", port=6379, decode_responses=True)


@app.route("/api/login", methods=["POST"])
def login():

    data = request.get_json() or {}

    # get email and password from form submission - disregard dob at this point in time will change
    email = str(data.get("email", "")).strip().lower()
    password = str(data.get("password", ""))

    if not email or not password:
        return jsonify({"error": "Please enter username and password"})

    try:
        login_con = db_pool.getconn()
        cur = login_con.cursor()

        query = """SELECT id, email, password_hash FROM customers WHERE email = %s;"""
        cur.execute(query, (email,))
        result = cur.fetchone()

        # use a dummy hash if there is no password
        dummy_hash = b"$2b$12$CwTycUXWue0Thq9StjUM0uJ8vHJh0M1mXpVwZaTf5N5j3s4H3h2Su"

        # convert both to utf-8 for comparison
        pass_utf = password.encode("utf-8")
        passdb_utf = result[2].encode("utf-8") if result else dummy_hash

        # compare the given password with the hash in the db
        compared = bcrypt.checkpw(pass_utf, passdb_utf)

        if not result or not compared:
            return jsonify({"error": "invalid login credentials"}), 401

        uid = result[0]

        # epic secret
        session_id = secrets.token_urlsafe(32)
        session_key = f"user-session:{session_id}"
        r.hset(
            session_key,
            mapping={"id": session_id, "email": email, "uid": uid},
        )
        r.expire(session_key, 1800)
        response = jsonify({"id": uid})
        response.set_cookie(
            key="session_cookie",
            value=session_id,
            httponly=True,
            secure=os.environ.get("SECURE_REDIS"),  # enable in production
            samesite="Strict",
            max_age=1800,
        )

        cur.close()

        return response
    except Exception as e:
        app.logger.error(f"Database/Login error: {e}")
        return jsonify({"error": "internal server error 5xx :("})
    finally:
        if login_con:
            db_pool.putconn(login_con)


# need to check if user is authentication before redirection


#  return redirect("/dashboard")


@app.route("/api/signup", methods=["POST"])
def signup():

    session_cookie = request.cookies.get("session_cookie")
    if r.exists(f'session:{session_cookie}'):
        return 


    data = request.get_json() or {}
    name = data.get("name")
    email = str(data.get("email")).strip().lower()
    dob = data.get("dob")
    password = str(data.get("password"))

    if not email or password:
        return jsonify({'error': 'invalid email or password'})

    
    try:

        pass_bytes = password.encode("utf-8")
        salt = bcrypt.gensalt(12)
        password_hash = bcrypt.hashpw(pass_bytes, salt).decode("utf-8")

        query = """
        INSERT INTO customers (name, email, dob, password_hash) VALUES (%s, %s, %s, %s);
        """

        cur.execute(query, (name, email, dob, password_hash))

        r.set("email", email)

        # cur.close()


    #    return redirect("/dashboard")


if __name__ == "__main__":
    app.run(debug=True, port=5002)
