export function setCachingHeaders(res) {
  res.setHeader('Cache-Control', 'public, max-age=3600');
}

export function sendJSONResponse(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}