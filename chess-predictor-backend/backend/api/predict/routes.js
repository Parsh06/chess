const { NextResponse } = require("next/server");

module.exports.POST = async function (request) {
  try {
    const body = await request.json();

    // Create an AbortController to enforce a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout

    const response = await fetch("http://localhost:5000/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    // Clear the timeout once fetch completes
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend error: ${response.status} - ${errorText}`);
    }

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      {
        error: error.message || "Connection failed",
      },
      { status: 500 }
    );
  }
};