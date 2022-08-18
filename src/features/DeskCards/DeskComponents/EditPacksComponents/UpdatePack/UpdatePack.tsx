import React, {ChangeEvent, useState} from 'react';
import {Button, Checkbox, FormControlLabel, TextField} from '@mui/material';
import {CustomModal} from '../../../../../common/components/CustomModal/CustomModal';
import {useAppDispatch} from '../../../../../common/utils/hooks';
import edit from '../../../../../assets/img/edit.svg';
import style from '../EditPacksComponents.module.css';
import {updatePackTC} from '../../../packsReducer/packsReducer';
import {uploadHandler} from '../../../../../common/utils/uploadHandler';
import { DownloadingCoverBlock } from '../../../../../common/components/DownloadingCoverBlock/DownloadingCoverBlock';

type UpdatePackPropsType = {
    packId: string
    packName: string
    isPackPrivate: boolean
    packCover: string
}

export const UpdatePack: React.FC<UpdatePackPropsType> = ({
                                                              packId,
                                                              packName,
                                                              isPackPrivate,
                                                              packCover
}) => {
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const [newPackName, setNewPackName] = useState(packName);
    const [privatePack, setPrivatePack] = useState(isPackPrivate);
    const [deckCover, setDeckCover] = useState(packCover);

    const openModal = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSetNewPackName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPackName(e.currentTarget.value);
    };

    const onSaveChanges = () => {
        dispatch(updatePackTC({_id: packId, name: newPackName, private: privatePack, deckCover}));
    };

    const onUploadHandler = (e: ChangeEvent<HTMLInputElement>) => uploadHandler(e, setDeckCover);

    const onCloseModal = () => setOpen(false);

    const onSetPrivate = (e: ChangeEvent<HTMLInputElement>) => setPrivatePack(e.target.checked);

    return (
        <div>
                <Button onClick={openModal}>
                    <img src={edit} alt="write"/>
                </Button>

            <CustomModal open={open} setOpen={setOpen}>

                <div className={style.modalName}>
                    Update pack
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
                    <Button variant={'contained'} onClick={onSaveChanges}>Save changes</Button>
                </div>

            </CustomModal>

        </div>
    );
};

