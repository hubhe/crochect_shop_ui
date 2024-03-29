import './AppLogo.css';
import React from 'react';

import { FC } from 'react';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import classNames from 'classnames';

interface Props {
    hideTitle?: boolean;
    small?: boolean;
    className?: string;
    onClick?: () => void;
}

export const AppLogo: FC<Props> = ({ hideTitle, small, className, onClick }) => {
    return (
        <div
            className={classNames('app-logo', className, { small, click: !!onClick })}
            onClick={onClick}
        >
            {/* <SportsEsportsIcon fontSize={small ? 'medium' : 'large'} /> */}
            <a href="/">
                <img src="/crochetLogo.png" className="logo" />
            </a>
            {!hideTitle ? <h2 className="app-logo-title">Crochet Store</h2> : null}
        </div>
    );
};
