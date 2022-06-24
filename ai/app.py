import pymysql
from test_model import test_model
from flask import Flask, request, g
from verifyToken import verifyToken
import os 
from dotenv import load_dotenv
load_dotenv()


# Flask 앱
app = Flask(__name__)

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
@verifyToken
def recommend():
    sentence = request.get_json()["sentence"]
    fk_user_id = g.userId
    supplement = test_model(sentence)

    recommend_supplement = []
    for i in supplement:
        select_sql = """SELECT * FROM tb_supplement WHERE pk_supplement_id = '%s'""" % (i+1)
        cursor.execute(select_sql)
        recommend_supplement.append(dict(zip([column[0] for column in cursor.description], cursor.fetchone())))
    
    if fk_user_id is not None: 
        insert_sql = """INSERT INTO tb_recommend (created_at, updated_at, fk_user_id, fk_supplement_id) VALUES (now(), now(), fk_user_id, %s)"""
        for idx in supplement: 
            print(idx)
            cursor.execute(insert_sql, (idx))
        db.commit()
    
    # db.close()
    return {'results': recommend_supplement}


if __name__ == '__main__':
    app.run(port=5002, debug=True)