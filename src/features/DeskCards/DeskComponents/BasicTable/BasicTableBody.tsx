import {updatedDate, useAppDispatch, useAppSelector} from '../../../../common/utils';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../../../common/components/routes/RoutesComponent';
import {Button, ButtonGroup, Table, TableBody, TableCell, TableRow} from '@mui/material';
import {study} from '../../../../assets';
import * as React from 'react';
import {deletePackTC, updatePackTC} from '../../packsReducer/packsReducer';
import {allPacks} from '../../packsReducer/selectors';
import style from '../../DeskComponents/BasicTable/BasicTable.module.css'
import {AddUpdatePackComponent, OnSaveArgsType} from '../../../DeskCards';
import {authState} from '../../../auth';
import {DeletePackCardComponent} from '../../../../common/components';

export const BasicTableBody = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSave = (args: OnSaveArgsType) => {
        dispatch(updatePackTC({...args}));
    }

    const packs = useAppSelector(allPacks.cardPacks);
    const userId = useAppSelector(authState.id);

    const studyHandler = (packName: string, packId: string) => {
        navigate('/learn', {state: {packName, packId}});
    };

    return (
        <>
            <Table aria-label="simple table">
                <TableBody style={{backgroundColor: '#d4e3fc'}}>
                    {packs && packs.map((pack) => {
                        return <TableRow
                            key={pack._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell

                                onClick={() => navigate(
                                    `${PATH.cards}/${pack._id}`,
                                    {state: {packName: pack.name, userId: pack.user_id}}
                                )}
                                sx={{
                                    borderBottom: '1px solid #1c72b9',
                                }}
                                align="center"
                                width='20%'
                            >
                                {(pack.deckCover &&
                                        <img src={pack.deckCover} alt={'cover'} className={style.deckCover}/>)
                                    || <span className={style.textPackName}>{pack.name}</span>}
                            </TableCell>
                            <TableCell
                                sx={{borderBottom: '1px solid #1c72b9'}}
                                width='20%'
                                align="center"
                            >{pack.cardsCount}</TableCell>
                            <TableCell
                                sx={{borderBottom: '1px solid #1c72b9'}}
                                width='20%'
                                align="center"
                            >{updatedDate(pack.updated)}</TableCell>
                            <TableCell
                                sx={{borderBottom: '1px solid #1c72b9'}}
                                width='20%'
                                align="center"
                            >{pack.user_name}</TableCell>
                            <TableCell
                                sx={{borderBottom: '1px solid #1c72b9'}}
                                width='20%'
                                align="center">
                                {userId === pack.user_id
                                    ? <ButtonGroup>
                                        <DeletePackCardComponent
                                            name={pack.name}
                                            modalName={'Pack'}
                                            thunk={() => dispatch(deletePackTC(pack._id))}
                                        />

                                        <AddUpdatePackComponent
                                            onSave={onSave}
                                            buttonName={'Update pack'}
                                            packCover={pack.deckCover}
                                            packId={pack._id}
                                            packName={pack.name}
                                            isPackPrivate={pack.private}
                                        />

                                        <Button onClick={() => studyHandler(pack.name, pack._id)}>
                                            <img src={study} alt="study"/>
                                        </Button>
                                    </ButtonGroup>
                                    : <Button onClick={() => studyHandler(pack.name, pack._id)}>
                                        <img src={study} alt="study"/>
                                    </Button>
                                }

                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>

        </>
    )
};