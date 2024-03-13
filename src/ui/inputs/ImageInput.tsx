// ImageInput.tsx
import { ChangeEvent, useRef, useState } from 'react'
import axios, { AxiosError } from 'axios';

interface ImageInputProps {
  onChange: (imageUrl: string | null) => void;
}

interface IUpoloadResponse {
  url: string;
}
export const uploadPhoto = async (photo: File) => {
  return new Promise<string>((resolve, reject) => {
      console.log("Uploading photo..." + photo)
      const formData = new FormData();
      if (photo) {
          formData.append("file", photo);
          axios.post<IUpoloadResponse>('/upload', formData, {
              headers: {
                  'Content-Type': 'image/jpeg'
              }
          }).then(res => {
              console.log(res);
              resolve(res.data.url);
          }).catch(err => {
              console.log(err);
              reject(err);
          });
      }
  });
}

const [imgSrc, setImgSrc] = useState<File>()
const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value)
  if (e.target.files && e.target.files.length > 0) {
      setImgSrc(e.target.files[0])
  }
}
const url = await uploadPhoto(imgSrc!);
        console.log("upload returned:" + url);

export const ImageInput: React.FC<ImageInputProps> = ({ onChange }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Here you can upload the file to a server and obtain the image URL
      // For demonstration purposes, I'm just simulating the upload process
      const imageUrl = `https://example.com/uploads/${selectedFile.name}`;
      onChange(imageUrl);
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
