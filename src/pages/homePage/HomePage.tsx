import React, { FC } from 'react';
import { ItemsList } from '../../ui/items/ItemsList';
import { Carousel } from '../../ui';
import { GenericCarousel } from './GenericCarousel';

// Import the storeItems directly
import storeItems from '../../data/items.json';
import slides from '../../data/slides.json';
import ItemCard from './ItemCard';
import { useNavigate } from 'react-router-dom';

export const HomePage: FC = () => {
    const topItems = slides; 


    const navigate = useNavigate();
    const items = storeItems;
    const onClickItem = (id: string) => {
        console.log(`Item clicked: ${id}`);
        navigate(`/itemProfile/${id}`);    
    };

    const handleScroll = () => {
        console.log('Scrolled');
    };

    return (
        <div className="home-page" onScroll={handleScroll}>
            <div className="home-page">
                <Carousel
                    className="top-items-carousel"
                    title=""
                    items={topItems}
                    autoSlide
                />
                <div className="posts">
        {items.map((item, index) => (
            <ItemCard
            key={item.id}
            id = {item.id}
              name={item.name}
              uploader={item.uploader}
              comments={item.comments.length}
              image_url={item.imgUrl}
              onClickItem={onClickItem}
            />
        ))}
      </div>
                 
            </div>
        </div>
    );
};
