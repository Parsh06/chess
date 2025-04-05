/**
 * API client for the Chess Outcome Predictor
 */

const BASE_URL = "http://localhost:5000/api"; // Update this to match your backend URL

// Function to predict the outcome of a chess game
export async function predictOutcome(gameData) {
  try {
    const response = await fetch(`${BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch prediction");
    }

    const data = await response.json();
    return data; // Expecting { prediction: "White Win" | "Black Win" | "Draw" }
  } catch (error) {
    console.error("Prediction API error:", error);
    throw error;
  }
}

// Function to predict the next moves based on PGN or FEN
export async function predictMoves(pgn, fen) {
  try {
    const response = await fetch(`${BASE_URL}/predict-moves`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pgn, fen }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch move predictions");
    }

    const data = await response.json();
    return data; // Expecting { moves: [...], position: {...} }
  } catch (error) {
    console.error("Move prediction API error:", error);
    throw error;
  }
}

// Function to identify the chess opening based on moves
export async function identifyOpening(moves) {
  try {
    const response = await fetch(`${BASE_URL}/identify-opening`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ moves }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to identify opening");
    }

    const data = await response.json();
    return data; // Expecting { name: string, eco: string, popularity: number, ... }
  } catch (error) {
    console.error("Identify Opening API error:", error);
    throw error;
  }
}

// Function to analyze a chess position based on FEN
export async function analyzePosition(fen) {
  try {
    const response = await fetch(`${BASE_URL}/analyze-position`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fen }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to analyze position");
    }

    const data = await response.json();
    return data; // Expecting { evaluation: number, material: {...}, position: {...}, bestMoves: [...], ... }
  } catch (error) {
    console.error("Analyze Position API error:", error);
    throw error;
  }
}

/**
 * Converts an ECO code (A00-E99) to a numeric value for the model
 *
 * @param {string} eco - The ECO code (e.g., "C00")
 * @returns {number} A numeric value between 0-499
 */
export function convertECOToNumeric(eco) {
  const letter = eco.charAt(0);
  const number = Number.parseInt(eco.substring(1), 10);

  // A=0, B=1, C=2, D=3, E=4
  const letterValue = letter.charCodeAt(0) - "A".charCodeAt(0);

  // Calculate final value (0-499)
  return letterValue * 100 + number;
}