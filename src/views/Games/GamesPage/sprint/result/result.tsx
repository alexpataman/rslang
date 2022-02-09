import { TabsUnstyled, TabsListUnstyled, TabUnstyled, TabPanelUnstyled, Icon } from '@mui/material'

import { SoundsApi } from '../../../../../services/RSLangApi/SoundsApi';
import { propAnswer } from '../types/Answer'
import './result.css';

export const Result = (a: propAnswer) => {

function playAudio(src: string){
  const audio = new Audio();
  const soundApi = new SoundsApi();
  audio.src = soundApi.getSoundPath(src);
  return audio.play();
};

return  (
<div>
Твой результат {a.score} очков
  <TabsUnstyled defaultValue={0}>
    <TabsListUnstyled>
      <TabUnstyled>Результат</TabUnstyled>
      <TabUnstyled>Подробнее</TabUnstyled>
    </TabsListUnstyled>
    <TabPanelUnstyled value={0}>
      <p>
        {a.ansList.reduce((acc: number, cur) => acc + (cur.ans ? 1 : 0), 0)} слов изучено, {a.ansList.reduce((acc: number, cur) => acc + (!cur.ans ? 1 : 0), 0)} слов на изучении
      </p>
    </TabPanelUnstyled>
    <TabPanelUnstyled value={1}><div>
      <p>Верно:</p>
      <ul>
        {a.ansList.map((el, i) => {
          if (el.ans)
            return (
              <li key={i}>
                {el.word.word} - <button type='button' onClick={() => playAudio(el.word.audio)}><Icon>volume_up</Icon></button> - {el.word.wordTranslate}
              </li>
            );
          return null;
        })}
      </ul>

      <p>Неверно:</p>
      <div className='result__list'>
        {a.ansList.map((el, i) => {
          if (!el.ans)
            return (
              <div key={i} className='list-item'>
                <div>
                  {el.word.word}
                </div>
                <div>
                  <button type='button' onClick={() => playAudio(el.word.audio)}><Icon>volume_up</Icon></button>
                </div>
                <div>
                  {el.word.wordTranslate}
                </div>
              </div>
            );
          return null;
        })}
      </div>
    </div>
    </TabPanelUnstyled>
  </TabsUnstyled>
</div>
  )
}
