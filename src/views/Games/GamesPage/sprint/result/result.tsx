import {
  TabsUnstyled,
  TabsListUnstyled,
  TabUnstyled,
  TabPanelUnstyled,
  Icon,
  Paper,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Table,
  Avatar,
  Card,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { SoundsApi } from '../../../../../services/RSLangApi/SoundsApi';
import { propAnswer } from '../types/Answer';
import './result.css';

export const Result = (a: propAnswer) => {
  const navigate = useNavigate();
  function playAudio(src: string) {
    const audio = new Audio();
    const soundApi = new SoundsApi();
    audio.src = soundApi.getSoundPath(src);
    return audio.play();
  }

  return (
    <Card sx={{ width: '70%', margin: '0 auto' }} className="result_sprint1">
      <TabsUnstyled className="result_sprint" defaultValue={0}>
        <TabsListUnstyled className="tabs__header">
          <TabUnstyled>Результат</TabUnstyled>
          <TabUnstyled>Подробнее</TabUnstyled>
          <button onClick={() => navigate('/')}>Завершить</button>
        </TabsListUnstyled>
        <TabPanelUnstyled value={0} className="result__info">
          <p>Твой результат {a.score} очков</p>
          <p>
            Слов изучено:{' '}
            {a.ansList.reduce((acc: number, cur) => acc + (cur.ans ? 1 : 0), 0)}
            , Слов на изучении:{' '}
            {a.ansList.reduce(
              (acc: number, cur) => acc + (!cur.ans ? 1 : 0),
              0
            )}
          </p>
        </TabPanelUnstyled>
        <TabPanelUnstyled value={1}>
          <div>
            <TableContainer
              component={Paper}
              sx={{
                overflowY: 'scroll',
                maxHeight: '40vh',
              }}
            >
              <div>
                Верно:{' '}
                <Avatar sx={{ bgcolor: '#363271;' }}>
                  {a.ansList.reduce(
                    (acc: number, cur) => acc + (cur.ans ? 1 : 0),
                    0
                  )}
                </Avatar>
              </div>
              <Table aria-label="a dense table" size="small">
                <TableBody>
                  {a.ansList.map((el, i) => {
                    if (el.ans)
                      return (
                        <TableRow key={i}>
                          <TableCell align="left">{el.word.word}</TableCell>
                          <TableCell align="center">
                            <button
                              type="button"
                              onClick={() => playAudio(el.word.audio)}
                            >
                              <Icon>volume_up</Icon>
                            </button>
                          </TableCell>
                          <TableCell align="right">
                            {el.word.wordTranslate}
                          </TableCell>
                        </TableRow>
                      );
                    return null;
                  })}
                </TableBody>
              </Table>

              <div>
                Неверно:{' '}
                <Avatar sx={{ bgcolor: 'red' }}>
                  {a.ansList.reduce(
                    (acc: number, cur) => acc + (!cur.ans ? 1 : 0),
                    0
                  )}
                </Avatar>
              </div>

              <Table aria-label="a dense table" size="small">
                <TableBody>
                  {a.ansList.map((el, i) => {
                    if (!el.ans)
                      return (
                        <TableRow key={i}>
                          <TableCell align="left">{el.word.word}</TableCell>
                          <TableCell align="center">
                            <button
                              type="button"
                              onClick={() => playAudio(el.word.audio)}
                            >
                              <Icon>volume_up</Icon>
                            </button>
                          </TableCell>
                          <TableCell align="right">
                            {el.word.wordTranslate}
                          </TableCell>
                        </TableRow>
                      );
                    return null;
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </TabPanelUnstyled>
      </TabsUnstyled>
    </Card>
  );
};
