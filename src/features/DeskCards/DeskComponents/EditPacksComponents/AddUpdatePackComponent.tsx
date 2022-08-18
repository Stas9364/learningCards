import React, {ChangeEvent, useState} from 'react';
import {uploadHandler} from '../../../../common/utils/uploadHandler';
import {Button, Checkbox, FormControlLabel, TextField} from '@mui/material';
import edit from '../../../../assets/img/edit.svg';
import {CustomModal} from '../../../../common/components/CustomModal/CustomModal';
import style from './EditPacksComponents.module.css';
import {DownloadingCoverBlock} from '../../../../common/components/DownloadingCoverBlock/DownloadingCoverBlock';

type AddUpdatePackComponentPropsType = {
    packId?: string
    packName?: string
    isPackPrivate?: boolean
    packCover?: string
    onSave: (args: OnSaveArgsType) => void
    buttonName: string
}
export type OnSaveArgsType = {
    _id: string | undefined
    name: string | undefined
    private: boolean | undefined
    deckCover: string | undefined

}

export const AddUpdatePackComponent: React.FC<AddUpdatePackComponentPropsType> = ({
                                                                                      packId,
                                                                                      packName,
                                                                                      isPackPrivate,
                                                                                      packCover,
                                                                                      onSave,
                                                                                      buttonName
                                                                                  }) => {
    const [open, setOpen] = useState(false);
    const [newPackName, setNewPackName] = useState(packName || '');
    const [privatePack, setPrivatePack] = useState(isPackPrivate || false);
    const [deckCover, setDeckCover] = useState(packCover || '');

    const openModal = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSetPackName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPackName(e.currentTarget.value);
    };

    const onSaveHandler = () => {
        onSave({_id: packId, name: newPackName, private: privatePack, deckCover});
        setOpen(false);
        setNewPackName('');
        setPrivatePack(false);
    };

    const onUploadHandler = (e: ChangeEvent<HTMLInputElement>) => uploadHandler(e, setDeckCover);

    const onCloseModal = () => setOpen(false);

    const onSetPrivate = (e: ChangeEvent<HTMLInputElement>) => setPrivatePack(e.target.checked);

    return (
        <div>
            {buttonName === 'Add new pack'
                ? <Button
                    onClick={openModal}
                    style={{marginTop: '0', width: '300px'}}
                    type='submit'
                    color='primary'
                    variant='contained'
                >{buttonName}
                </Button>

                : <Button onClick={openModal}>
                    <img src={edit} alt="write"/>
                </Button>}

            <CustomModal open={open} setOpen={setOpen}>

                <div className={style.modalName}>
                    {buttonName}
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
                    onChange={onSetPackName}
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
                    <Button variant={'contained'} onClick={onSaveHandler}>Save</Button>
                </div>

            </CustomModal>

        </div>
    );
};