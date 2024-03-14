import './ProfileForm.css';
import React, { FC, useState, useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextInput, PasswordInput, ImageInput } from '../../ui';
import { useAuthContext } from '../../providers';


const MAX_PASSWORD_DIGITS = 8;

export interface FormProps {
    type: 'update';
    onUpdate: (email: string, password: string, name: string, imageUrl: string | null) => Promise<void>;
}

export const ProfileForm: FC<FormProps> = ({ type, onUpdate }) => {
    const { user } = useAuthContext();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string | null>(null); 

    const [isValid, setIsValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleUpdate = useCallback(async () => {
        setIsLoading(true);
        await onUpdate(email, password, name, imageUrl); 
        setIsLoading(false);
    }, [email, password, name, imageUrl]); 

    useEffect(() => {
        if (email.length === 0 || password.length < MAX_PASSWORD_DIGITS) return setIsValid(false);

        if (name.length === 0)
            return setIsValid(false);
        return setIsValid(true);
    }, [email, password, type, name]);

    return (
        <div className="profile-form">
            <h2>{'Edit Profile'}</h2>
            {<TextInput title={user?.name} value={name} onChange={setName} />}
            <TextInput title={user?.email} type="email" value={email} onChange={setEmail} />
            <PasswordInput value={user?.password} onChange={setPassword} />
            <ImageInput onChange={setImageUrl} />
            <LoadingButton
                className="profile-btn"
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
                     <Link to="/">Back to store</Link>
                    </span>
            </div>
        </div>
    );
};
