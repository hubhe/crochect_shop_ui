import './ItemProfile.css';

import {
    Badge,
    CardContent,
    TextField,
    Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { CommentService, ItemsService } from '../../services';
import { AuthContext, ItemContext } from '../../Contexts';
import Card from '@mui/material/Card';
import { BaseItem } from '../../services/items';
import {Comment} from '../../services/comments'


export const ItemProfile: React.FC = () => {
    const { id } = useParams();
    const [expand, setExpand] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState<Comment[]>();
    const [open, setOpen] = React.useState(true);
    const { user } = useContext(AuthContext);
    const [item, setItem] = useState<BaseItem>();
    const [uploaders, setUploaders] = useState<Record<string, string>>({}); // Mapping of item ID to uploader
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedItem = await ItemsService.getItemById(id!);
                setItem(fetchedItem.data);
                const fetchedComments = await CommentService.getCommentsByItem(id!);
                setComments(fetchedComments.data);
                // Extract item IDs from fetched items
                const itemIds = fetchedItem._id;
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchData();
    }, []);

    const handleClick = () => {
        setOpen(!open);
    };

    const onClick = async () => {
        try {
            const formData = new FormData();
            formData.append('comment', newComment);
            formData.append('user_id', user?._id!);
            formData.append('item_id', id!)
            // Call the onCommentPublish function with the comment data
            await onCommentPublish(formData);
            // Clear the newComment state after submission
            setNewComment('');
        } catch (error) {
            console.error('Error publishing comment:', error);
        }
    };

    const onCommentPublish = useCallback(async (formData: FormData) => {
        try {
            const response = await CommentService.createComment(formData);
            console.log('Submited comment: ', response);
        } catch (e) {
            console.log('Could not upload', e);
        }
    }, []); 

    return (
        <>
        <Card className="item-card">
          <div style={{ height: '100%', overflowY: 'auto' }}>
            <div className="main-item-screen">
                <div className="buy-item-title-div">
                  <h1 className="buy-item-title">{`${item?.name} by`}</h1>
                </div>
                <br/>
                <div className='item-info'>
                  <img
                    src={item?.imgUrl}
                    alt={item?.name}
                    className="item-image"
                  />
                  <p className="item-description">{item?.description}</p>
                </div>
            </div>
          </div>
          </Card>
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
                  onClick={onClick} // Call onClick when the button is clicked
                >
                  Submit
                </Button>
              </div>
              <div className="comments">
                        {comments && comments.length !== 0 ? (
                            comments.map((comment: any, i: any) => (
                                <Card key={i} className="comment-card">
                                    <CardContent>
                                        <Typography variant="body1" component="p">
                                            {comment.comment}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div>
                                Pretty empty here! <br /> Be the first to write a comment!
                            </div>
                        )}
                    </div>
            </div>
          </div>
        </>
      );      
};
