import { createContext } from "react";
import { User } from "./services/auth";
import { BaseItem } from "./services/items"

export const AuthContext = createContext<{user: User | null, setUser: Function}>({
    user: null,
    setUser: () => {}
});

export const ItemContext = createContext<{item: BaseItem | null, setItem: Function}>({
    item: null,
    setItem: () => {}
})