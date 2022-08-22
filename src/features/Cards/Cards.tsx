import React, {useEffect} from 'react';
import style from './Cards.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, Navigate, useLocation, useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../common/utils';
import {setCardsParamsAC, setCardsParamsTC} from './paramsCardsReducer/paramsCardsReducer';
import styleD from '../DeskCards/DeskCards.module.css'
import {Button} from '@mui/material';
import {cardParams} from './paramsCardsReducer/selectors';
import {CardsTable} from './CardsTable/CardsTable';
import {createCardTC} from './cardsReducer/cardsReducer';
import {AddUpdateCard, OnSavePayloadType} from './EditCardsComponents/AddUpdateCard';
import {authState} from '../auth';
import {SearchInput} from '../../common/components';

export const Cards = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isLogin = useAppSelector(authState.isLogin);
    const question = useAppSelector(cardParams.cardQuestion);
    const sortCards = useAppSelector(cardParams.sortCards);
    const user_ID = useAppSelector(authState.id);

    const {id} = useParams<{ id: string }>(); //вытаскивает айдишку из урла
    const {packName, userId} = useLocation().state as {packName: string, userId: string};

    useEffect(() => {
        if (id) {
            dispatch(setCardsParamsTC(id));
        }
    }, [dispatch, id, sortCards, question]);

    const onSearchClean = () => {
        dispatch(setCardsParamsAC({cardQuestion: ''}));
    };

    const studyHandler = () => {
        navigate(
            '/learn',
            {state: {packName, packId: id}}
        );
    };

    const onSave = (payload: OnSavePayloadType) => {
        dispatch(createCardTC({...payload}))
    };

    if (!isLogin) {
        return <Navigate to='/'/>;
    }

    return (
        <div className={style.cards}>

            <div className={style.cardsContainer}>
                <ArrowBackIcon
                    fontSize={'small'}
                    sx={{marginBottom: -0.5, marginRight: 1}}
                />

                <Link
                    onClick={onSearchClean}
                    style={{
                        color: 'black',
                        backgroundColor: "transparent",
                        boxShadow: "none", textDecoration: 'none', fontSize: 18,
                    }} to='/deskCards'>
                    Back to Pack List
                </Link>

                <div className={styleD.nameAndButton}>
                    <div>
                        <h1 className={style.textPackName}>
                            {packName}
                        </h1>
                    </div>
                </div>


                <div className={styleD.search}>
                    <div className={styleD.inputContainer}>
                        <h3>Search</h3>
                        <SearchInput
                            delayTime={500}
                            itemsName={question}
                            action={setCardsParamsAC}
                            searchField={'cardQuestion'}
                        />
                    </div>

                    <div style={{width: '30%'}}>
                        <Button
                            onClick={studyHandler}
                            type='submit'
                            color='primary'
                            variant='contained'
                            sx={{
                                width: 150,
                                marginTop: 8,
                                borderRadius: 5,
                                marginRight: 10
                            }}>Learn
                        </Button>
                    </div>

                    {user_ID === userId && <div >
                        <AddUpdateCard
                            packId={id}
                            buttonName={'Add card'}
                            onSave={onSave}
                        />
                    </div>}
                </div>

                <CardsTable packID={id}/>

            </div>
        </div>
    )
}
