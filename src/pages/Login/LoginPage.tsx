import './LoginPage.css';

import Card from '@mui/material/Card';
import { FC, useCallback, useContext, useEffect } from 'react';
import React from 'react';

import { AppLogo } from '../../ui';
import { FormProps, LoginForm } from './LoginForm';
import { useNavigate } from 'react-router-dom';
import { CredentialResponse } from '@react-oauth/google';
import { AuthContext } from '../../Contexts';
import { AuthService } from '../../services';


export const SignUpPage: FC = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSignUp = useCallback(async (formData: FormData) => {
        try {
            const user = await AuthService.register(formData);
            console.log('🚀 ~ file: loginPage.tsx:36 ~ onLogin ~ user', user);
            setUser(user)
            navigate('/');
        } catch (e) {
            console.log('🚀 ~ file: loginPage.tsx:38 ~ onLogin ~ e', e);
        }
    }, []);

    return <Page type="Sign Up" onLogin={onSignUp} />;
};

export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const onLogin = useCallback(async (formData: FormData) => {
        try {
            const email = formData.get("email")
            const password = formData.get("password")
            if (email && password){
                const user = await AuthService.login(email.toString(), password.toString());
                console.log('🚀 ~ file: loginPage.tsx:36 ~ onLogin ~ user', user);
                setUser(user)
            }
            navigate('/');
        } catch (e) {
            console.log('🚀 ~ file: loginPage.tsx:38 ~ onLogin ~ e', e);
        }
    }, [setUser]); // Include login in the dependencies array

    const onGoogleLogin = useCallback(async (response: CredentialResponse) => {
        try {
            const user = await AuthService.registerGoogle(response); 
            console.log('🚀 ~ Google login successful:', user);
            navigate('/');
            setUser(user)
        } catch (error) {
            console.error('Error logging in with Google:', error);
        }
    }, [setUser]); // Include googleSignUp in the dependencies array

    return (
        <Page type="Login" onLogin={onLogin} onGoogleLogin={onGoogleLogin} />
    );
};

const Page: FC<FormProps> = (formProps) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

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