import { Menu, MenuItem } from '@mui/material';
import { FC, PropsWithChildren, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../providers/auth/AuthProvider';
import React from 'react';

export const NavbarMenu: FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const { signOut, user } = useAuthContext();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onClose = (url?: string) => {
        setAnchorEl(null);
        if (url) navigate(url);
    };

    return (
        <>
            <div className="userMenu">
                <Menu anchorEl={anchorEl} open={open} onClose={() => onClose()}>
                    <MenuItem onClick={() => onClose('/profile')}>
                        <span>Edit Profile</span>
                    </MenuItem>
                    {user?.email === 'admin@admin.com' ? (
                    <><MenuItem onClick={() => onClose('/admin/create')}>
                            <span>Create Item</span>
                        </MenuItem><MenuItem onClick={() => onClose('/admin/edit')}>
                                <span>Edit Item</span>
                            </MenuItem></>) : (
                        <MenuItem onClick={() => onClose('/cart')}>
                        <span>View Cart</span>
                    </MenuItem>
                    )}
                    <MenuItem onClick={signOut}>
                        <span>Sign Out</span>
                    </MenuItem>
                </Menu>
            </div>
            <div onClick={onClick}>{children}</div>
        </>
    );
};
