from flask import Flask, request, jsonify, session
import uuid
from flask_cors import CORS
import psycopg2
from psycopg2.pool
import bcrypt 
from dotenv import load_dotenv
import secrets
import redis





app = Flask(__name__)

r = redis.Redis(host="localhost", port=6379, decode_responses = True)

load_dotenv()


#connect to db and connect as customer with read only access
CORS(app, origins=["http://localhost:5173"])
db_conn = psycopg2.connect("dbname=bank_db user=customer host=localhost")
db_pool = SimpleConnectionPool
cur = db_conn.cursor()




@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json() or {}


# get email and password from form submission - disregard dob at this point in time
    email = str(data.get('email' , '')).strip().lower()
    password = str(data.get('password', ''))


    if not email or not password:
        return jsonify({'error': 'Please enter username and password'})
    query = """SELECT id, email, password_hash FROM customers WHERE email = %s;"""
    cur.execute(query, (email,))
    result = cur.fetchone()


    

    #use a dummy hash if there is no password
    dummy_hash = b"$2b$12$CwTycUXWue0Thq9StjUM0uJ8vHJh0M1mXpVwZaTf5N5j3s4H3h2Su"

    #convert both to utf-8 for comparison
    pass_utf = password.encode('utf-8')
    passdb_utf = result[2].encode('utf-8') if result else dummy_hash
    

    #compare the given password with the hash in the db
    compared = bcrypt.checkpw(pass_utf, passdb_utf)


    if not result or not compared:
        return jsonify({'error': 'invalid login credentials'}), 401



    uid = result[0]

    #epic secret
    session_id = secrets.token_urlsafe(32)

    
    r.hsetex(f'user-session:{session_id}', mapping={
            'id': session_id,
            'email': email,
            'uid': uid
        }, ex=1800)
    response = jsonify({
            'id': uid
        })
    response.set_cookie(
            key='session_cookie',
            value=session_id,
            httponly=True,
            secure=True,
            samesite='Strict',
            max_age=1800
        )


    return response

    



#need to check if user is authentication before redirection


#  return redirect("/dashboard")


@app.route('/api/signup', methods=['POST'])
def signup():

    data = request.get_json() or {}
    name = data.get('name')
    email = str(data.get('email'))
    dob = data.get('dob')
    password = str(data.get('password'))


    pass_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt(12)
    password_hash = bcrypt.hashpw(pass_bytes, salt).decode('utf-8')


    query = """
    INSERT INTO customers (name, email, dob, password_hash) VALUES (%s, %s, %s, %s);
    """


    cur.execute(query, (name, email, dob, password_hash))

    r.set('email', email)

    cur.close()




#    return redirect("/dashboard")


@app.route('/api/')





if __name__ == '__main__':
    app.run(debug = True, port=5000)
