export function logEvent(event, data = {}) {
  const timestamp = new Date().toISOString();
  console.log(`[LOG] ${timestamp} - ${event}`, data);
}
