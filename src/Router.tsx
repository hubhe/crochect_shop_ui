import { FC } from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { CartPage } from './pages/cartPage/CartPage';
import { GenrePage } from './pages/homePage/GenrePage';
import React from 'react';

import { HomePage } from './pages/homePage/HomePage';
import { AdminPage } from './pages/adminPage/AdminPage';
import { LoginPage, SignUpPage } from './pages/login/LoginPage';
import { PageNotFound } from './pages/PageNotFound';
// import { SearchPage } from './pages/searchPage/SearchPage';
import { useAuthContext } from './providers';
import { Navbar } from './ui';
import { ItemProfile } from './pages/itemProfile/ItemProfile';

export const Router: FC = () => {
    return (
        <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navbar />}>
                            <Route index element={<HomePage />} />
                            <Route path="genres/:genre" element={<GenrePage />} />
                            <Route path="cart/:id/:idInDB" element={<CartPage />} />
                            <Route path="cart" element={<CartPage />} />
                            {/* <Route path="search" element={<SearchPage />} /> */}
                            <Route path="itemProfile/:id" element={<ItemProfile />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Route>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/sign-up" element={<SignUpPage />} />
                    </Routes>
        </BrowserRouter>
    );
};
