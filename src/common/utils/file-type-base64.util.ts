function getFileTypeFromBase64(base64String) {
  // Extract the MIME type from the base64 string
  const mimeType = base64String.match(/^data:(.+);base64,/);

  // Check if the MIME type was found
  if (mimeType) {
    return mimeType[1]; // Return the MIME type (e.g., 'image/jpeg', 'image/png')
  }

  return null; // Return null if MIME type is not detected
}
