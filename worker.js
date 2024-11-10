addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

async function handleRequest(event) {
  const url = new URL(event.request.url)

  try {
    // Check if the request is for the root path (index.html) or other HTML files
    if (url.pathname === "/" || url.pathname.endsWith(".html")) {
      const response = await fetch(`https://paradigmnuxt2.pages.dev${url.pathname}`)
      return response
    }

    // Check if the request is for an API call (replace with your actual API endpoint)
    if (url.pathname.startsWith("/api/")) {
      // Forward API requests to your backend API
      const apiUrl = process.env.API_URL || "https://paradigmapi.pythonanywhere.com";
      const apiResponse = await fetch(apiUrl + url.pathname, {
        method: event.request.method,
        headers: event.request.headers,
        body: event.request.body
      });

      // Return API response to the client
      return apiResponse
    }

    // Default fallback: handle other assets (e.g., JS, CSS, images)
    const response = await fetch(`https://paradigmnuxt2.pages.dev${url.pathname}`)
    return response

  } catch (e) {
    // Handle errors and return a custom error page
    return new Response('Error: ' + e.message, { status: 500 })
  }
}
