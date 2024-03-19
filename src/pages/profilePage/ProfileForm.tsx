import './profilePage.css';
import React, { FC, useState, useCallback, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextInput, PasswordInput, ImageInput } from '../../ui';
import { AuthContext } from '../../Contexts';


const MAX_PASSWORD_DIGITS = 8;

export interface FormProps {
    type: 'update';
    onUpdate: (formData: FormData) => Promise<void>;
}

export const ProfileForm: FC<FormProps> = ({ type, onUpdate }) => {    
    const { user } = useContext(AuthContext);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [imageInfo, setImageInfo] = useState<File | null>(null);

    const [isValid, setIsValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleUpdate = useCallback(async () => {
        setIsLoading(true);
        const formData: FormData = new FormData()
        formData.append('email', email);
        formData.append('name', name);
        if (password)
            formData.append('password', password);
        if (imageInfo){
            formData.append('image', imageInfo, imageInfo?.name);
        }
        await onUpdate(formData); 
        setIsLoading(false);
    }, [email, password, name, imageInfo]); 

    useEffect(() => {
        if (email.length === 0 || name.length === 0) return setIsValid(false);

        if (email === user?.email && name === user?.name)
            return setIsValid(false);
        return setIsValid(true);
    }, [email, password, name]);
    
    useEffect(() => {
        if (user){
            setName(user.name)
            setEmail(user.email)
        }
    }, [user])
    return (
        <div className="login-form">
            <h2>{'Edit Profile'}</h2>
            <TextInput title="Name" value={name} onChange={setName} />
            <TextInput title="Email" type="email" value={email} onChange={setEmail} />
            <PasswordInput value={password} onChange={setPassword} />
            <ImageInput onChange={setImageInfo} />
            <LoadingButton
                className="login-btn"
                onClick={handleUpdate}
                loading={isLoading}
                loadingPosition="end"
                variant="contained"
                disabled={!isValid}
                endIcon={<SendIcon />}
            >
                {type}
            </LoadingButton>
            <div>
                    <span>
                         <Link to="/">Go back to store</Link>
                    </span>
            </div>
            
        </div>
    );
};