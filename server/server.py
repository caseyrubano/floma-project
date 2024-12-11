from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for Angular frontend

# Firebase setup
cred = credentials.Certificate("firebase-adminsdk.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
documents_collection = db.collection('documents')
cities_collection = db.collection('cities')

# Routes

@app.route('/documents', methods=['POST'])
def add_document():
    data = request.json
    if 'title' not in data:
        return jsonify({'error': 'Title is required'}), 400
    new_document = documents_collection.document()
    new_document.set({'id': new_document.id, 'title': data['title'], 'body': data['body']})
    return jsonify({'id': new_document.id, 'title': data['title'], 'body': data['body']}), 201

@app.route('/documents/<string:document_id>', methods=['PUT'])
def update_document(document_id):
    data = request.json
    document_ref = documents_collection.document(document_id)
    document_ref.update({'title': data['title'], 'body': data['body']})
    return jsonify({'id': document_id, 'title': data['title'], 'body': data['body']}), 200

if __name__ == '__main__':
    app.run(debug=True)
