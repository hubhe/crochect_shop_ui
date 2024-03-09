import './HomePage.css';

import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import React from 'react';

import { parseToBaseItem, parseToItemWithPrice } from '../../providers';
import { getItems, getItemsUrl, getGenreDetails } from '../../providers/items/itemsProvider';
import { Carousel, usePageination, useFetch } from '../../ui';
import { ItemsList } from '../../ui/items/ItemsList';

export const GenrePage: FC = () => {
    const { genre, tag, platform } = useParams();

    const { value: genreDetails } = useFetch(
        () =>
            getGenreDetails(
                genre || tag || platform || '',
                tag ? 'tags' : platform ? 'platforms' : 'genres',
            ),
        undefined,
    );

    const {
        onScroll,
        results: items,
        isLoading: loadingItems,
        loadMore,
    } = usePageination(
        getItemsUrl({ genres: genre, tags: tag, platforms: platform }),
        parseToItemWithPrice,
    );

    const { value: topItems, isLoading: loadingTopItems } = useFetch(
        () =>
            getItems({
                page_size: 10,
                genres: genre,
                tags: tag,
                platforms: platform,
            }),
        [],
    );

    if (!genreDetails)
        return (
            <div className="home-page">
                <Skeleton className="main-title" variant="text" width="100%" height="3em" />
                <Skeleton
                    className="home-page-description"
                    variant="text"
                    width="100%"
                    height="10em"
                />
                <Carousel
                    title={<Skeleton variant="text" width="50%" height="3em" />}
                    items={[]}
                    isLoading
                    className="top-items-carousel"
                />
            </div>
        );

    return (
        <div
            className="home-page"
            onScroll={onScroll}
            style={{ backgroundImage: getBackgroundImage(genreDetails.imageUrl) }}
        >
            <h1 className="main-title">{genreDetails.name.toUpperCase()} ITEMS </h1>
            <span
                className="home-page-description"
                dangerouslySetInnerHTML={{ __html: genreDetails.description }}
            />
            <Carousel
                className="top-items-carousel"
                title={`Top ${genreDetails.name} Items`}
                items={topItems}
                autoSlide
                isLoading={loadingTopItems}
            />
            <ItemsList
                title="Best Sellers"
                items={items}
                isLoading={loadingItems}
                loadMore={loadMore}
            />
        </div>
    );
};

function getBackgroundImage(src: string) {
    return `linear-gradient(to bottom, rgba(40, 44, 52, 0.8), rgba(40, 44, 52, 1)), url(${src})`;
}
