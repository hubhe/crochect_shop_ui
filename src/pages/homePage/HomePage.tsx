import React, { FC, useContext, useEffect, useState } from 'react';
import { Carousel } from '../../ui';
import { GenericCarousel } from './GenericCarousel';
import storeItems from '../../data/items.json';
import slides from '../../data/slides.json';
import ItemCard from './ItemCard';
import { useNavigate } from 'react-router-dom';
import { CommentService, ItemsService } from '../../services';
import { BaseItem } from '../../services/items'; // Assuming you have defined a BaseItem type for your items
import { AuthContext } from '../../Contexts';

export const HomePage: FC = () => {
    const {user} = useContext(AuthContext)
    const [items, setItems] = useState<BaseItem[]>([]);
    const [uploaders, setUploaders] = useState<Record<string, string>>({}); // Mapping of item ID to uploader
    const [commentCount, setCommentCount] = useState<Record<string, number>>({}); // Mapping of item ID to uploader

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedItems = await ItemsService.getAllItems();
                // Extract item IDs from fetched items
                const itemIds = fetchedItems.map(item => item._id);
                // Call the server function to get uploaders for each item
                const uploadersData = await ItemsService.getAllUploaders(itemIds);
                const commentCountMapping: Record<string, number> = {}
                for (const item of fetchedItems) {
                    const fetchedComments = await CommentService.getCommentsByItem(item._id!);
                    commentCountMapping[item._id] = fetchedComments.length
                }
                setItems(fetchedItems);
                console.log(commentCountMapping)
                setCommentCount(commentCountMapping)
                // Update the state with the uploader mapping
                setUploaders(uploadersData);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchData();
    }, []);

    const onClickItem = (id: string) => {
        if (user) {
            console.log(`Item clicked: ${id}`);
            navigate(`/itemProfile/${id}`);    
        } else {
            navigate('/sign-up')
        }

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
                        comments={commentCount[item._id]}
                        image_url={`https://node51.cs.colman.ac.il:4000/public/${item.imgUrl}`}
                        onClickItem={onClickItem}
                    />
                ))}
            </div>
        </div>
    );
};
