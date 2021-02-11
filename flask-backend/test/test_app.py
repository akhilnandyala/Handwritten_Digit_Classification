from app import app
from io import BytesIO

def test_app_upload():
    client = app.test_client()
    data = {
        'image': (BytesIO(b'sample content'), 'upload_test_file'),
    }
    print(data)
    response = client.post('/upload', data=data)
    print(response.status_code, response.data)
    assert response.status_code == 200
    assert response.json['message'] == 'successfully saved'

def test_app_predict():
    client = app.test_client()
    data = {'uploaded_file_name': 'test_file.jpg'}
    response = client.get('/predict', query_string=data)
    print(response.status_code, response.data)
    assert response.status_code == 200
    assert response.json['class'] == 3

