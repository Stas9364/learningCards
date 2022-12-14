import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import * as React from 'react';
import {setCardsParamsAC} from '../paramsCardsReducer/paramsCardsReducer';
import {cardParams} from '../paramsCardsReducer/selectors';
import {SortCell} from '../../../common/components';
import {useAppSelector} from '../../../common/utils';

export const CardsTableHead = () => {
    const columnNames = ['Question', 'Answer', 'Last Cards Updated', 'Grade', 'Actions'];

    const dirValue = useAppSelector(cardParams.dirValue);

    return (
        <>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columnNames.map(name => {
                            return <TableCell key={name}>
                                <SortCell name={name} action={setCardsParamsAC} sortType={'sortCards'}
                                          dirValue={dirValue}/>
                            </TableCell>
                        })}
                    </TableRow>
                </TableHead>
            </Table>
        </>
    )
};