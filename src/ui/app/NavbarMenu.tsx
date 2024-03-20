import { Menu, MenuItem } from '@mui/material';
import { FC, PropsWithChildren, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { AuthService } from '../../services';
import { AuthContext } from '../../Contexts';

export const NavbarMenu: FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onClose = (url?: string) => {
        setAnchorEl(null);
        if (url) navigate(url);
    };

    const signOut = () => {
        AuthService.signOut();
        setUser(null);
        navigate('/')
    }

    return (
        <>
            <div className="userMenu">
                <Menu anchorEl={anchorEl} open={open} onClose={() => onClose()}>
                    <MenuItem onClick={() => onClose('/profile')}>
                        <span>Edit Profile</span>
                    </MenuItem>
                    <MenuItem onClick={() => onClose('/post/create')}>
                            <span>Post Plushie</span>
                    </MenuItem>
                    <MenuItem onClick={signOut}>
                        <span>Sign Out</span>
                    </MenuItem>
                </Menu>
            </div>
            <div onClick={onClick}>{children}</div>
        </>
    );
};
