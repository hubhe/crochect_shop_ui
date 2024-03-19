import './PostsPage.css';

import Card from '@mui/material/Card';
import { FC, useCallback, useEffect } from 'react';
import React from 'react';

import { AppLogo } from '../../ui';
import { FormProps, ItemForm } from './ItemForm';
import { useNavigate } from 'react-router-dom';
import { CredentialResponse } from '@react-oauth/google';
import { ItemsService } from '../../services';

export const CreateItem: FC = () => {
    const navigate = useNavigate();

    const onCreate = async (formData: FormData) => {
        try {
            const item = await ItemsService.createItem(formData);
            console.log('Created item successfully: ', item);
            navigate('/');
        } catch (e) {
            console.log('Failed creating item', e);
        }
    }

    return <Page type="Create" onEdit={onCreate} />;
};

export const EditItem: FC = () => {
    const navigate = useNavigate();

    const onEdit = useCallback(async (formData: FormData) => {
        try {
            const item = await ItemsService.updateItem(formData);
            console.log('Edited item successfully: ', item);
            navigate('/');
        } catch (e) {
            console.log('Edit item failed', e);
        }
    }, []); 

    return (
        <Page type="Edit" onEdit={onEdit}/>
    );
};

const Page: FC<FormProps> = (formProps) => {

    return (
        <div className="item-page">
            <Card className="item-card">
                <ItemForm {...formProps} />
                <div className="right-side">
                    <img className="item-background-img" src="/crochetLogo.png" />
                </div>
                <AppLogo className="small-app-logo" small />
            </Card>
        </div>
    );
};