import { Button, Grid } from '@mui/material';

import { WordStatistics } from '../../services/WordStatistics';
import { GAME_ID } from '../../types/common';
import { Word } from '../../types/RSLangApi';

interface ITemp {
  word: Word;
}

export const Temp = (props: ITemp) => {
  const {
    word: { id },
  } = props;

  const handleClick = async (gameId: GAME_ID, result: boolean) => {
    WordStatistics.process(id, result, gameId);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => handleClick(GAME_ID.AUDIO, false)}
            size="small"
          >
            Wrong Audio
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => handleClick(GAME_ID.AUDIO, true)}
            size="small"
          >
            Correct Audio
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => handleClick(GAME_ID.SPRINT, false)}
            size="small"
          >
            Wrong Sprint
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => handleClick(GAME_ID.SPRINT, true)}
            size="small"
          >
            Correct Sprint
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
