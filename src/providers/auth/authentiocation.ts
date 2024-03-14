import {
    register as serverSignUp,
    login as serverLogin,
    signOut as serverSignOut,
    updateUserProfile,
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

export async function signUp(formData: FormData): Promise<User> {
    try {
        const userCredential = await serverSignUp(formData);

        return userCredential.data.user;
    } catch (error) {
        const authError = error as AuthEventError;
        const errorCode = authError.code;
        const errorMessage = authError.message;

        throw error;
    }
}

export async function updateProfile(id: string | undefined, name: string | null,
    email: string | null, password: string | null, photoUrl: string | null): Promise<User> {
        try {
            const userCredential = await updateUserProfile(id, email, password, name, photoUrl);
    
            return userCredential.data.user;
        } catch (error) {
            const authError = error as AuthEventError;
            const errorCode = authError.code;
            const errorMessage = authError.message;
    
            throw error;
        }
}

export async function login(email: string, password: string): Promise<User> {
    try {
        const userCredential = await serverLogin(email, password);

        return userCredential.data.user;
    } catch (error) {
        const authError = error as AuthEventError;
        const errorCode = authError.code;
        const errorMessage = authError.message;

        throw error;
    }
}

