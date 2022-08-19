import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {Rating} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useAppDispatch, useAppSelector} from '../../../common/utils/hooks';
import {authState} from '../../auth/selectors';
import {deleteCardTC, updateCardTC} from '../cardsReducer/cardsReducer';
import {DeletePackCardComponent} from '../../../common/components/DeletePackCardComponent/DeletePackCardComponent';
import {updatedDate} from '../../../common/utils/dateFormatting';
import {allCards} from '../cardsReducer/selectors';
import {AddUpdateCard, OnSavePayloadType} from '../EditCardsComponents/AddUpdateCard';

type CardsTableBodyPropsType = {
    packID: string | undefined
}

export const CardsTableBody: React.FC<CardsTableBodyPropsType> = ({packID}) => {
    const dispatch = useAppDispatch();

    const cards = useAppSelector(allCards.cards);
    const userId = useAppSelector(authState.id);

    const onSave = (payload: OnSavePayloadType) => {
        dispatch(updateCardTC({...payload}));
    };

    return (
        <>
            <Table aria-label="simple table">
                <TableBody style={{backgroundColor: '#d4e3fc'}}>
                    {cards && cards.map((card) => {
                        return <TableRow
                            key={card._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell
                                sx={{borderBottom: '1px solid #1c72b9'}}
                                align="center"
                                width='20%'
                            >{card.question}</TableCell>
                            <TableCell sx={{borderBottom: '1px solid #1c72b9'}}
                                       width='20%'
                                       align="center"
                            >{card.answer}</TableCell>
                            <TableCell sx={{borderBottom: '1px solid #1c72b9'}}
                                       width='20%'
                                       align="center"
                            >{updatedDate(card.updated)}</TableCell>
                            <TableCell sx={{borderBottom: '1px solid #1c72b9'}}
                                       width='20%'
                                       align="center">
                                <Rating
                                    name="text-feedback"
                                    value={card.grade}
                                    readOnly
                                    precision={0.5}
                                    emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
                                />
                            </TableCell>
                            <TableCell sx={{borderBottom: '1px solid #1c72b9'}}
                                       width='20%'
                                       align="center">

                                {userId === card.user_id
                                    ? <ButtonGroup>
                                        <DeletePackCardComponent
                                            name={card.question}
                                            modalName={'Card'}
                                            thunk={() => dispatch(deleteCardTC(card._id, packID))}
                                        />

                                        <AddUpdateCard
                                            buttonName={'Update card'}
                                            onSave={onSave}
                                            packId={packID}
                                            cardId={card._id}
                                            answer={card.answer}
                                            question={card.question}
                                        />

                                    </ButtonGroup>
                                    : <div>NOTHING</div>
                                }

                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </>
    )
};