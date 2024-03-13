import React, { ChangeEvent } from 'react';

interface ImageInputProps {
  onChange: (imageUrl: string | null) => void;
}

export const ImageInput: React.FC<ImageInputProps> = ({ onChange }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onChange(reader.result); // Pass the data URL to the onChange callback
        } else {
          onChange(null); // If the result is not a string (shouldn't happen), pass null
        }
      };
      reader.readAsDataURL(selectedFile); // Read the file as data URL
    } else {
      onChange(null); // If no file is selected, pass null
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
