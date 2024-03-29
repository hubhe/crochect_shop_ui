import './ItemDetails.css';

import { FC } from 'react';
import classNames from 'classnames';
import Card from '@mui/material/Card';
import React from 'react';

import type { BaseItem } from '../../services/items';
import { useNavigate } from 'react-router-dom';

type Props = BaseItem;

export const ItemDetails: FC<Props> = ({
    _id,
    imgUrl,
    name,
    comments,
    description,
}) => {
    const navigate = useNavigate();
    return (
        <Card
            itemType="dark"
            className="item-details"
            onClick={() => navigate(`/itemProfile/${_id}`)}
        >
            <img src={imgUrl} />
            <h3>{name}</h3>
            <div className="details">
            </div>
        </Card>
    );
};

