from flask import Flask, request, jsonify
import joblib
import numpy as np
import os
import requests
import zipfile
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Google Drive file IDs (Replace with your own)
MODEL_FILE_ID = "1wxTj2Ht7VhIATkdwUbx3SO5IaH513n1Y"
DATASET_FILE_ID = "184RaoXAKH8rnFVdG5MmNnbi2KRsqDF02"

# Set paths
MODEL_DIR = os.path.join(os.getcwd(), "models")
MODEL_PATH = os.path.join(MODEL_DIR, "best_chess_model.pkl")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.pkl")


# Function to download and extract files
def download_file_from_google_drive(file_id, dest_path):
    url = f"https://drive.google.com/uc?export=download&id={file_id}"
    response = requests.get(url, stream=True)
    
    if response.status_code == 200:
        with open(dest_path, "wb") as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        print(f"Downloaded: {dest_path}")
    else:
        raise Exception(f"Failed to download file: {file_id}")


# Ensure model files exist
if not os.path.exists(MODEL_PATH) or not os.path.exists(SCALER_PATH):
    print("Model files missing, downloading them...")

    # Create models directory if it doesn’t exist
    os.makedirs(MODEL_DIR, exist_ok=True)

    # Download and extract models.zip
    model_zip_path = os.path.join(MODEL_DIR, "models.zip")
    download_file_from_google_drive(MODEL_FILE_ID, model_zip_path)

    # Extract the zip file
    with zipfile.ZipFile(model_zip_path, "r") as zip_ref:
        zip_ref.extractall(MODEL_DIR)

    # Remove the zip file
    os.remove(model_zip_path)
    print("Model files are ready!")

# Load the trained outcome model and scaler
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

# Define outcome mapping
outcome_map = {0: "White Wins", 1: "Black Wins", 2: "Draw"}


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # Convert input values
        rated = int(data["rated"])
        turns = int(data["turns"])
        opening_eco = convertECOToNumeric(data["opening_eco"])
        opening_ply = int(data["opening_ply"])
        white_rating = int(data["white_rating"])
        black_rating = int(data["black_rating"])
        base_time = int(data["base_time"])
        increment = int(data["increment"])

        # Compute additional features
        rating_diff = white_rating - black_rating
        total_rating = white_rating + black_rating

        # Create feature array
        features = np.array([
            rated, turns, opening_eco, opening_ply, 
            white_rating, black_rating, base_time, 
            increment, rating_diff, total_rating
        ]).reshape(1, -1)

        # Scale features
        features_scaled = scaler.transform(features)

        # Predict outcome
        prediction = model.predict(features_scaled)[0]
        result = outcome_map.get(prediction, "Unknown")

        return jsonify({"prediction": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Helper function to convert ECO code to numeric value
def convertECOToNumeric(eco):
    if isinstance(eco, int):
        return eco
    if not isinstance(eco, str):
        raise ValueError("ECO code must be a string (e.g., 'C00') or an integer.")
    letter = eco[0].upper()
    number = int(eco[1:])
    return (ord(letter) - ord("A")) * 100 + number


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
