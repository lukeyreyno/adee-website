const getGoogleDriveStreamUrl = (fileId: string, apiKey: string) => {
  return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
};

export {
  getGoogleDriveStreamUrl,
};
