import './ItemProfile.css';

// import {
//     Badge,
//     TextField,
// } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Carousel } from '../../ui';
// import { useFetch } from '../../ui/hooks/useFetch';
// import Button from '@mui/material/Button';
// import { AddNewCommentToDB, connectCommentToItemAndUser } from './HelpfulFunctions';
// import storeItems from '../../data/items.json';
// import { AuthContext } from '../../Contexts';


// export const ItemProfile: React.FC = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { user } = useContext(AuthContext);
//     const {
//         value: fullItem,
//         isLoading: loadingFullItem,
//         refetch,
//     } = useFetch(() => getItemById(+id!), undefined);

//     const [expand, setExpand] = useState(false);
//     const [newComment, setNewComment] = useState('');

//     const [open, setOpen] = React.useState(true);

//     const handleClick = () => {
//         setOpen(!open);
//     };

//     const onClick = () => {
//         setExpand(!expand);
//     };

//     const addNewComment = async () => {
//         if (newComment !== '') {
//             // await AddNewCommentToDB(newComment, fullItem?.id, user?._id ? user._id : '');
//             // await connectCommentToItemAndUser(fullItem?.id, user?._id ? user._id : '');
//         }
//         setNewComment('');
//         await refetch();
//     };

//     return (
//         <><div style={{ height: '100%', overflowY: 'auto' }}>
//             <div className="main-item-screen">
//                 <div className="buy-item">
//                     <div className="buy-item-title-div">
//                         <h1 className="buy-item-title">{`Buy ${fullItem?.name}:`}</h1>
//                     </div>
//                 </div>
//             </div>
//         </div><br /><div className="bottom-profile">
//                 <div className="item-comments">
//                     <h2>Comments: </h2>
//                     <div className="write-your-comment">
//                         <TextField
//                             value={newComment}
//                             id="outlined-basic"
//                             onChange={(event) => {
//                                 setNewComment(event.target.value);
//                             } }
//                             className="new-comment-content"
//                             label="New Comment"
//                             variant="outlined"
//                             multiline />
//                         <br />
//                         <Button
//                             variant="contained"
//                             endIcon={<SendIcon />}
//                             className="submit-new-comment-btn"
//                             onClick={addNewComment}
//                         >
//                             Submit
//                         </Button>
//                     </div>
//                     <div className="comments">
//                         {fullItem?.comments && fullItem?.comments.length !== 0 ? (
//                             fullItem?.comments.map((comment: any, i: any) => (
//                                 <div key={i} className="written-comments">
//                                     <Badge
//                                         badgeContent={comment?.likes.length}
//                                         color="primary"
//                                         key={i}
//                                     >
//                                         <div className="written-comment-info">
//                                             <div className="written-comments-name">
//                                                 By User: {comment?.userName}
//                                             </div>
//                                             <div className="written-comments-content">
//                                                 {comment?.content}
//                                             </div>
//                                         </div>
//                                     </Badge>
//                                 </div>
//                             ))
//                         ) : (
//                             <div>
//                                 Pretty empty here! <br /> Be the first to write a comment!
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div></>
//     );
// };