export function getFileExtensionFromBase64(base64String) {
  // Extract the MIME type from the base64 string
  const mimeTypeMatch = base64String.match(/^data:(.+);base64,/);

  // If a MIME type is found, map it to the file extension
  if (mimeTypeMatch) {
    const mimeType = mimeTypeMatch[1];

    // Map MIME types to file extensions
    const mimeToExt = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'image/svg+xml': 'svg',
      'application/pdf': 'pdf',
      // Add other MIME types as needed
    };

    return mimeToExt[mimeType] || null; // Return extension or null if not found
  }

  return null; // Return null if MIME type is not detected
}
