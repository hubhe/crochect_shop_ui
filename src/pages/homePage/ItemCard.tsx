import React from 'react';
import './ItemCard.css'

interface ItemCardProps {
  name: string;
  uploader: string;
  image_url: string;
}



const ItemCard: React.FC<ItemCardProps> = ({ name, uploader, image_url }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Author: {uploader}</p>
        <img className="item-img" src={image_url} alt={name} />
      </div>
    </div>
  );
};

export default ItemCard;
