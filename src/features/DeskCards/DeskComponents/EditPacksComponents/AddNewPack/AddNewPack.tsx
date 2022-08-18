import React, {ChangeEvent, useState} from 'react';
import {Button, Checkbox, FormControlLabel, TextField} from '@mui/material';
import {CustomModal} from '../../../../../common/components/CustomModal/CustomModal';
import {useAppDispatch} from '../../../../../common/utils/hooks';
import style from '../EditPacksComponents.module.css';
import {createPackTC} from '../../../packsReducer/packsReducer';
import {uploadHandler} from '../../../../../common/utils/uploadHandler';
import {DownloadingCoverBlock} from '../../../../../common/components/DownloadingCoverBlock/DownloadingCoverBlock';

export const AddNewPack = () => {
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const [newPackName, setNewPackName] = useState('');
    const [privatePack, setPrivatePack] = useState(false);
    const [deckCover, setDeckCover] = useState('');

    const openModal = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSetNewPackName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPackName(e.currentTarget.value);
    };

    const onSaveNewPack = () => {
        dispatch(createPackTC({name: newPackName, private: privatePack, deckCover}));
        setOpen(false);
        setNewPackName('');
        setPrivatePack(false);
    };

    const onUploadHandler = (e: ChangeEvent<HTMLInputElement>) => uploadHandler(e, setDeckCover);

    const onCloseModal = () => setOpen(false);

    const onSetPrivate = (e: ChangeEvent<HTMLInputElement>) => setPrivatePack(e.target.checked);

    return (
        <div>
            <Button
                onClick={openModal}
                style={{marginTop: '0', width: '300px'}}
                type='submit'
                color='primary'
                variant='contained'
            >Add new pack
            </Button>

            <CustomModal open={open} setOpen={setOpen}>

                <div className={style.modalName}>
                    Add new pack
                    <Button
                        size={'large'}
                        variant={'text'}
                        onClick={handleClose}
                    >X</Button>
                </div>

                <hr/>

                {deckCover && <img src={deckCover} alt="cover"/>}
                <DownloadingCoverBlock onUploadHandler={onUploadHandler}/>

                <TextField
                    variant={'standard'}
                    label={'Pack name'}
                    value={newPackName}
                    onChange={onSetNewPackName}
                    fullWidth
                    margin={'normal'}
                />

                <div>
                    <FormControlLabel
                        value='end'
                        control={<Checkbox onChange={onSetPrivate} checked={privatePack}/>}
                        label='Private'
                        labelPlacement='end'
                        sx={{marginBottom: '20px'}}
                    />
                </div>

                <div className={style.modalButtons}>
                    <Button variant={'outlined'} onClick={onCloseModal}>Cancel</Button>
                    <Button variant={'contained'} onClick={onSaveNewPack}>Save</Button>
                </div>

            </CustomModal>

        </div>
    );
};

