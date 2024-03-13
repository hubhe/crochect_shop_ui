
import axios, { AxiosError } from 'axios';
import { CredentialResponse } from '@react-oauth/google'

export interface User {
    email: string,
    password?: string,
    imgUrl?: string,
    _id?: string,
    name: string,
    accessToken?: string,
    refreshToken?: string
}

interface RegisterRensponse {
  email: string;
  _id: string;
  imgUrl: string;
  accessToken: string;
  refreshToken: string;
}

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
  }

  interface AuthResponse {
    message: string;
    token?: string;
  }

// createUserWithEmailAndPassword
export async function register(email: string, password: string): Promise<any> {
  try {
    const response = await axios.post<RegisterRensponse>('http://localhost:3000/auth/register', { email, password });
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('accessToken', response.data.accessToken);
    return response;
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function registerGoogle(credentialResponse: CredentialResponse): Promise<any> {
    return new Promise<User>((resolve, reject) => {
        console.log("googleSignin ...")
        axios.post("http://localhost:3000/auth/google", credentialResponse).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
  }

// signInWithEmailAndPassword
export async function login(email: string, password: string): Promise<any> {
  try {
    const response = await axios.post<LoginResponse>('http://localhost:3000/auth/login', { email, password });
    // Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'strict' });
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('accessToken', response.data.accessToken);
    
    return response;
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function updateUserImage(photoUrl: string | null, token: string): Promise<boolean> {
    try {
        const body = {
            photoUrl: photoUrl
        };

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const response = await axios.put('http://localhost:3001/updateImage', body, { headers });

        const success = response.data.success;

        return success ? true : false;
    } catch (error) {
        // Handle error
        return false;
    }
}

// firebaseSignOut
export async function signOut(): Promise<string> {
    try {
        const token = localStorage.getItem('refreshToken');
        const headers = {
            Authorization: `Bearer ${token}`
          };
          axios.get('http://localhost:3001/auth/logout', { headers })
          .then(response => {
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            console.log(response.data);
          })
      return 'User signed out successfully';
    } catch (error) {
      return 'An error occurred during sign out';
    }
  }

function handleAuthError(error: any): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<AuthResponse>;
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }
  }
  return 'An error occurred during authentication';
}