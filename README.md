# Handwritten_Digit_Classification

A complete web application made using react, flask and Python juputer notebook to classify handwritten digit images. Users can upload an input image and classify the output in numbers (0 - 9).

- input - handwritten digit images of dimension 28x28.

Code details:
- react-frontend -  contains react code and cypress tests.
- flask-backend - contains API end points and deployed model used for classification.
- preprocessor.py - contains code used to preprocess incomming images- resembles preprocessing steps used during model development. 

Cypress:
- Testing framework used for testing the UI
- Test cases can be seen in react-frontend/cypress/integration/

Pytest:
- Used for testing the API endpoints of flask
- Tests can be seen in flask-backend/test/test_app.py
