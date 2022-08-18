import React, {ChangeEvent} from 'react';
import {Button} from '@mui/material';

type DownloadingCoverBlockPropsType = {
    onUploadHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

export const DownloadingCoverBlock: React.FC<DownloadingCoverBlockPropsType> = ({onUploadHandler}) => {

    const onLoader = (e: ChangeEvent<HTMLInputElement>) => onUploadHandler(e);

    return (
        <label>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => onLoader(e)}
                style={{display: 'none'}}
            />

            <Button component="span" variant={'text'}>
                Download pack cover
            </Button>
        </label>
    )
};