import './ItemsList.css';

import { FC } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import React from 'react';

import { BaseItem } from '../../providers';
import { ItemDetails } from './ItemDetails';

interface Props {
    items: BaseItem[];
    isLoading: boolean;
    title?: string;
    // loadMore: () => void;
    onScroll?: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
}

export const ItemsList: FC<Props> = ({ items, title, isLoading, onScroll }) => {
    return (
        <div className="items-list-wrapper" onScroll={onScroll}>
            {title && <h1>{title}</h1>}
            <div className="items-list">
                {items.map((item, index) => (
                    <ItemDetails key={`${item.id}|${index}`} {...item} />
                ))}
            </div>
            <LoadingButton
                className="load-more-items"
                loading={isLoading}
                // onClick={loadMore}
                variant="contained"
            >
                Load More Items
            </LoadingButton>
        </div>
    );
};
