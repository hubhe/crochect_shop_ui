import './itemForm.css';
import React, { FC, useState, useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextInput, PasswordInput, ImageInput } from '../../ui';


export interface FormProps {
    type: 'Create' | 'Edit';
    onEdit: (formData: FormData) => Promise<void>;
}

export const ItemForm: FC<FormProps> = ({ type, onEdit }) => {
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [imageInfo, setImageInfo] = useState<File | null>(null);
    const [id, setItemID] = useState<string>('');

    const [isValid, setIsValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isEdit = useMemo(() => type === 'Edit', [type]);
    
    const handleUpdate = useCallback(async () => {
        setIsLoading(true);
        const formData: FormData = new FormData()
        formData.append('price', price);
        formData.append('name', name);
        formData.append('id', id);
        if (imageInfo){
            formData.append('image', imageInfo, imageInfo?.name);
        }
        await onEdit(formData); 
        setIsLoading(false);
    }, [price, name, imageInfo]);

    useEffect(() => {
        if (name.length === 0 || price.length === 0 || id.length === 0) return setIsValid(false);
        return setIsValid(true);
    }, [price, type, name]);


    return (
        <div className="item-form">
            <h2>{isEdit ? 'Edit Item' : 'Create Item'}</h2>
            {isEdit && (
                <TextInput
                    title="Item ID"
                    type="id"
                    value={id}
                    onChange={setItemID}
                />
            )}
            <TextInput title="Name" value={name} onChange={setName} />
            <TextInput title="Price" type="price" value={price} onChange={setPrice} />
            <ImageInput onChange={setImageInfo} />
            <LoadingButton
                className="item-btn"
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
                {isEdit ? (
                    <span>
                        Would like to add new item? <Link to="/create">Create</Link>
                    </span>
                ) : (
                    <span>
                        Would like to edit an existing item? <Link to="/edit">Edit</Link>
                    </span>
                )}
            </div>
        </div>
    );
};