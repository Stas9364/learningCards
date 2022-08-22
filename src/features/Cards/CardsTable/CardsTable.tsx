import * as React from 'react';
import {initApp} from '../../../app/selectors';
import {allCards} from '../cardsReducer/selectors';
import style from '../../DeskCards/DeskComponents/BasicTable/BasicTable.module.css'
import {CardsTableHead} from './CardsTableHead';
import {CardsTableBody} from './CardsTableBody';
import {SecondaryPreloader, WithoutResultPage} from '../../../common/components';
import {useAppSelector} from '../../../common/utils';

type CardsTablePropsType = {
  packID: string | undefined
}

export const CardsTable: React.FC<CardsTablePropsType> = ({packID}) => {
  const cards = useAppSelector(allCards.cards);
  const initTable = useAppSelector(initApp.initTable);

  if (cards?.length === 0) {
    return <WithoutResultPage itemName={'Cards'}/>
  }

  return (
      <div>
        <div className={style.scrollTable}>
          <CardsTableHead/>
        </div>

        {initTable === 'initializing'
            ? <SecondaryPreloader/>
            : <div className={style.scrollTableBody}>
              <CardsTableBody packID={packID}/>
            </div>
        }
      </div>
  )
};

