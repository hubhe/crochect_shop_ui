import axios from 'axios';

interface IUploadResponse {
  url: string;
}

export const uploadPhoto = async (photo: File | null) => {
  return new Promise<string>((resolve, reject) => {
    const formData = new FormData();
    
    // Append the photo if it exists
    if (photo) {
      formData.append("file", photo);
    } else {
      // Append the default image if no photo is provided
      formData.append("defaultImage", "default.jpg");
    }

    axios.post<IUploadResponse>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      console.log(res);
      resolve(res.data.url);
    }).catch(err => {
      console.log(err);
      reject(err);
    });
  });
}
