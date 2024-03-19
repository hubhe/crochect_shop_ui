import React, { FC, useEffect, useState } from 'react';
import { Carousel } from '../../ui';
import { GenericCarousel } from './GenericCarousel';
import storeItems from '../../data/items.json';
import slides from '../../data/slides.json';
import ItemCard from './ItemCard';
import { useNavigate } from 'react-router-dom';
import { ItemsService } from '../../services';
import { BaseItem } from '../../services/items'; // Assuming you have defined a BaseItem type for your items

export const HomePage: FC = () => {
    const [items, setItems] = useState<BaseItem[]>([]);
    const [uploaders, setUploaders] = useState<Record<string, string>>({}); // Mapping of item ID to uploader
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedItems = await ItemsService.getAllItems();
                setItems(fetchedItems);

                // Extract item IDs from fetched items
                const itemIds = fetchedItems.map(item => item._id);
                // Call the server function to get uploaders for each item
                const uploadersData = await ItemsService.getAllUploaders(itemIds);

                // Update the state with the uploader mapping
                setUploaders(uploadersData);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchData();
    }, []);

    const onClickItem = (id: string) => {
        console.log(`Item clicked: ${id}`);
        navigate(`/itemProfile/${id}`);    
    };

    const handleScroll = () => {
        console.log('Scrolled');
    };

    return (
        <div className="home-page" onScroll={handleScroll}>
            <Carousel
                className="top-items-carousel"
                title=""
                items={slides}
                autoSlide
                baseImageUrl=''
            />
            <div className="posts">
                {items.map((item, index) => (
                    <ItemCard
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        uploader={uploaders[item._id]} // Retrieve uploader information from the mapping
                        comments={item.comments ? item.comments.length : 0}
                        image_url={`https://node51.cs.colman.ac.il:4000/public/${item.imgUrl}`}
                        onClickItem={onClickItem}
                    />
                ))}
            </div>
        </div>
    );
};
