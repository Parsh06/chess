/**
 * API client for the Chess Outcome Predictor
 */

export async function predictOutcome(gameData) {
  try {
    const endpoint =
      process.env.NODE_ENV === "production"
        ? "/api/proxy"
        : "http://localhost:5000/api/predict";

    console.log("Sending request to:", endpoint);
    console.log("Request data:", gameData);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gameData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API error response:", data);
      // Check if data is an object with an error property, otherwise use a default error message
      const errorMsg =
        data && typeof data === "object" && data.error
          ? data.error
          : `API error: ${response.status}`;
      throw new Error(errorMsg);
    }

    console.log("API response:", data);
    return data;
  } catch (error) {
    console.error("Prediction API error:", error);
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
