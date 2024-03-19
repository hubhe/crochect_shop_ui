import './itemForm.css';
import React, { FC, useState, useCallback, useEffect, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextInput, PasswordInput, ImageInput, Carousel, Item } from '../../ui';
import { GenericCarousel } from '../homePage/GenericCarousel';
import storeItems from '../../data/items.json';
import { AuthContext } from '../../Contexts';
import { ItemsService } from '../../services';
import { BaseItem } from '../../services/items';

export interface FormProps {
    type: 'Create' | 'Edit';
    onEdit: (_id: string, formData: FormData) => Promise<void>;
    onSelectionChanged: (item: BaseItem | undefined) => void | undefined;
}

export const ItemForm: FC<FormProps> = ({ type, onEdit, onSelectionChanged }) => {
    const { user } = useContext(AuthContext)
    const [items, setItems] = useState<BaseItem[]>([])
    const [name, setName] = useState<string | undefined>('');
    const [description, setDescription] = useState<string | undefined>('');
    const [imageInfo, setImageInfo] = useState<File | null>(null);
    const [id, setItemID] = useState<string>('');

    const [isValid, setIsValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isEdit = useMemo(() => type === 'Edit', [type]);

    const handleUpdate = useCallback(async () => {
        setIsLoading(true);
        const formData: FormData = new FormData()
        if (description)
            formData.append('description', description);
        if (name)
            formData.append('name', name);
        if (isEdit)
            formData.append('_id', id);
        if (imageInfo) {
            formData.append('image', imageInfo, imageInfo?.name);
        }
        await onEdit(id, formData);
        setIsLoading(false);
    }, [description, name, imageInfo]);

    useEffect(() => {
        if (!name?.length || !description?.length) 
            return setIsValid(false);
        if (name?.length === 0 || description?.length === 0) 
            return setIsValid(false);
        return setIsValid(true);
    }, [description, type, name]);

    useEffect(() => {
        async function getItems() {
            const x = await ItemsService.getAllUserItems();
            setItems(x);
        }
        getItems()
    }, [])
    const onClickItem = (id: string) => {
        console.log(`Item clicked: ${id}`);
        setItemID(id.toString());
        const item = items.find(itm => itm._id === id)
        setName(item?.name)
        setDescription(item?.description)
        onSelectionChanged(item)
        };

    return (
        <div style={{ width: "100%" }}>
            <div className="item-form">
                <h2>{isEdit ? 'Edit Item' : 'Create Item'}</h2>
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
                    baseImageUrl='http://node51.cs.colman.ac.il:4000/public'
                />
            </div>)}
        </div>
    );
};