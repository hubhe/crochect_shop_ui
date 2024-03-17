import { GetCommentFromDB } from '../../services';

export const AddNewCommentToDB = async (content: string, itemID: number, userID: string) => {
    await fetch(`http://localhost:1234/comment`, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemID: itemID, userID: userID, comment: content }),
    });
};

export const connectCommentToItemAndUser = async (itemID: number, userID: string) => {
    const res: any = await GetCommentFromDB(itemID, 'item_id');

    const allCommentsIDs: any = [];
    res.forEach((element: any) => {
        allCommentsIDs.push(element._id);
    });
    await fetch(`http://localhost:1234/item/${itemID}`, {
        method: 'PUT',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            update: { comments: allCommentsIDs },
            isArray: true,
        }),
    });
    await fetch(`http://localhost:1234/user/${userID}`, {
        method: 'PUT',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            update: { comments: allCommentsIDs },
            isArray: true,
        }),
    });
};