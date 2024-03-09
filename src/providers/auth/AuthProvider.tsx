import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { useAuth } from './useAuth';
import React from 'react';

// TODO: check how to initalize auth context
const authContext = createContext<Partial<ReturnType<typeof useAuth>>>({});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const auth = useAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuthContext = () => {
    return useContext(authContext);
};
