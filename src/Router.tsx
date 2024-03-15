import { FC } from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { CartPage } from './pages/cartPage/CartPage';
import React from 'react';

import { HomePage } from './pages/homePage/HomePage';
import { CreateItem,EditItem } from './pages/adminPage/AdminPage';
import { LoginPage, SignUpPage } from './pages/Login/LoginPage';
import { PageNotFound } from './pages/PageNotFound';
import { useAuthContext } from './providers';
import { Navbar } from './ui';
import { ItemProfile } from './pages/itemProfile/ItemProfile';
import { ProfilePage } from './pages/profilePage/ProfilePage';

export const Router: FC = () => {
    return (
        <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navbar />}>
                            <Route index element={<HomePage />} />
                            <Route path="admin/create" element={<CreateItem />} />
                            <Route path="admin/edit" element={<EditItem />} />
                            <Route path="cart/:id/:idInDB" element={<CartPage />} />
                            <Route path="cart" element={<CartPage />} />
                            <Route path="profile" element={<ProfilePage />} />
                            <Route path="itemProfile/:id" element={<ItemProfile />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Route>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/sign-up" element={<SignUpPage />} />
                    </Routes>
        </BrowserRouter>
    );
};
