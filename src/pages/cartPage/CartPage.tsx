import './CartPage.css';
import React from 'react';

import { Button, Card } from '@mui/material';
import { FC, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUserFromDB, parseToUser } from '../../providers';
import { useAuthContext } from '../../providers/auth/AuthProvider';
import { useFetch } from '../../ui';
import DeleteIcon from '@mui/icons-material/Delete';

export const CartPage: FC = () => {
    const { id, idInDB } = useParams();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const {
        value: userInfo,
        isLoading: loadingUserInfo,
        refetch,
    } = useFetch(
        async () => await parseToUser(await getUserFromDB(user?._id ? user._id : '')),
        undefined,
    );

    useEffect(() => {
        addItemToCart();
    }, []);

    const addItemToCart = async () => {
        if (idInDB) {
            await fetch(`http://localhost:1234/user/${user?._id}`, {
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    update: { in_cart: idInDB },
                    isArray: true,
                }),
            });
            await refetch();
        }
    };

    const removeAllTheItems = async () => {
        await fetch(`http://localhost:1234/user/${user?._id}`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                update: { in_cart: [] },
            }),
        });
        await refetch();
    };

    const getTotalPrice = () => {
        let price = 0;
        userInfo?.inCart.forEach((item: any) => {
            price += item?.price;
        });
        return price;
    };

    const getTotalItemCount = () => {
        let count = 0;
        userInfo?.inCart.forEach((item: any) => {
            count++;
        });
        return count;
    };

    const removeItemFromCart = async (itemToRemove: any) => {
        await fetch(`http://localhost:1234/user/${user?._id}`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                update: { in_cart: itemToRemove },
                shouldRemove: true,
            }),
        });
        await refetch();
    };

    const buyItems = async () => {
        const items: any = [];
        userInfo?.inCart.forEach((item: any) => {
            items.push(item?.idFromDB);
        });
        await fetch(`http://localhost:1234/user/${user?._id}`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                update: { item_library: items },
                isArray: true,
            }),
        });
        await removeAllTheItems();
        navigate('/');
    };

    return (
        <div className="cart-page">
            <Card className="order-summary">
                <h2>Shopping Summary</h2>
                <div className="total-price-container">
                    <h3>Estimated total:</h3>
                    <h2>{getTotalPrice()}$</h2>
                </div>
                <div className="total-item-count-container">
                    <h3>Item Count:</h3>
                    <h2>{getTotalItemCount()}</h2>
                </div>
                <div className="purchase-btn">
                    <Button variant="contained" onClick={buyItems}>
                        Purchase
                    </Button>
                </div>

                <div className="order-summary-bottom">
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => removeAllTheItems()}
                    >
                        Remove All Items
                    </Button>
                </div>
            </Card>
            <div className="cart-information">
                <div className="cart-top">
                    <h2>Shopping List</h2>
                </div>
                <div className="cart-items">
                    {userInfo
                        ? userInfo.inCart.map((item: any) => (
                              <Card className="cart-item" key={`${item.idFromDB}-1`}>
                                  <img src={item.imageUrl} />
                                  <h1 className="item-name">{item.name}</h1>
                                  <h1 className="price-tag">{item.price}$</h1>
                                  <Button
                                      variant="outlined"
                                      startIcon={<DeleteIcon />}
                                      className="remove-from-cart-button"
                                      onClick={() => removeItemFromCart(item.idFromDB)}
                                  >
                                      Remove From Cart
                                  </Button>
                              </Card>
                          ))
                        : ''}
                </div>
                <div className="cart-bottom">
                    <Button className="back-btn" variant="contained">
                        <Link to="/">Continue Shopping</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
