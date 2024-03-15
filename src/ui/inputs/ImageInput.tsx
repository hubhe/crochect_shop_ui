// ImageInput.tsx
import React, { ChangeEvent } from 'react';

interface ImageInputProps {
  onChange: (imageUrl: any | null) => void;
}

const defaultImageUrl = '/default-image.jpg';

export const ImageInput: React.FC<ImageInputProps> = ({ onChange }) => {

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0] !== undefined){
      onChange(event.target.files[0]);
    }
}

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