export default async (event, context) => {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
    };
  }

  try {
    // Your existing function logic here
    const response = {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Hello from Netlify function!" }),
    };

    return response;
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
