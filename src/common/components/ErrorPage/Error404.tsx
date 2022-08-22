import React from 'react';
import {errorImg} from '../../../assets/index';
import {NavLink} from 'react-router-dom';
import style from '../ErrorPage/Error404.module.css'

export const Error404 = () => {
    return (
        <div>
            <NavLink
                to={'/'}
                className={style.link}
            >Go HOME.</NavLink>

            <img src={errorImg} alt="errorAC 404"/>
            <h1 className={style.text}>Page not found!</h1>
        </div>
    );
};

