import './ItemDetails.css';

import { FC } from 'react';
import classNames from 'classnames';
import Card from '@mui/material/Card';
import React from 'react';

import type { BaseItem } from '../../providers';
import { useNavigate } from 'react-router-dom';

type Props = BaseItem;

export const ItemDetails: FC<Props> = ({
    added,
    id,
    imageUrl,
    name,
    price,
}) => {
    const navigate = useNavigate();
    return (
        <Card
            itemType="dark"
            className="item-details"
            onClick={() => navigate(`/itemProfile/${id}`)}
        >
            <img src={imageUrl} />
            <h3>{name}</h3>
            <div className="details">
                <span>Cost: {price}$</span>
                <span>{added}</span>
            </div>
        </Card>
    );
};

