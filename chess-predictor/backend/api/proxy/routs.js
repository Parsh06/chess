export async function POST(request) {
  try {
    const body = await request.json();

    // Create an AbortController to enforce a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout

    const response = await fetch("http://localhost:5000/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal
    });

    // Clear the timeout once fetch completes
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend error: ${response.status} - ${errorText}`);
    }

    const responseData = await response.text();
    return new Response(responseData, {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(JSON.stringify({
      error: error.message || "Connection failed"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
