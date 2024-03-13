export interface BaseItem {
    idFromDB: number;
    comments: [];
    id: number;
    name: string;
    imageUrl: string;
    added: number;
    price: number;
}

export interface Genre {
    id: number;
    name: string;
    imageUrl: string;
    itemsCount: number;
}

export interface GenreDetails extends Genre {
    description: string;
}

export const beep = 8;
