import {useAppSelector} from '../../../../common/utils';
import {Table, TableHead, TableRow, TableCell} from '@mui/material';
import * as React from 'react';
import {params} from '../../paramsReducer/selectors';
import {setParamsAC} from '../../paramsReducer/paramsReducer';
import {SortCell} from '../../../../common/components';

export const BasicTableHead = () => {
    const columnNames = ['Name', 'Cards', 'Last Update', 'Author', 'Actions'];

    const dirValue = useAppSelector(params.dirValue);

    return (
        <>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columnNames.map(name => {
                            return <TableCell key={name}>
                                <SortCell
                                    name={name}
                                    action={setParamsAC}
                                    sortType={'sortPacks'}
                                    dirValue={dirValue}
                                />
                            </TableCell>
                        })}
                    </TableRow>
                </TableHead>
            </Table>
        </>
    )
};