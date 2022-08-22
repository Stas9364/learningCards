import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    onChange: (newText: string) => void
}
export const EditableSpan = React.memo((props: EditableSpanType) => {
    let [editMode, setEditMode] = useState(false)
    let [newText, setNewText] = useState('')
    const changeTextDoubleClick = () => {
        setEditMode(!editMode)
        setNewText(props.title)
    }
    const changeTextFromEnter = (event: ChangeEvent<HTMLInputElement>) => {
        setNewText(event.currentTarget.value)
    }
    const activateViewMode = () => {
        setEditMode(!editMode)
        props.onChange(newText)
    }
    return (
        editMode ?
            <TextField
                onChange={changeTextFromEnter}
                autoFocus onBlur={activateViewMode} value={newText}
                fullWidth
                type='text'
                margin="normal"
            /> :
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h2 style={{marginLeft: '5px'}} onDoubleClick={changeTextDoubleClick}>{props.title} </h2>
            </div>

    )
});


