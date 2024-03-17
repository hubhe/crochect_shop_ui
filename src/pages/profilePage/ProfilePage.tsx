import './profilePage.css';

import Card from '@mui/material/Card';
import { FC, useCallback, useContext, useEffect } from 'react';
import { AppLogo } from '../../ui';
import { FormProps, ProfileForm } from './ProfileForm';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts';
import { AuthService } from '../../services';


export const ProfilePage: FC = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const onUpdate = useCallback(async (formData: FormData) => {
        try {
            if (user?._id)
                await AuthService.updateUserProfile(user._id, formData);
            // navigate('/');
        } catch (e) {
            console.log('🚀 ~ file: loginPage.tsx:38 ~ onLogin ~ e', e);
        }
    }, []); 

    useEffect(()=>{
        console.log(user)
    }, [user])

    return (
        <Page type="update" onUpdate={onUpdate}/>
    );
};

const Page: FC<FormProps> = (formProps) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    return (
        <div className="profile-page">
            <Card className="profile-card">
                <ProfileForm {...formProps} />
                <div className="right-side">
                    <img className="profile-background-img" src={`http://localhost:3000/public/${user?.imgUrl}`} />
                </div>
                <AppLogo className="small-app-logo" small />
            </Card>
        </div>
    );
};