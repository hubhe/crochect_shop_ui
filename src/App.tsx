import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google'

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { AuthProvider } from './providers/auth/AuthProvider';
import { Router } from './Router';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function App(): JSX.Element {
    return (
        <div className="crochet-store-app">
            <AuthProvider>
                <GoogleOAuthProvider clientId="21172355239-lnb2kj9grjiaiia0lg2oka2udhi24min.apps.googleusercontent.com">
                <ThemeProvider theme={lightTheme}>
                    <Router />
                </ThemeProvider>
                </GoogleOAuthProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
