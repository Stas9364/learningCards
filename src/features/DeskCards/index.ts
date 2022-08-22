import {DeskCards} from './DeskCards';
import {BasicTable} from './DeskComponents/BasicTable/BasicTable';
import {BasicTableHead} from './DeskComponents/BasicTable/BasicTableHead';
import {BasicTableBody} from './DeskComponents/BasicTable/BasicTableBody';
import style from './DeskComponents/BasicTable/BasicTable.module.css';
import {AddUpdatePackComponent} from './DeskComponents/EditPacksComponents/AddUpdatePackComponent';
import {Learn} from './DeskComponents/Learn/Learn';
import {RangeSlider} from './DeskComponents/RangeSlider';
import {UniButton} from './DeskComponents/UniButton';
import {allPacks} from './packsReducer/selectors';
import {params} from './paramsReducer/selectors';

import type {OnSaveArgsType} from './DeskComponents/EditPacksComponents/AddUpdatePackComponent';

export {
    DeskCards,
    style,
    Learn,
    BasicTable,
    BasicTableHead,
    BasicTableBody,
    RangeSlider,
    UniButton,
    AddUpdatePackComponent,
    allPacks,
    params,
    OnSaveArgsType
};