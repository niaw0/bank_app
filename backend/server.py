from flask import Flask, request, jsonify, session
import uuid
from flask_cors import CORS
import psycopg2
from psycopg2 import Error
from flask_login import LoginManager
import bcrypt 
from dotenv import load_dotenv



app = Flask(__name__)

load_dotenv()


#connect to db and connect as customer with read only access
CORS(app, origins=["http://localhost:5173"])
db_conn = psycopg2.connect("dbname=bank_db user=customer host=localhost")
cur = db_conn.cursor()




@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json() or {}

    email = str(data.get('email'))
    password = str(data.get('password'))


    if not email or not password:
        return jsonify({"error": "username or password required"})

    query = """SELECT id, email, password_hash FROM customers WHERE email = %s;"""
    cur.execute(query, (email,))
    result = cur.fetchone()
    cur.close()

    
    compared = bcrypt.checkpw(password, result[2])


    
    if compared == True:
        session['email'] = result[1]
        session['id'] = result[0] 

        return redirect("/dashboard")
    else:
        return jsonify({"error": "invalid credentials" }), 401

    



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

    cur.close()




#    return redirect("/dashboard")


@app.route('/api/dashboard_data', methods=[POST])
def dashboard_data():
    return 0





if __name__ == '__main__':
    app.run(debug = True, port=5000)
