import React, { useEffect, useState } from 'react';
import {SlideShow} from '@adee/components/slide-show';

interface GooglePhotoSlideShowProps {
  folderId: string;
  apiKey: string;
}

const GooglePhotoSlideShow: React.FC<GooglePhotoSlideShowProps> = ({ folderId, apiKey }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch files from the Google Drive folder using the API
        const response = await fetch(
          `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType,webContentLink)`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch images from Google Drive.');
        }

        const data = await response.json();

        // Filter files to include only images (e.g., jpg, png)
        const imageFiles = data.files.filter((file: any) =>
          ['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimeType)
        );

        // Extract URLs for the images
        const urls = imageFiles.map((file: any) => `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`);
        setImageUrls(urls);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching images.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [folderId, apiKey]);

  if (loading) {
    return <div>Loading images...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (imageUrls.length === 0) {
    return <div>No images found in the folder.</div>;
  }

  const imageUrlsWithType = imageUrls.map(url => ({
    type: 'image' as const,
    src: url
  }));

  return <SlideShow entries={imageUrlsWithType} />;
};

export {GooglePhotoSlideShow};