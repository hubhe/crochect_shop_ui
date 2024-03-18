import './Navbar.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AppLogo } from './AppLogo';
import { useCallback } from 'react';
import { NavbarMenu } from './NavbarMenu';
import { AuthContext } from '../../Contexts';
import { getForcast } from '../../services/external/weatherService';

export const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [temp, setTemp] = useState<number | null>(null); // Define type for temp as number | null
    const [tempIcon, setTempIcon] = useState<string | null>(null); // Define type for temp as number | null

    useEffect(() => {
        const fetchWeatherData = async () => {
            const weather = await getForcast();
            const temperature = weather?.temp_c
            if (temperature !== undefined) { // Check if temperature is undefined
                setTemp(temperature);
            }
            const icon = weather?.condition.icon
            if (icon !== undefined) {
                setTempIcon(icon);
            }
        };
        fetchWeatherData();
    }, []);

    const goToHomePage = useCallback(() => navigate('/'), []);

    return (
        <>
            <div className="navbar">
                <AppLogo onClick={goToHomePage} />
                <div className='weather'>
                    <div className='weather-icon'>
                    {tempIcon && <img src={tempIcon} alt="Weather Icon" />} 
                    </div>
                    <div className='weather-degrees'>
                    {temp !== null ? `${temp} °C` : 'Loading...'}
                    </div>
                </div>                
                {!user ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <div className="navbar-end">
                        <NavbarMenu>
                            <div className="user">
                                <Avatar className="avatar" src={`http://localhost:3000/public/${user.imgUrl}`} />
                                <span>{user.name}</span>
                            </div>
                        </NavbarMenu>
                    </div>
                )}
            </div>
            <Outlet />
        </>
    );
};
