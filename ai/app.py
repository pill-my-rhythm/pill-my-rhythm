import pymysql
from test_model import test_model
from flask import Flask, request, jsonify
from flask_cors import CORS

import os 
from dotenv import load_dotenv
load_dotenv()


# Flask 앱
app = Flask(__name__)
CORS(app)
CORS(app, resources={r'': {'origins': ''}}, expose_headers=["Content-disposition"])

db = pymysql.connect(host = os.environ.get('host'), 
                    port = int(os.environ.get('port')), 
                    user = os.environ.get('user'), 
                    password = os.environ.get('password'), 
                    db = os.environ.get('db'), 
                    charset='utf8')
cursor = db.cursor()


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/recommend", methods=['POST'])
def recommend():
    sentence = request.get_json()["sentence"]
    supplement = test_model(sentence)
    recommend_supplement = []
    for i in supplement:
        sql = """SELECT * FROM tb_supplement WHERE pk_supplement_id = '%s'""" % (i+1)
        cursor.execute(sql)
        print(cursor.description[0])
        recommend_supplement.append(dict(zip([column[0] for column in cursor.description], cursor.fetchone())))
    db.close()
    return {'results': recommend_supplement}


if __name__ == '__main__':
    app.run(port=5002, debug=True)