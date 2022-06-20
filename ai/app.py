from flask import Flask, request, jsonify
from test_model import test_model

# Flask 앱
app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/recommend", methods=['GET'])
def recommend():
    sentence = request.args.to_dict().get("sentence")
    supplement = test_model(sentence)
    result = {}
    result['index'] = supplement
    return jsonify(result)

if __name__ == '__main__': 
    app.run(port=5002, debug=True)
