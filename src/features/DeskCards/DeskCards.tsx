import React, {useEffect} from 'react';
import style from './DeskCards.module.css';
import {useAppDispatch, useAppSelector} from '../../common/utils';
import {Navigate} from 'react-router-dom';
import {setParamsAC, setParamsTC} from './paramsReducer/paramsReducer';
import {params} from './paramsReducer/selectors';
import {createPackTC} from './packsReducer/packsReducer';
import {authState} from '../auth';
import {SearchInput} from '../../common/components';
import {AddUpdatePackComponent, OnSaveArgsType, UniButton, RangeSlider, BasicTable} from '../DeskCards';

export const DeskCards = React.memo(() => {
    const dispatch = useAppDispatch();

    const isLogin = useAppSelector(authState.isLogin);
    const max = useAppSelector(params.max);
    const min = useAppSelector(params.min);
    const page = useAppSelector(params.page);
    const pageCount = useAppSelector(params.pageCount);
    const packName = useAppSelector(params.packName);
    const user_id = useAppSelector(params.userId);
    const sortPacks = useAppSelector(params.sortPacks);

    useEffect(() => {
        dispatch(setParamsTC());
    }, [dispatch, max, min, page, pageCount, packName, user_id, sortPacks]);

    const onSave = (args: OnSaveArgsType) => {
        dispatch(createPackTC({...args}));
    }

    if (!isLogin) {
        return <Navigate to='/'/>;
    }

    return (
        <div className={style.container}>
            <div className={style.nameAndButton}>
                <div><h1>Packs list</h1></div>
                <div>
                    <AddUpdatePackComponent
                        buttonName={'Add pack'}
                        onSave={onSave}
                    />
                </div>
            </div>

            <div className={style.search}>
                <div className={style.inputContainer}>
                    <h3>Search</h3>
                    <SearchInput
                        delayTime={500}
                        itemsName={packName}
                        action={setParamsAC}
                        searchField={'packName'}
                    />
                </div>

                <div style={{width: '20%'}}>
                    <h3>Show packs</h3>
                    <UniButton/>
                </div>

                <div style={{textAlign: 'center'}}>
                    <h3>Search range</h3>
                    <RangeSlider/>
                </div>
            </div>

            <BasicTable/>

        </div>
    );
});

