import './LoginForm.css';
import React, { FC, useState, useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { registerGoogle } from '../../providers/auth/serverAuth';
import { TextInput, PasswordInput, ImageInput } from '../../ui';


const MAX_PASSWORD_DIGITS = 8;

export interface FormProps {
    type: 'Login' | 'Sign Up';
    onLogin: (email: string, password: string, name: string, imageUrl: string | null) => Promise<void>;
    onGoogleLogin?: (response: any) => Promise<void>; 

}

export const LoginForm: FC<FormProps> = ({ type, onLogin, onGoogleLogin }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [confirmEmail, setConfirmEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string | null>(null); // State for image URL

    const [isValid, setIsValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isLogin = useMemo(() => type === 'Login', [type]);

    const handleLogin = useCallback(async () => {
        setIsLoading(true);
        await onLogin(email, password, name, imageUrl); // Pass imageUrl to the onLogin function
        setIsLoading(false);
    }, [email, password, name, imageUrl]); // Include imageUrl in the dependencies array

    useEffect(() => {
        if (email.length === 0 || password.length < MAX_PASSWORD_DIGITS) return setIsValid(false);
        if (type === 'Login') return setIsValid(true);

        if (name.length === 0 || email !== confirmEmail || password !== confirmPassword)
            return setIsValid(false);
        return setIsValid(true);
    }, [email, password, type, confirmEmail, confirmPassword, name]);


    const onGoogleLoginSuccess = useCallback(async (response: any) => {
        if (onGoogleLogin) {
            setIsLoading(true);
            try {
                await onGoogleLogin(response);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [onGoogleLogin]);

    // const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    //     console.log(credentialResponse);
    //     try {
    //         const res = await onGoogleLogin(credentialResponse);
    //         console.log(res);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    const onGoogleLoginFailure = () => {
        console.log("Google login failed");
    };

    return (
        <div className="login-form">
            <h2>{isLogin ? 'Welcome Back!' : 'Register'}</h2>
            <span>continue with google, or enter your details</span>
            {!isLogin && <TextInput title="Name" value={name} onChange={setName} />}
            <TextInput title="Email" type="email" value={email} onChange={setEmail} />
            {!isLogin && (
                <TextInput
                    title="Confirm Email"
                    type="email"
                    value={confirmEmail}
                    onChange={setConfirmEmail}
                />
            )}
            <PasswordInput value={password} onChange={setPassword} />
            {!isLogin && (
                <PasswordInput
                    title="Confirm Password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                />
            )}
            {!isLogin && (
            <ImageInput onChange={setImageUrl} />
            )}

            {isLogin && (
                <div>
                    <span className="forgot-password-btn">Forgot password</span>
                </div>
            )}
            <LoadingButton
                className="login-btn"
                onClick={handleLogin}
                loading={isLoading}
                loadingPosition="end"
                variant="contained"
                disabled={!isValid}
                endIcon={<SendIcon />}
            >
                {type}
            </LoadingButton>

            <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure} />
            <div>
                {isLogin ? (
                    <span>
                        Don't have an account? <Link to="/sign-up">Sign up</Link>
                    </span>
                ) : (
                    <span>
                        Already have an account? <Link to="/login">Login</Link>
                    </span>
                )}
            </div>
        </div>
    );
};
