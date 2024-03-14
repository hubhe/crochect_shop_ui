import './LoginPage.css';

import Card from '@mui/material/Card';
import { FC, useCallback, useEffect } from 'react';
import React from 'react';

import { AppLogo } from '../../ui';
import { FormProps, LoginForm } from './LoginForm';
import { useAuthContext } from '../../providers/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';


export const SignUpPage: FC = () => {
    const { signUp } = useAuthContext();
    const navigate = useNavigate();

    const onSignUp = useCallback(async (email: string, password: string, name: string, image: string | null) => {
        try {
            const user = await signUp?.(email, password, name, image);
            console.log('🚀 ~ file: loginPage.tsx:36 ~ onLogin ~ user', user);
            navigate('/');
        } catch (e) {
            console.log('🚀 ~ file: loginPage.tsx:38 ~ onLogin ~ e', e);
        }
    }, []);

    return <Page type="Sign Up" onLogin={onSignUp} />;
};

export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const { login, googleSignUp } = useAuthContext(); // Destructure googleSignUp from useAuthContext

    const onLogin = useCallback(async (email: string, password: string) => {
        try {
            const user = await login?.(email, password);
            console.log('🚀 ~ file: loginPage.tsx:36 ~ onLogin ~ user', user);
            navigate('/');
        } catch (e) {
            console.log('🚀 ~ file: loginPage.tsx:38 ~ onLogin ~ e', e);
        }
    }, [login]); // Include login in the dependencies array

    const onGoogleLogin = useCallback(async (response: any) => {
        try {
            const { tokenId } = response; // Get the Google token ID
            const user = await googleSignUp?.(tokenId); // Call googleSignUp with tokenId
            console.log('🚀 ~ Google login successful:', user);
            navigate('/');
        } catch (error) {
            console.error('Error logging in with Google:', error);
        }
    }, [googleSignUp]); // Include googleSignUp in the dependencies array

    return (
        <Page type="Login" onLogin={onLogin} onGoogleLogin={onGoogleLogin} />
    );
};

const Page: FC<FormProps> = (formProps) => {
    const navigate = useNavigate();
    const { user } = useAuthContext();

    useEffect(() => {
        if (user) navigate('/');
    }, [user]);

    return (
        <div className="login-page">
            <Card className="login-card">
                <LoginForm {...formProps} />
                <div className="right-side">
                    <img className="login-background-img" src="/crochetLogo.png" />
                    {/* <AppLogo /> */}
                </div>
                <AppLogo className="small-app-logo" small />
            </Card>
        </div>
    );
};
