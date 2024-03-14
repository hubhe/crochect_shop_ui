import { useState, useEffect } from 'react';
import {User, registerGoogle} from "./serverAuth"
import { CredentialResponse } from '@react-oauth/google'
import Cookies from 'js-cookie';

import {
    signUp as authSignUp,
    signOut,
    login,
    updateProfile
} from './authentiocation';
import React from 'react';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const onUserChange = async (rawUser: any | null) => {
        if (rawUser) {
            setUser(rawUser);
            setLoading(false);
            return rawUser;
        } else {
            setUser(null);
            setLoading(false);
            return null;
        }
    };

    const signUp = async (email: string, password: string, name: string, image: string | null) => {
        const user = await authSignUp(email, password, name, image);
        onUserChange(user);
        return user;
    };

    const updateProfileFunc = async (id: string | undefined, email: string, password: string, name: string, image: string | null) => {
        const user = await updateProfile(id, email, password, name, image);
        onUserChange(user);
        return user;
    };

    const signOutFunc = async () => {
        await signOut();
        onUserChange(null);
    };

    const loginFunc = async (email: string, password: string) => {
        const user = await login(email, password);
        onUserChange(user);
        return user;
    };

    const googleSignUp = async (credentialResponse: CredentialResponse) => {
        const response = await registerGoogle(credentialResponse);
        const user = response.user
        onUserChange(user);
        return user;
    }

    return {
        user,
        loading,
        signUp,
        updateProfile: updateProfileFunc,
        googleSignUp,
        login: loginFunc,
        signOut: signOutFunc,
    };
};