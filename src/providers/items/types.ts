export interface BaseItem {
    // comments: [];
    id: number;
    name: string;
    price: number;
    imgUrl: string;
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
