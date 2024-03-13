// LoginForm.tsx
import './LoginForm.css';
import React, { FC, useState, useCallback, useEffect, useMemo, ChangeEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { registerGoogle } from '../../providers/auth/serverAuth';
import { TextInput, PasswordInput, ImageInput, uploadPhoto } from '../../ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'



const DEFAULT_IMAGE_URL = '/default-image.jpg';


const MAX_PASSWORD_DIGITS = 8;

export interface FormProps {
    type: 'Login' | 'Sign Up';
    onLogin: (email: string, password: string, name: string, imageUrl: string | null) => Promise<void>;
    onGoogleLoginSuccess?: (response: any) => Promise<void>; 
}

export const LoginForm: FC<FormProps> = ({ type, onLogin }) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [confirmEmail, setConfirmEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string | null>(null); // State for image URL
    const [imgSrc, setImgSrc] = useState<File>()

    const [isValid, setIsValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isLogin = useMemo(() => type === 'Login', [type]);

    const handleLogin = useCallback(async () => {
        setIsLoading(true);
        try {
            await onLogin(email, password, name, imageUrl); // Pass imageUrl to the onLogin function
            setIsLoading(false);
        } catch (error) {
            console.error('Error logging in:', error);
            setIsLoading(false);
        }
    }, [email, password, name, imageUrl, onLogin]); // Include onLogin in the dependencies array

    useEffect(() => {
        if (email.length === 0 || password.length < MAX_PASSWORD_DIGITS) return setIsValid(false);
        if (type === 'Login') return setIsValid(true);

        if (name.length === 0 || email !== confirmEmail || password !== confirmPassword)
            return setIsValid(false);
        return setIsValid(true);
    }, [email, password, type, confirmEmail, confirmPassword, name]);

    const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        console.log(credentialResponse);
        try {
            const res = await registerGoogle(credentialResponse);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };

    const onGoogleLoginFailure = () => {
        console.log("Google login failed");
    };

    const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        if (e.target.files && e.target.files.length > 0) {
            setImgSrc(e.target.files[0])
        }
    }

    const selectImg = () => {
        console.log("Selecting image...")
        fileInputRef.current?.click()
    }

    const handleImageChange = async (file: File | null): Promise<string | null> => {
        if (file) {
            try {
                const url = await uploadPhoto(file); // Upload the file and get the image URL
                setImageUrl(url);
                return url;
            } catch (error) {
                console.error('Error uploading photo:', error);
                setImageUrl(DEFAULT_IMAGE_URL);
                return DEFAULT_IMAGE_URL;
            }
        } else {
            setImageUrl(DEFAULT_IMAGE_URL);
            return DEFAULT_IMAGE_URL;
        }
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
                <div>
                <img src={imgSrc ? URL.createObjectURL(imgSrc) : DEFAULT_IMAGE_URL} style={{ height: "30px", width: "30px" }} className="img-fluid" />
                <button type="button" className="btn position-absolute bottom-0 end-0" onClick={selectImg}>
                    <FontAwesomeIcon icon={faImage} className="fa-xl" />
                </button>
                <input style={{ display: "none" }} ref={fileInputRef} type="file" onChange={imgSelected}></input>

                </div>
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
