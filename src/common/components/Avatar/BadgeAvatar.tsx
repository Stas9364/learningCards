import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import style from '../Header/Header.module.css'
import {useAppSelector} from '../../utils/hooks';
import {authState} from '../../../features/auth/selectors';
import {AvatarButton} from '../Header/AvatarButton';
import defAva from '../../../assets/img/defAva.png'

export const BadgeAvatars = () => {
    const state = useAppSelector(authState.state);

    return (
        <Stack direction="row" spacing={2} className={style.BadgeAvatars}>
            <AvatarButton>
                <Avatar alt="Remy Sharp" src={state.avatar ? state.avatar : defAva} />
            </AvatarButton>
        </Stack>
    );
};
