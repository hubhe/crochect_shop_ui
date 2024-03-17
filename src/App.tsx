import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google'

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Router } from './Router';
import { AuthContext } from './Contexts';
import { Suspense, useEffect, useState } from 'react';
import { AuthService } from './services';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function App(): JSX.Element {
    const [user, setUser] = useState<AuthService.User | null>(null)

    const setActiveUser = async () => {
        setUser(await AuthService.getActiveUser());
    }

    useEffect(() => {
        // check for active user and setUser if needed
        setActiveUser()
    }, [])

    return (
        <div className="crochet-store-app">
            <AuthContext.Provider value={{user, setUser}}>
                <GoogleOAuthProvider clientId="21172355239-lnb2kj9grjiaiia0lg2oka2udhi24min.apps.googleusercontent.com">
                <ThemeProvider theme={lightTheme}>
                    <Router />
                </ThemeProvider>
                </GoogleOAuthProvider>
            </AuthContext.Provider>
        </div>
    );
}

export default App;