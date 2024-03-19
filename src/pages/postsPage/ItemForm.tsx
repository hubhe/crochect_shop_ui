import './itemForm.css';
import React, { FC, useState, useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextInput, PasswordInput, ImageInput, Carousel } from '../../ui';
import { GenericCarousel } from '../homePage/GenericCarousel';
import storeItems from '../../data/items.json';


export interface FormProps {
    type: 'Create' | 'Edit';
    onEdit: (formData: FormData) => Promise<void>;
}

export const ItemForm: FC<FormProps> = ({ type, onEdit }) => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageInfo, setImageInfo] = useState<File | null>(null);
    const [id, setItemID] = useState<string>('');

    const [isValid, setIsValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isEdit = useMemo(() => type === 'Edit', [type]);

    const handleUpdate = useCallback(async () => {
        setIsLoading(true);
        const formData: FormData = new FormData()
        formData.append('description', description);
        formData.append('name', name);
        if (isEdit)
            formData.append('_id', id);
        if (imageInfo) {
            formData.append('image', imageInfo, imageInfo?.name);
        }
        await onEdit(formData);
        setIsLoading(false);
    }, [description, name, imageInfo]);

    useEffect(() => {
        if (name.length === 0 || description.length === 0) 
            return setIsValid(false);
        return setIsValid(true);
    }, [description, type, name]);

    const items = storeItems;
    const onClickItem = (id: string) => {
        console.log(`Item clicked: ${id}`);
        setItemID(id.toString());
        // Handle item click logic here
    };

    return (
        <div style={{ width: "100%" }}>
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
                <TextInput title="Description" value={description} onChange={setDescription} />
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
                            Would like to add new item? <Link to="/post/create">Create</Link>
                        </span>
                    ) : (
                        <span>
                            Would like to edit an existing item? <Link to="/post/edit">Edit</Link>
                        </span>
                    )}
                </div>
            </div>

            {isEdit && (<div style={{ width: "100%" }}>
                <Carousel
                    title="My Items"
                    items={items}
                    itemsInOneSlider={4}
                    autoSlide={false}
                    isLoading={false}
                    randomColors
                    onClickItem={onClickItem}
                />
            </div>)}
        </div>
    );
};