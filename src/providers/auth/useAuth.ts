import { useState, useEffect } from 'react';
import {User, registerGoogle} from "./serverAuth"
import { CredentialResponse } from '@react-oauth/google'
import Cookies from 'js-cookie';

import {
    signUp as authSignUp,
    signOut,
    login,
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

    const setUserStatus = async (id: string, state: boolean) => {
        await fetch(`http://localhost:1234/user/${id}`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                update: { isOnline: state },
            }),
        });
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
        const user = await registerGoogle(credentialResponse);
        onUserChange(user);
        return user;
    }

    return {
        user,
        loading,
        signUp,
        googleSignUp,
        login: loginFunc,
        signOut: signOutFunc,
    };
};