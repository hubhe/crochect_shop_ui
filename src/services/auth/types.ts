export interface User {
    email: string,
    password?: string,
    imgUrl?: string,
    _id?: string,
    name: string,
    accessToken?: string,
    refreshToken?: string
}

export interface RegisterRensponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
  }

export interface AuthResponse {
    message: string;
    accessToken: string;
    refreshToken: string;
  }