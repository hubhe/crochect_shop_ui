import React from 'react';
import './ItemCard.css';

interface ItemCardProps {
  id: string;
  name: string;
  uploader: string;
  image_url: string;
  comments: number;
  onClickItem?: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ id, name, uploader, comments, image_url, onClickItem }) => {
  const handleClick = () => {
    if (onClickItem) {
      onClickItem(id);
    }
  };

  return (
    <div className="card" onClick={handleClick}>
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
