import './AdminPage.css';
import React from 'react';

import { FC, useEffect, useState } from 'react';
import { useAuthContext } from '../../providers/auth/AuthProvider';
import { Button } from '@mui/material';

import io from 'socket.io-client';

export const AdminPage: FC = () => {
    const [socket, setSocket] = useState<any>(null);
    const [isConnected, setIsConnected] = useState(false);

    const { signOut } = useAuthContext();

    useEffect(() => {
        if (socket === null) {
            setSocket(io('localhost:1234'));
        }
        if (socket) {
            socket.on('connect', () => {
                setIsConnected(true);
                console.log('connected');
                socket.emit('admin');
            });

            socket.on('disconnect', () => {
                setIsConnected(false);
            });
        }
    }, [socket]);

    return (
        <div>
            <div className="pageHeader">
                <h1>Hello Admin,</h1>
                <Button onClick={signOut}>Sign Out</Button>
            </div>
        </div>
    );
};
