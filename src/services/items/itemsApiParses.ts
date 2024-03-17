import {
    GetItemFromDB,
    getItemScreemShots,
    getItemAchievements,
    getUserFromDB,
} from './itemsProvider';
import { BaseItem, Genre, GenreDetails } from './types';

export function parseToBaseItem(item: any): BaseItem {
    return {
        comments: item.comments ? item.comments : [],
        id: item.id,
        imgUrl: item.background_image ? item.background_image : item.imageUrl,
        name: item.name,
        price: item.price,
    };
}

export async function parseComment(comment: any) {
    const user = await getUserFromDB(comment.user_id);

    return {
        commentID: comment._id,
        content: comment.comment,
        userName: user.profile_name,
        userID: comment.user_id,
    };
}

export async function parseToFullItem(item: any) {
    const updatedItem: any = await parseToItemWithPrice(item);
    const screenShots = await getItemScreemShots(item.id);
    const achievements = await getItemAchievements(item.id);

    const comments = [];
    for (let index = 0; index < updatedItem.comments.length; index++) {
        if (updatedItem.comments[index].length != 0) {
            const parsedComment = await parseComment(updatedItem.comments[index]);
            comments.push(parsedComment);
        }
    }

    return {
        idFromDB: updatedItem.idFromDB,
        comments: comments,
        id: item.id,
        name: item.name,
        price: updatedItem.price,
        imageUrl: item.background_image ? item.background_image : item.imageUrl,
        genres: item.genres,
        description: item.description,
        released: item.released,
        playtime: item.playtime,
        screenShots: screenShots,
        achievements: achievements,
    };
}

export function parseToAchievements(item: any) {
    return {
        name: item.name,
        description: item.description,
        image: item.image,
        percent: item.percent,
    };
}

export function parseToScreenShot(item: any) {
    return {
        imageUrl: item.image,
        imageWidth: item.width,
        imageHeight: item.height,
        id: item.id,
        name: '',
    };
}

export async function parseToUser(user: any) {
    return {
        userID: user.user_id,
        inCart: user.in_cart,
        itemLibrary: user.item_library,
        comments: user.comments,
    };
}

export async function parseToItemWithPrice(item: any): Promise<BaseItem> {
    const info: any = await GetItemFromDB(item.id);
    if (info.length != 0) {
        return parseToBaseItem({
            ...item,
            comments: info[0].comments,
            price: info[0].price,
            idFromDB: info[0]._id,
        });
    } else {
        return parseToBaseItem({
            ...item,
            comments: [],
            price: Math.floor(Math.random() * 301),
            idFromDB: 0,
        });
    }
}

export function parseToGenre(genre: any): Genre {
    return {
        id: genre.id,
        imageUrl: genre.image_background,
        name: genre.name,
        itemsCount: genre.items_count,
    };
}

export function parseToGenreDetails(genre: any): GenreDetails {
    return {
        ...parseToGenre(genre),
        description: genre.description,
    };
}
