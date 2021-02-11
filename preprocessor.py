from tensorflow.keras.utils import normalize

def preprocess_image(image_object):
    image_object = image_object[:, :, 0]
    image_object = normalize(image_object)
    preprocessed_data = image_object.reshape(1, 28, 28, 1)
    return preprocessed_data