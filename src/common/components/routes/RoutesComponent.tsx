import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Error404} from '../ErrorPage/Error404';
import {Preloader} from '../Preloader/mainPreloader/Preloader';
import {initApp} from '../../../app/selectors';
import {Login, Registration} from '../../../features/auth';
import {ProfilePage} from '../../../features/Profile';
import {useAppSelector} from '../../utils';
import {CreatePasswordPage, ForgotPasswordPage} from '../../../features/ChangePassword';
import {DeskCards, Learn} from '../../../features/DeskCards';
import {Cards} from '../../../features/Cards';


export const PATH = {
    login: '/',
    deskCards:'/deskCards',
    registration: '/registration',
    profile: '/profile',
    forgotPassword: '/changePassword',
    createPassword: '/create-password/*',
    cards: '/cards',
    learn: '/learn'
}

export const RoutesComponent = () => {

    const isInitialized = useAppSelector(initApp.isInitialized);

    if (!isInitialized) {
        return <Preloader/>
    }

    return (
        <div>
            <Routes>
                <Route path={PATH.login} element={<Login/>}/>
                <Route path={PATH.deskCards} element={<DeskCards/>}/>
                <Route path={PATH.registration} element={<Registration/>}/>
                <Route path={PATH.profile} element={<ProfilePage/>}/>
                <Route path={PATH.forgotPassword} element={<ForgotPasswordPage/>}/>
                <Route path={PATH.createPassword} element={<CreatePasswordPage/>}/>
                <Route path={`${PATH.cards}/:id`} element={<Cards/>}/>
                <Route path={PATH.learn} element={<Learn/>}/>
                <Route path={'/404'} element={<Error404/>}/>
                <Route path={'/*'} element={<Navigate to={'/404'}/>}/>
            </Routes>
        </div>
    );
};