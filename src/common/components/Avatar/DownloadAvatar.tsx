import React, {ChangeEvent, useEffect, useState} from 'react';
import {errorAC, updateMeTC} from '../../../features/auth/authReducer';
import style from '../../../features/auth/Registration/Registration.module.css';
import {defAva} from '../../../assets/index';
import {IconButton} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {CustomizedSnackbar} from '../ErrorSnackbar/Snackbar';
import {uploadHandler, useAppDispatch, useAppSelector} from '../../utils';
import {authState} from '../../../features/auth';

export const DownloadAvatar = () => {
    const dispatch = useAppDispatch();

    const [ava, setAva] = useState('');
    const [isAvaBroken, setIsAvaBroken] = useState(false);

    const state = useAppSelector(authState.state);
    const error = useAppSelector(authState.error) as string;

    useEffect(() => {
        if (ava) {
            dispatch(updateMeTC({avatar: ava}));
        }
    }, [ava]);

    const onUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('upload')
        uploadHandler(e, setAva);
        setIsAvaBroken(false);
        dispatch(errorAC(null))
    };

    const errorHandler = () => {
        console.log(123);
        setIsAvaBroken(true)
        //dispatch(errorAC('The image is damaged'))
    };

    return (
        <>
            <img
                className={style.registerImg}
                onError={errorHandler}
                src={isAvaBroken ? defAva : state.avatar}
                alt="Avatar"
            />

            <label>
                <input

                    type="file"
                    accept="image/*"
                    onChange={(e) => onUploadHandler(e)}
                    style={{display: 'none'}}
                />

                <IconButton component="span">
                    <CloudUploadIcon/>
                </IconButton>
            </label>

            <CustomizedSnackbar errors={error}/>
        </>

    )
};
