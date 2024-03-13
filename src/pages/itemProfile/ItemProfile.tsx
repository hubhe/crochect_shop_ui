import './ItemProfile.css';

import {
    Badge,
    TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getItemById,
    GetItemFromDB,
    getUserFromDB,
    parseToUser,
} from '../../providers';
import { useAuthContext } from '../../providers/auth/AuthProvider';
import { Carousel } from '../../ui';
import { useFetch } from '../../ui/hooks/useFetch';
import Button from '@mui/material/Button';
import { AddNewCommentToDB, connectCommentToItemAndUser } from './HelpfulFunctions';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const ItemProfile: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const {
        value: fullItem,
        isLoading: loadingFullItem,
        refetch,
    } = useFetch(() => getItemById(+id!), undefined);

    const [expand, setExpand] = useState(false);
    const [isItemInLibrary, setIsItemInLibrary] = useState(true);
    const [newComment, setNewComment] = useState('');

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const onClick = () => {
        setExpand(!expand);
    };

    useEffect(() => {
        checkIfItemInLibrary();
    }, []);

    const checkIfItemInLibrary = async () => {
        const userFromDB: any = await parseToUser(await getUserFromDB(user?._id ? user._id : ''));
        const isItemIn = userFromDB?.itemLibrary.some((item: any) => item.item_id == id);
        setIsItemInLibrary(isItemIn);
    };

    const addNewComment = async () => {
        if (newComment !== '') {
            await AddNewCommentToDB(newComment, fullItem?.id, user?._id ? user._id : '');
            await connectCommentToItemAndUser(fullItem?.id, user?._id ? user._id : '');
        }
        setNewComment('');
        await refetch();
    };

    const LikingAComment = async (commentID: string) => {
        await fetch(`http://localhost:1234/comment/${commentID}`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                update: { likes: user?._id },
                isArray: true,
            }),
        });
        await refetch();
    };

    const addingAReplay = async (replay: string, commentID: string) => {
        await fetch(`http://localhost:1234/comment/${commentID}`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                update: { replay: replay },
                isArray: true,
            }),
        });
        await refetch();
    };

    return (
        <div style={{ height: '100%', overflowY: 'auto' }}>
            <div className="main-item-screen">
                <div className="item-screenshots">
                    {fullItem ? (
                        <Carousel
                            title=""
                            items={fullItem?.screenShots}
                            autoSlide
                            isLoading={loadingFullItem}
                        />
                    ) : (
                        ''
                    )}
                    <div className="buy-item">
                        <div className="buy-item-title-div">
                            <h1 className="buy-item-title">{`Buy ${fullItem?.name}:`}</h1>
                        </div>
                        <div className="buy-item-btn">
                            <span>{fullItem?.price}$</span>
                                <Button
                                    className="add-to-card-btn"
                                    variant="outlined"
                                    onClick={() =>
                                        navigate(`/cart/${fullItem?.id}/${fullItem?.idFromDB}`)
                                    }
                                >
                                    Add To Cart
                                </Button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="bottom-profile">
                <div className="item-comments">
                    <h2>Comments: </h2>
                    <div className="write-your-comment">
                        <TextField
                            value={newComment}
                            id="outlined-basic"
                            onChange={(event) => {
                                setNewComment(event.target.value);
                            }}
                            className="new-comment-content"
                            label="New Comment"
                            variant="outlined"
                            multiline
                        />
                        <br />
                        <Button
                            variant="contained"
                            endIcon={<SendIcon />}
                            className="submit-new-comment-btn"
                            onClick={addNewComment}
                        >
                            Submit
                        </Button>
                    </div>
                    <div className="comments">
                        {fullItem?.comments && fullItem?.comments.length !== 0 ? (
                            fullItem?.comments.map((comment: any, i: any) => (
                                <div key={i} className="written-comments">
                                    <Badge
                                        badgeContent={comment?.likes.length}
                                        color="primary"
                                        key={i}
                                    >
                                        <div className="written-comment-info">
                                            <div className="written-comments-name">
                                                By User: {comment?.userName}
                                            </div>
                                            {comment.userID !== user?._id ? (
                                                <Button
                                                    onClick={() => {
                                                        if (!comment.likes.includes(user?._id)) {
                                                            LikingAComment(comment.commentID);
                                                        }
                                                    }}
                                                >
                                                    {comment.likes.includes(user?._id) ? (
                                                        <FavoriteIcon />
                                                    ) : (
                                                        <FavoriteBorderIcon />
                                                    )}
                                                </Button>
                                            ) : (
                                                ''
                                            )}

                                            <div className="written-comments-content">
                                                {comment?.content}
                                            </div>
                                        </div>
                                    </Badge>
                                </div>
                            ))
                        ) : (
                            <div>
                                Pretty empty here! <br /> Be the first to write a comment!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
