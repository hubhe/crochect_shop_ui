import './PostsPage.css';

import Card from '@mui/material/Card';
import { FC, useCallback, useEffect, useState } from 'react';
import React from 'react';

import { AppLogo } from '../../ui';
import { FormProps, ItemForm } from './ItemForm';
import { useNavigate } from 'react-router-dom';
import { CredentialResponse } from '@react-oauth/google';
import { ItemsService } from '../../services';
import { BaseItem } from '../../services/items';

export const CreateItem: FC = () => {
    const navigate = useNavigate();

    const onCreate = async (_id: string, formData: FormData) => {
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

    const onEdit = useCallback(async (_id: string, formData: FormData) => {
        try {
            const item = await ItemsService.updateItem(_id, formData);
            console.log('Edited item successfully: ', item);
            navigate('/');
        } catch (e) {
            console.log('Edit item failed', e);
        }
    }, []); 

    return (
        <Page type="Edit" onEdit={onEdit} />
    );
};

export interface PageProps {
    type: 'Create' | 'Edit';
    onEdit: (_id: string, formData: FormData) => Promise<void>;
}

const Page: FC<PageProps> = (formProps) => {
    const [imgSrc, setImgSrc] = useState<string | undefined>(undefined)

    const onSelectionChanged = (item: BaseItem | undefined) => {
        if (item) {
            setImgSrc(`http://localhost:4000/public/${item.imgUrl}`)
        } else {
            setImgSrc(undefined)
        }

    }

    return (
        <div className="item-page">
            <Card className="item-card">
                <ItemForm {...formProps} onSelectionChanged={onSelectionChanged}/>
                <div className="right-side">
                    <img className="item-background-img" src={imgSrc} />
                </div>
                <AppLogo className="small-app-logo" small />
            </Card>
        </div>
    );
};