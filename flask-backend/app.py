from flask import Flask, render_template, request
from flask_cors import CORS
import pandas as pd
import numpy as np
import cv2 as cv
from tensorflow.keras.models import load_model
from Preprocessing import preprocessor as p

app = Flask("__main__")
CORS(app)

@app.route("/upload", methods=['GET', 'POST'])
def upload():
    image = request.files['myFile']
    if image:
        image.save('my_uploaded_file')
    return {'message': 'successfully saved'}

@app.route('/predict', methods=['GET'])
def predict():
    image_object = cv.imread('my_uploaded_file')
    data = p.preprocess_image(image_object)
    model = load_model('./model/digit_recognition_model.h5')
    image_class = model.predict_classes(data)
    return {'class': int(image_class[0])}

if __name__ == "__main__":
    app.run(debug=True)