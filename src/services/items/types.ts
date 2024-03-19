export interface BaseItem {
    _id: string;
    name: string;
    description: string;
    comments: [];
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
