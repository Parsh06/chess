from flask import Flask, request, jsonify
import joblib
import numpy as np
import os
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Helper function: Convert ECO code to numeric value.
def convertECOToNumeric(eco):
    # If eco is already an integer, return it.
    if isinstance(eco, int):
        return eco
    # Otherwise, assume it's a string (e.g., "C00")
    if not isinstance(eco, str):
        raise ValueError("ECO code must be a string (e.g., 'C00') or an integer.")
    if len(eco) < 2:
        raise ValueError("Invalid ECO code format. It should be like 'C00'.")
    letter = eco[0].upper()
    try:
        number = int(eco[1:])
    except ValueError:
        raise ValueError("Invalid ECO code format. It should be like 'C00'.")
    return (ord(letter) - ord("A")) * 100 + number

# Set model directory and paths
MODEL_DIR = os.path.join(os.getcwd(), "models")
MODEL_PATH = os.path.join(MODEL_DIR, "best_chess_model.pkl")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.pkl")

# Ensure model files exist
if not os.path.exists(MODEL_PATH) or not os.path.exists(SCALER_PATH):
    raise FileNotFoundError("Model or scaler file not found in 'models' directory.")

# Load the trained outcome model and scaler
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

# Define outcome mapping (same as used during training)
outcome_map = {0: "White Wins", 1: "Black Wins", 2: "Draw"}

@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # Validate and convert input values.
        # Expecting ECO code to be either a string (like "C00") or an int.
        try:
            rated = int(data["rated"])
            turns = int(data["turns"])
            # Use the helper function which now handles both string and int
            opening_eco = convertECOToNumeric(data["opening_eco"])
            opening_ply = int(data["opening_ply"])
            white_rating = int(data["white_rating"])
            black_rating = int(data["black_rating"])
            base_time = int(data["base_time"])
            increment = int(data["increment"])
        except (KeyError, ValueError) as e:
            return jsonify({"error": f"Invalid input format: {str(e)}"}), 400

        # Compute additional features: rating difference and total rating
        rating_diff = white_rating - black_rating
        total_rating = white_rating + black_rating

        # Create feature array (ensure the order matches the training data)
        features = np.array([
            rated,
            turns,
            opening_eco,
            opening_ply,
            white_rating,
            black_rating,
            base_time,
            increment,
            rating_diff,
            total_rating
        ]).reshape(1, -1)

        # Scale features
        try:
            features_scaled = scaler.transform(features)
        except ValueError as e:
            return jsonify({"error": f"Scaling error: {str(e)}"}), 400

        # Predict outcome using the model
        try:
            prediction = model.predict(features_scaled)[0]
            result = outcome_map.get(prediction, "Unknown")
            return jsonify({"prediction": result})
        except Exception as e:
            return jsonify({"error": f"Prediction error: {str(e)}"}), 500

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

