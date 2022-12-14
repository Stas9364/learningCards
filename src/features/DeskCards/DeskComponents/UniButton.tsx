import * as React from 'react';
import {ButtonGroup, Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../common/utils';
import {setParamsAC} from '../paramsReducer/paramsReducer';
import {params} from '../paramsReducer/selectors';
import {authState} from '../../auth';

export const UniButton = React.memo (() => {
    const dispatch = useAppDispatch();

    const userId = useAppSelector(authState.id);
    const isMy = useAppSelector(params.isMy);

    const getMyPacks = () => {
        dispatch(setParamsAC({user_id: userId, nameOfButton: 'MY', page: 0}));
    };

    const getAllPacks = () => {
        dispatch(setParamsAC({user_id: null, nameOfButton: 'ALL'}));
    };

    return (
        <div>
            <ButtonGroup variant="contained">

                <Button
                    variant={isMy === 'MY' ? 'contained' : 'outlined'}
                    style={{minWidth: '80px'}}
                    onClick={getMyPacks}
                >My
                </Button>

                <Button
                    variant={isMy === 'ALL' ? 'contained' : 'outlined'}
                    style={{minWidth: '80px'}}
                    onClick={getAllPacks}
                >All
                </Button>

            </ButtonGroup>
        </div>

    );
});