import React, {useState} from 'react';
import {Button} from '@mui/material';
import {deletePick} from '../../../assets/index';
import style from '../../../features/DeskCards/DeskComponents/EditPacksComponents/EditPacksComponents.module.css';
import {CustomModal} from '../CustomModal/CustomModal';

type DeletePackPropsType = {
    name: string
    modalName: string
    thunk: any
}

export const DeletePackCardComponent: React.FC<DeletePackPropsType> = ({name, modalName, thunk}) => {

    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onDeleteHandler = () => thunk();

    const onCloseModal = () => setOpen(false);

    return (
        <div>
            <Button onClick={openModal}>
                <img src={deletePick} alt="delete"/>
            </Button>

            <CustomModal open={open} setOpen={setOpen}>

                <div className={style.modalName}>
                    Delete {modalName}
                    <Button
                        size={'large'}
                        variant={'text'}
                        onClick={handleClose}
                    >X</Button>
                </div>

                <hr/>

                <div className={style.modalText}>
                    <div>Do you really want to remove <b>{name}</b>?</div>
                    <div>All cards will be deleted.</div>
                </div>

                <div className={style.modalButtons}>
                    <Button variant={'outlined'} onClick={onCloseModal}>Cancel</Button>
                    <Button onClick={onDeleteHandler}>Delete</Button>
                </div>

            </CustomModal>
        </div>
    );
};

