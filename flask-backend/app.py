from flask import Flask, render_template
from flask_cors import CORS


app = Flask("__main__")
CORS(app)

@app.route("/message", methods=['GET', 'POST'])
def index():
    return {'message': 'hello'}



if __name__ == "__main__":
    app.run(debug=True)