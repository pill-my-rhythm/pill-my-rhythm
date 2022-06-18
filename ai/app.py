from flask import Flask, request, jsonify
from flask_cors import CORS
from test_model import test_model

# Flask 앱
app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/recommend", methods=['GET'])
def recommend():
    sentence = request.get_json()['sentence']
    supplement = test_model(sentence)
    return supplement


if __name__ == '__main__':
    app.run(port=5002, debug=True)
