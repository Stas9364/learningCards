import React, {useCallback} from 'react';
import style from '../auth/Registration/Registration.module.css'
import {useAppDispatch, useAppSelector} from '../../common/utils/hooks';
import {EditableSpan} from '../../common/components/EditableSpan/EditableSpan';
import {Navigate} from 'react-router-dom';
import {Button, Paper} from '@mui/material';
import {logOutTC, updateMeTC} from '../auth/authReducer';
import pen from '../../assets/img/pen.svg';
import {authState} from '../auth/selectors';
import {DownloadAvatar} from '../../common/components/Avatar/DownloadAvatar';


export const ProfilePage = React.memo(() => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(authState.state);

    const logOut = useCallback(() => {
        dispatch(logOutTC());
    }, []);

    const updateNameHandler = useCallback((name: string) => {
        dispatch(updateMeTC({name}));
    }, []);

    if (!state.isLogin) {
        return <Navigate to='/'/>
    }

    return (
        <div className={style.registration}>
            <Paper
                className={style.registrationPaper}
                elevation={2}
            >
                <div className={style.registrationPaperContainer}>

                    <h1 className={style.registerH1}>Personal Information</h1>

                    <DownloadAvatar/>

                    <h3 className={style.registerName}>{state.email}</h3>

                    <div style={{display: 'flex'}}>
                        <EditableSpan title={state.name} onChange={(name) => updateNameHandler(name)}/>
                        <div
                            style={{
                                opacity: '0.5',
                                marginLeft: '5px',
                                alignSelf: 'center'
                            }}>
                            <img src={pen} alt=""/>
                        </div>
                    </div>

                    <Button
                        onClick={logOut}
                        type='submit'
                        color='primary'
                        variant='contained'
                        sx={{
                            width: 300,
                            marginTop: 5,
                            borderRadius: 5
                        }}
                    >Log out
                    </Button>
                </div>

            </Paper>

        </div>
    );
});


