import { FC } from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

import { HomePage } from './pages/homePage/HomePage';
import { CreateItem,EditItem } from './pages/adminPage/AdminPage';
import { LoginPage, SignUpPage } from './pages/Login/LoginPage';
import { PageNotFound } from './pages/PageNotFound';
import { Navbar } from './ui';
// import { ItemProfile } from './pages/itemProfile/ItemProfile';
import { ProfilePage } from './pages/profilePage/ProfilePage';

export const Router: FC = () => {
    return (
        <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navbar />}>
                            <Route index element={<HomePage />} />
                            <Route path="post/create" element={<CreateItem />} />
                            <Route path="post/edit" element={<EditItem />} />
                            <Route path="profile" element={<ProfilePage />} />
                            {/* <Route path="itemProfile/:id" element={<ItemProfile />} /> */}
                            <Route path="*" element={<PageNotFound />} />
                        </Route>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/sign-up" element={<SignUpPage />} />
                    </Routes>
        </BrowserRouter>
    );
};
