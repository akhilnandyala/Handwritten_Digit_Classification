from flask import Flask, render_template, request
from flask_cors import CORS
import pandas as pd
import numpy as np
import cv2 as cv
from tensorflow.keras.models import load_model



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
    image_object = cv.imread('./my_uploaded_file')
    image_object = image_object[:, :, 0]
    print('1' ,image_object)
    image_object = cv.resize(image_object, (28, 28))
    print('2', image_object)
    data = np.asarray(image_object) / 255.0
    print('3', data)
    data = data.reshape(1, 28, 28, 1)
    print('4', data)
    model = load_model('./model/digit_recognition_model.h5')
    image_class = model.predict_classes(data)
    print('image class', image_class)
    return {'class': int(image_class[0])}

if __name__ == "__main__":
    app.run(debug=True)