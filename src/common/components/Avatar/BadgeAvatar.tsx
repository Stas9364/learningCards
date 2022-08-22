import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import style from '../Header/Header.module.css'
import {AvatarButton} from './AvatarButton';
import {defAva} from '../../../assets/index'
import {authState} from '../../../features/auth';
import {useAppSelector} from '../../utils';

export const BadgeAvatar = () => {
    const state = useAppSelector(authState.state);

    return (
        <Stack direction="row" spacing={2} className={style.BadgeAvatars}>
            <AvatarButton>
                <Avatar alt="Remy Sharp" src={state.avatar ? state.avatar : defAva} />
            </AvatarButton>
        </Stack>
    );
};
