// ImageInput.tsx
import React, { ChangeEvent } from 'react';
import { uploadPhoto } from './uploadPhoto'; // Import the uploadPhoto function

interface ImageInputProps {
  onChange: (imageUrl: string | null) => void; // Change the type of onChange prop
}

export const ImageInput: React.FC<ImageInputProps> = ({ onChange }) => {
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      try {
        const imageUrl = await uploadPhoto(selectedFile); // Upload the file and get the image URL
        onChange(imageUrl);
      } catch (error) {
        console.error('Error uploading photo:', error);
        onChange(null);
      }
    } else {
      onChange(null);
    }
  };

  return (
    <div>
      <label>
        Upload Profile Picture:
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};
