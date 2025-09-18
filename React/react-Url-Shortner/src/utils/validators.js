export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidMinutes(value) {
  return Number.isInteger(Number(value)) && Number(value) > 0;
}
