import {useAppDispatch, useAppSelector} from '../../../../common/utils/hooks';
import {useNavigate} from 'react-router-dom';
import {authState} from '../../../auth/selectors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {PATH} from '../../../../common/components/routes/RoutesComponent';
import {updatedDate} from '../../../../common/utils/dateFormatting';
import ButtonGroup from '@mui/material/ButtonGroup';
import {DeletePack} from '../EditPacksComponents/DeletePack/DeletePack';
import {UpdatePack} from '../EditPacksComponents/UpdatePack/UpdatePack';
import {Button} from '@mui/material';
import study from '../../../../assets/img/school.svg';
import * as React from 'react';
import {deletePackTC} from '../../packsReducer/packsReducer';
import {allPacks} from '../../packsReducer/selectors';
import style from '../../DeskComponents/BasicTable/BasicTable.module.css'

export const BasicTableBody = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const packs = useAppSelector(allPacks.cardPacks);
    const userId = useAppSelector(authState.id);

    const studyHandler = (packName: string, packId: string) => {
        navigate('/learn', {state: {packName, packId}});
    };

    return (
        <>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableBody style={{backgroundColor: '#d4e3fc'}}>
                    {packs && packs.map((pack) => {
                        return <TableRow
                            key={pack._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell

                                onClick={() => navigate(
                                    `${PATH.cards}/${pack._id}`,
                                    {state: pack.name}
                                )}
                                sx={{borderBottom: '1px solid #1c72b9', maxWidth: '326px'}}
                                component="th"
                                scope="row"
                                align="center"
                                width='326px'
                            >
                                {(pack.deckCover && <img src={pack.deckCover} alt={'cover'} className={style.deckCover}/>)
                                    || <span className={style.textPackName}>{pack.name}</span>}
                            </TableCell>
                            <TableCell sx={{borderBottom: '1px solid #1c72b9'}} width='326px'
                                       align="center">{pack.cardsCount}</TableCell>
                            <TableCell sx={{borderBottom: '1px solid #1c72b9'}} width='326px'
                                       align="center">{updatedDate(pack.updated)}</TableCell>
                            <TableCell sx={{borderBottom: '1px solid #1c72b9'}} width='326px'
                                       align="center">{pack.user_name}</TableCell>
                            <TableCell sx={{borderBottom: '1px solid #1c72b9'}} width='326px' align="center">
                                {userId === pack.user_id
                                    ? <ButtonGroup>
                                        <DeletePack
                                            name={pack.name}
                                            modalName={'Pack'}
                                            thunk={() => dispatch(deletePackTC(pack._id))}
                                        />

                                        <UpdatePack
                                            packId={pack._id}
                                            packName={pack.name}
                                            isPackPrivate={pack.private}
                                            packCover={pack.deckCover}
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