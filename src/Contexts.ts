import { createContext } from "react";
import { User } from "./services/auth";


export const AuthContext = createContext<{user: User | null, setUser: Function}>({
    user: null,
    setUser: () => {}
});