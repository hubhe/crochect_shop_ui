
import { handleAuthError, serverFetch, userFetch } from '../ServiceUtil';
import { CredentialResponse } from '@react-oauth/google'
import { To } from 'react-router';
import { AuthResponse, LoginResponse, RegisterRensponse, User } from './types';
import axios, { AxiosError } from 'axios';


export async function register(formData: FormData): Promise<any> {
  try {
    const response = await serverFetch.post<RegisterRensponse>('/auth/register', formData);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data.user;
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function registerGoogle(credentialResponse: CredentialResponse): Promise<any> {
    return new Promise<User>((resolve, reject) => {
        console.log("googleSignin ...");
        serverFetch.post("/auth/google", credentialResponse).then((response) => {
            console.log(response);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('accessToken', response.data.accessToken);
            resolve(response.data.user);
        }).catch((error) => {
            console.log(error);
            reject(error);
        })
    })
  }

export async function login(email: string, password: string): Promise<any> {
  try {
    const response = await serverFetch.post<LoginResponse>('/auth/login', { email, password });
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('accessToken', response.data.accessToken);
    
    return response.data.user;
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function updateUserProfile(_id: string, data: FormData): Promise<boolean> {
    try {
        const response = await userFetch.put(`/user/${_id}`, data);

        const success = response.data.success;

        return success as boolean;
    } catch (error) {
        // Handle error
        return false;
    }
}

export async function signOut(): Promise<string> {
    try {
          userFetch.get('/auth/logout')
          .then(response => {
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            console.log(response.data);
          });
      return 'User signed out successfully';
    } catch (error) {
      return 'An error occurred during sign out';
    }
  }


export async function getActiveUser(): Promise<User | null> {
    if (!localStorage.getItem('accessToken'))
        return null;
    const res = await userFetch.get('/user');
    return res.data.user;
} 
