from flask import Flask, request, jsonify
import uuid
from flask_cors import CORS
import psycopg2
from psycopg2 import Error
from flask_login import LoginManager
import bcrypt 

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"])
db_conn = psycopg2.connect("dbname=bank_vault user=customer host=localhost")

db_cur = db_conn.cursor()



@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json() or {}

    username = str(data.get('username'))
    password = str(data.get('password'))


    if not username or not password:
        return "no username or password"

    cur.execute("SELECT username, password_hash FROM customers WHERE username = %s AND password_hash = %s;", (username, password_hash))
    result = cur.fetchone();
    print()
    bcrypt.compare(password)
    



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


#    return redirect("/dashboard")





if __name__ == '__main__':
    app.run(debug = True, port=5000)
