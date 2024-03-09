import './HomePage.css';

import { FC, useCallback } from 'react';
import React from 'react';

import { parseToItemWithPrice } from '../../providers';
import { ExtraData, getItems, getItemsUrl, getGenres } from '../../providers/items/itemsProvider';
import { Carousel, usePageination, useFetch, capitalize } from '../../ui';
import { useNavigate } from 'react-router-dom';
import { ItemsList } from '../../ui/items/ItemsList';

export const HomePage: FC = () => {
    const {
        onScroll,
        loadMore,
        results: items,
        isLoading: loadingItems,
    } = usePageination(getItemsUrl(), parseToItemWithPrice);

    const { value: topItems, isLoading: loadingTopItems } = useFetch(
        () => getItems({ page_size: 10 }),
        [],
    );

    return (
        <div className="home-page" onScroll={onScroll}>
            <Carousel
                className="top-items-carousel"
                title="Shop Plushies"
                items={topItems}
                autoSlide
                isLoading={loadingTopItems}
            />
            <GenericCarousel type="genres" />
            <ItemsList
                title="Best Sellers"
                items={items}
                isLoading={loadingItems}
                loadMore={loadMore}
            />
        </div>
    );
};

const GenericCarousel: FC<{ type: ExtraData }> = ({ type }) => {
    const navigate = useNavigate();

    const onClick = useCallback((id: number) => {
        navigate(`${type}/${id}`);
    }, []);

    return <BasicCarousel name={type} getValue={() => getGenres(type)} onClick={onClick} />;
};

interface BasicProps {
    name: string;
    getValue: () => Promise<any>;
    onClick?: (id: number) => void;
}

const BasicCarousel: FC<BasicProps> = ({ name, getValue, onClick }) => {
    const { value, isLoading } = useFetch(() => getValue(), []);
    return (
        <Carousel
            title={capitalize(name)}
            items={value}
            itemsInOneSlider={4}
            autoSlide
            isLoading={isLoading}
            randomColors
            onClickItem={onClick}
        />
    );
};

const _getWeekDates = () => {
    const now = new Date();

    return [new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), now];
};
