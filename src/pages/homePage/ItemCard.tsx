import React from 'react';
import './ItemCard.css'

interface ItemCardProps {
  name: string;
  uploader: string;
  image_url: string;
  comments: number;
}



const ItemCard: React.FC<ItemCardProps> = ({ name, uploader, comments, image_url }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Author: {uploader}</p>
        <p className="card-text">Comments: {comments}</p>
        <img className="item-img" src={image_url} alt={name} />
      </div>
    </div>
  );
};

export default ItemCard;
