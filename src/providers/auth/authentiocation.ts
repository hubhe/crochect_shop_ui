import {
    register as serverSignUp,
    login as serverLogin,
    signOut as serverSignOut,
    updateUserImage,
} from './serverAuth';

interface User {
    id: string;
    email: string | null;
    name: string | null;
    provider: string;
    photoUrl: string | null;
    token: string;
}

type AuthEventError = {
    code: string;
    message: string;
};

export function signOut() {
    return serverSignOut();
}

export async function signUp(email: string, password: string, name: string): Promise<User> {
    const user = await _userSignInOrUp(email, password, true);
    //todo: maybe update profile ?
    return user;
}

export function updatePicture(token: string, photoURL: string | null): Promise<boolean> {
    return updateUserImage(photoURL, token);
}

export function login(email: string, password: string): Promise<User> {
    return _userSignInOrUp(email, password);
}

async function _userSignInOrUp(email: string, password: string, newUser = false): Promise<User> {
    const signInOrUpFunc = newUser ? serverSignUp : serverLogin;

    try {
        const userCredential = await signInOrUpFunc(email, password);
        //Cookies.set('token', user?.refreshToken, { expires: 1, secure: true, sameSite: 'strict' });
        return userCredential.data.user;
    } catch (error) {
        const authError = error as AuthEventError;
        const errorCode = authError.code;
        const errorMessage = authError.message;

        throw error;
    }
}
