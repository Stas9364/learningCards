import React from 'react';
import style from './Header.module.css'
import {BadgeAvatar} from '../Avatar/BadgeAvatar';
import {oldCar, logo} from '../../../assets/index';
import {authState} from '../../../features/auth';
import {useAppSelector} from '../../utils';

export const Header = React.memo(() => {
    const isLogin = useAppSelector(authState.isLogin);

    if (!isLogin) {
        return (
            <div className={style.center}>
                <div className={style.marquee}>
                    <span><img className={style.img} src={oldCar} alt=""/></span>
                </div>
            </div>
        )
    }

    return (
        <div className={style.header}>
            <div className={style.logo}><img src={logo} alt='logo'/></div>
            <BadgeAvatar/>
        </div>
    )
});
