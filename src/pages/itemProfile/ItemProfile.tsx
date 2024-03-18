import './ItemProfile.css';

import {
    Badge,
    TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Carousel } from '../../ui';
import { useFetch } from '../../ui/hooks/useFetch';
import Button from '@mui/material/Button';
import { CommentService, ItemsService } from '../../services';
import storeItems from '../../data/items.json';
import { AuthContext, ItemContext } from '../../Contexts';
import Card from '@mui/material/Card';


export const ItemProfile: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [expand, setExpand] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [open, setOpen] = React.useState(true);
  
    // const {
    //     value: item,
    //     isLoading: loadingFullItem,
    //     refetch,
    // } = useFetch(async () => await ItemsService.getItemById(id!), undefined);
    
    const item = storeItems[Number(id) - 1];

    const handleClick = () => {
        setOpen(!open);
    };

    const onClick = () => {
        setExpand(!expand);
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
                  onClick={handleClick}
                >
                  Submit
                </Button>
              </div>
              <div className="comments">
                {item?.comments && item?.comments.length !== 0 ? (
                  item?.comments.map((comment: any, i: any) => (
                    <div key={i} className="written-comments">
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
        </>
      );      
};