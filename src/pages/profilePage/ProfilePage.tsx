import './profilePage.css';

import Card from '@mui/material/Card';
import { FC, useCallback, useEffect } from 'react';
import React from 'react';

import { AppLogo } from '../../ui';
import { FormProps, ProfileForm } from './ProfileForm';
import { useAuthContext } from '../../providers/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';


export const ProfilePage: FC = () => {
    const navigate = useNavigate();
    const { user, updateProfile } = useAuthContext(); // Destructure googleSignUp from useAuthContext

    const onUpdate = useCallback(async (email: string, password: string, name: string, imageUrl: string | null) => {
        try {
            const userToUpdate = await updateProfile?.(user?._id, email, password, name, imageUrl);
            console.log('🚀 ~ file: loginPage.tsx:36 ~ onLogin ~ user', userToUpdate);
            navigate('/');
        } catch (e) {
            console.log('🚀 ~ file: loginPage.tsx:38 ~ onLogin ~ e', e);
        }
    }, [updateProfile]); 

    return (
        <Page type="update" onUpdate={onUpdate}/>
    );
};

const Page: FC<FormProps> = (formProps) => {
    const navigate = useNavigate();
    const { user } = useAuthContext();

    useEffect(() => {
        if (user) navigate('/');
    }, [user]);

    return (
        <div className="profile-page">
            <Card className="profile-card">
                <ProfileForm {...formProps} />
                <div className="right-side">
                    <img className="profile-background-img" src={user?.imgUrl} />
                </div>
                <AppLogo className="small-app-logo" small />
            </Card>
        </div>
    );
};
