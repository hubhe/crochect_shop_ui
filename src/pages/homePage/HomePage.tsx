import React, { FC } from 'react';
import { ItemsList } from '../../ui/items/ItemsList';
import { Carousel } from '../../ui';
import { GenericCarousel } from './GenericCarousel';

// Import the storeItems directly
import storeItems from '../../data/items.json';
import slides from '../../data/slides.json';
import ItemCard from './ItemCard';

export const HomePage: FC = () => {
    const topItems = slides; 

    const items = storeItems;
    const onClickItem = (id: string) => {
        console.log(`Item clicked: ${id}`);
        // Handle item click logic here
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
              name={item.name}
              uploader={item.uploader}
              comments={item.comments.length}
              image_url={item.imgUrl}
            />
        ))}
      </div>
                 
            </div>
        </div>
    );
};
