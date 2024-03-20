import React, { FC } from 'react';
import { Carousel } from '../../ui';
import { capitalize } from '../../ui'; // Assuming you have a helper function for capitalizing strings

interface GenericCarouselProps {
    type: string;
    items: any[]; // You may need to adjust the type according to your data structure
    isLoading?: boolean;
    onClickItem?: (id: string) => void;
}

export const GenericCarousel: FC<GenericCarouselProps> = ({ type, items, isLoading, onClickItem }) => {
    const onClick = (id: string) => {
        if (onClickItem) {
            onClickItem(id);
        }
    };

    return (
        <Carousel
            title={capitalize(type)}
            items={items}
            itemsInOneSlider={4}
            autoSlide
            isLoading={isLoading}
            randomColors
            onClickItem={onClick}
            baseImageUrl=''
        />
    );
};
