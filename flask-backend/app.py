from flask import Flask, request
from flask_cors import CORS
import cv2 as cv
from tensorflow.keras.models import load_model
import preprocessor as p

app = Flask("__main__")
CORS(app)

@app.route("/upload", methods=['GET', 'POST'])
def upload():
    image = request.files['image']
    if image:
        image.save('./temp/'+image.filename)
    return {'message': 'successfully saved'}

@app.route('/predict', methods=['GET'])
def predict():
    file_name = request.args.get('uploaded_file_name')
    image_object = cv.imread('./temp/'+file_name)
    print('image_object', image_object)
    data = p.preprocess_image(image_object)
    model = load_model('./model/digit_recognition_model.h5')
    image_class = model.predict_classes(data)
    return {'class': int(image_class[0])}

if __name__ == "__main__":
    app.run(debug=True)