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
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';



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
    const navigate = useNavigate();

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

    const onClick = useCallback(async () => {
        setIsLoading(true);
        try {
            const item = await ItemsService.deleteItem(id);
            setIsLoading(false);
            console.log('Deleted item successfully: ', item);
            navigate('/');
        } catch (e) {
            console.log('Delete item failed', e);
        }
       
    }, []);

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
                        <><span>
                            Would like to add new item? <Link to="/post/create">Create</Link>
                        </span>
                        <br/>
                        <Button
                        variant="contained"
                        endIcon={<Delete />}
                        className="delete-item-btn"
                        onClick={onClick} // Call onClick when the button is clicked
                        >
                        Delete Item
                        </Button></>
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
                    baseImageUrl='http://localhost:4000/public'
                />
            </div>)}
        </div>
    );
};