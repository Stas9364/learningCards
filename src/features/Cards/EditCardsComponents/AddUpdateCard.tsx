import React, {ChangeEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';
import edit from '../../../assets/img/edit.svg';
import {CustomModal} from '../../../common/components/CustomModal/CustomModal';
import style from '../../DeskCards/DeskComponents/EditPacksComponents/EditPacksComponents.module.css';

type AddUpdateCardPropsType = {
    packId: string | undefined
    cardId?: string
    question?: string
    answer?: string
    onSave: (payload: OnSavePayloadType) => void
    buttonName: string
}
export type OnSavePayloadType = {
    cardsPack_id: string | undefined
    _id?: string
    question?: string
    answer?: string
}

export const AddUpdateCard: React.FC<AddUpdateCardPropsType> = ({
                                                                    packId,
                                                                    cardId,
                                                                    question,
                                                                    answer,
                                                                    onSave,
                                                                    buttonName
                                                                }) => {
    const [open, setOpen] = useState(false);
    const [newQuestion, setNewQuestion] = useState(question || '');
    const [newAnswer, setNewAnswer] = useState(answer || '');

    const openModal = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSetQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(e.currentTarget.value);
    };
    const onSetAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAnswer(e.currentTarget.value);
    };

    const onSaveChanges = () => {
        onSave({_id: cardId, cardsPack_id: packId, question: newQuestion, answer: newAnswer});
        setOpen(false);
        setNewQuestion('');
        setNewAnswer('');
    };

    const onCloseModal = () => setOpen(false);

    return (
        <div>
            {buttonName === 'Add card'
                ? <Button
                    onClick={openModal}
                    style={{marginTop: '10'}}
                    type='submit'
                    color='primary'
                    variant='contained'
                    sx={{
                        width: 300,
                        marginTop: 8,
                        borderRadius: 5
                    }}>
                    {buttonName}
                </Button>

                : <Button onClick={openModal}>
                    <img src={edit} alt="write"/>
                </Button>
            }


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

                <TextField
                    variant={'standard'}
                    label={'Question'}
                    value={newQuestion}
                    onChange={onSetQuestion}
                    fullWidth
                    margin={'normal'}
                />

                <TextField
                    variant={'standard'}
                    label={'Answer'}
                    value={newAnswer}
                    onChange={onSetAnswer}
                    fullWidth
                    margin={'normal'}
                />

                <div className={style.modalButtons}>
                    <Button variant={'outlined'} onClick={onCloseModal}>Cancel</Button>
                    <Button variant={'contained'} onClick={onSaveChanges}>Save</Button>
                </div>

            </CustomModal>

        </div>
    );
};