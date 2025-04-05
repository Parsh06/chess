from flask import Flask, request, jsonify
import joblib
import numpy as np
import os
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set paths to models
MODEL_DIR = os.path.join(os.getcwd(), "models")
MODEL_PATH = os.path.join(MODEL_DIR, "best_chess_model.pkl")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.pkl")
MOVE_PREDICTION_MODEL_PATH = os.path.join(MODEL_DIR, "move_prediction_model.pkl")
MOVE_VECTORIZER_PATH = os.path.join(MODEL_DIR, "move_vectorizer.pkl")
OPENING_ECO_ENCODER_PATH = os.path.join(MODEL_DIR, "opening_eco_label_encoder.pkl")

# Load the trained outcome model and scaler
try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    print("Outcome model and scaler loaded successfully.")
except Exception as e:
    print(f"Error loading outcome model or scaler: {e}")
    model = None
    scaler = None

# Load move prediction model and vectorizer if they exist
try:
    if os.path.exists(MOVE_PREDICTION_MODEL_PATH) and os.path.exists(MOVE_VECTORIZER_PATH):
        move_prediction_model = joblib.load(MOVE_PREDICTION_MODEL_PATH)
        move_vectorizer = joblib.load(MOVE_VECTORIZER_PATH)
        print("Move prediction model and vectorizer loaded successfully.")
    else:
        move_prediction_model = None
        move_vectorizer = None
        print("Move prediction model or vectorizer not found.")
except Exception as e:
    print(f"Error loading move prediction model or vectorizer: {e}")
    move_prediction_model = None
    move_vectorizer = None

# Load opening ECO encoder if it exists
try:
    if os.path.exists(OPENING_ECO_ENCODER_PATH):
        opening_eco_encoder = joblib.load(OPENING_ECO_ENCODER_PATH)
        print("Opening ECO encoder loaded successfully.")
    else:
        opening_eco_encoder = None
        print("Opening ECO encoder not found.")
except Exception as e:
    print(f"Error loading opening ECO encoder: {e}")
    opening_eco_encoder = None

# Define outcome mapping
outcome_map = {0: "White Wins", 1: "Black Wins", 2: "Draw"}


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        if model is None or scaler is None:
            raise Exception("Outcome model or scaler is not loaded.")

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


@app.route("/api/predict-moves", methods=["POST"])
def predict_moves():
    try:
        data = request.get_json()
        pgn = data.get("pgn", "")
        fen = data.get("fen", "")

        # Mock response for demonstration purposes
        return jsonify({
            "moves": [
                {"san": "e4", "evaluation": 0.32, "probability": 0.28, "description": "King's Pawn Opening"},
                {"san": "d4", "evaluation": 0.29, "probability": 0.25, "description": "Queen's Pawn Opening"},
                {"san": "Nf3", "evaluation": 0.18, "probability": 0.15, "description": "Réti Opening"},
                {"san": "c4", "evaluation": 0.15, "probability": 0.12, "description": "English Opening"}
            ],
            "position": {
                "evaluation": 0.0,
                "bestLine": "e4 e5 Nf3 Nc6 Bb5",
                "material": "Equal",
                "control": "Center control balanced"
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
        data = request.get_json()
        pgn = data.get("pgn", "")

        # Process the input
        input_vector = move_vectorizer.transform([pgn])
        predictions = move_prediction_model.predict_proba(input_vector)[0]

        # Format the response
        moves = []
        for i, prob in enumerate(predictions[:4]):
            move = {
                "move": f"move_{i}",
                "san": f"move_{i}",
                "evaluation": float(prob),
                "probability": float(prob),
                "description": f"Description for move {i}"
            }
            moves.append(move)

        return jsonify({
            "moves": moves,
            "position": {
                "evaluation": 0.0,
                "bestLine": "e4 e5 Nf3 Nc6 Bb5",
                "material": "Equal",
                "control": "Center control balanced"
            }
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/identify-opening", methods=["POST"])
def identify_opening():
    try:
        data = request.get_json()
        moves = data.get("moves", "")

        # Mock response for demonstration purposes
        return jsonify({
            "name": "Ruy Lopez (Spanish Opening)",
            "eco": "C60",
            "popularity": 85,
            "winRate": {
                "white": 38,
                "draw": 35,
                "black": 27
            },
            "mainLine": "1. e4 e5 2. Nf3 Nc6 3. Bb5",
            "variations": [
                {"name": "Berlin Defense", "moves": "3... Nf6"},
                {"name": "Morphy Defense", "moves": "3... a6"},
                {"name": "Classical Defense", "moves": "3... Bc5"}
            ],
            "description": "The Ruy Lopez is one of the oldest and most classic of all openings.",
            "strategy": {
                "white": "White aims to put pressure on the e5 pawn.",
                "black": "Black typically defends the e5 pawn."
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
        data = request.get_json()
        moves = data.get("moves", "")

        # Return mock data for now
        return jsonify({
            "name": "Ruy Lopez (Spanish Opening)",
            "eco": "C60",
            "popularity": 85,
            "winRate": {
                "white": 38,
                "draw": 35,
                "black": 27
            },
            "mainLine": "1. e4 e5 2. Nf3 Nc6 3. Bb5",
            "variations": [
                {"name": "Berlin Defense", "moves": "3... Nf6"},
                {"name": "Morphy Defense", "moves": "3... a6"},
                {"name": "Classical Defense", "moves": "3... Bc5"}
            ]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/analyze-position", methods=["POST"])
def analyze_position():
    try:
        data = request.get_json()
        fen = data.get("fen", "")

        # Mock response for demonstration purposes
        return jsonify({
            "evaluation": 0.32,
            "material": {
                "white": 39,
                "black": 39,
                "advantage": "Equal"
            },
            "position": {
                "center": "White has slight center control",
                "kingsSafety": {
                    "white": "Safe",
                    "black": "Safe"
                },
                "activity": "White pieces slightly more active",
                "space": "Equal space control"
            },
            "bestMoves": [
                {"move": "e4", "evaluation": 0.32, "description": "Controls center"},
                {"move": "d4", "evaluation": 0.29, "description": "Opens diagonal for queen and bishop"},
                {"move": "Nf3", "evaluation": 0.18, "description": "Develops knight"}
            ],
            "threats": ["Black threatens to capture on e4"],
            "weaknesses": ["White's pawn on d4 is weak"]
        })
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