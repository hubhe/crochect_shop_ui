import { useState, useEffect } from 'react';
// import { User as FirebaseUser } from 'firebase/auth';
import Cookies from 'js-cookie';

import {
    signUp as authSignUp,
    signOut,
    login,
} from './authentiocation';
import React from 'react';

export interface User {
    _id: string;
    email: string;
    password: string;
    name: string;
    imgUrl?: string;
    isAdmin?: boolean;
    refreshTokens?: string[];
    wish_list: [string];
    in_cart: [string];
    comments: Array<string>;
}

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const onUserChange = async (rawUser: any | null) => {
        if (rawUser) {
            //const _user = await _formatUser(rawUser);
            //setUser(_user);
            setLoading(false);
            //return _user;
        } else {
            setUser(null);
            setLoading(false);
            return null;
        }
    };

    const signUp = async (email: string, password: string, name: string) => {
        const user = await authSignUp(email, password, name);
        //await addUserToDB(user._id, user.name ? user.name : '', '');
        return user;
    };

    // const addUserToDB = async (id: string, name: string, description: string) => {
    //     await fetch('http://localhost:1234/user', {
    //         method: 'POST',
    //         headers: {
    //             accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             userID: id,
    //             profileName: name,
    //             profileDescription: description,
    //         }),
    //     });
    // };

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
        await setUserStatus(user?._id ? user._id : '', false);
        onUserChange(null);
    };

    const loginFunc = async (email: string, password: string) => {
        const user = await login(email, password);
        return user;
    };

    return {
        user,
        loading,
        signUp,
        login: loginFunc,
        signOut: signOutFunc,
    };
};

// const _formatUser = async (user: any): Promise<User> => {
//     const token = await user.getIdToken();
//     return {
//         _id: user._id,
//         email: user.email,
//         name: user.displayName,
//     };
// };
