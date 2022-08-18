import {ChangeEvent} from 'react';

export const uploadHandler = (e: ChangeEvent<HTMLInputElement>, setPic: (pic: string) => void) => {
    if (e.target.files && e.target.files.length) {
        const file = e.target.files[0]
        //console.log('file: ', file)

        if (file.size < 4000000) {
            // https://developer.mozilla.org/ru/docs/Web/API/FileReader/FileReader
            const reader = new FileReader();

            reader.onloadend = () => {
                const file64 = reader.result as string
                //console.log('file64: ', file64)
                setPic(file64);
            }
            // https://developer.mozilla.org/ru/docs/Web/API/FileReader/readAsDataURL
            reader.readAsDataURL(file)

        } else {
            console.error('Error: ', 'Файл слишком большого размера')
        }
    }
};