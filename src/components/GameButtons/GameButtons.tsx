import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

const links = [
  {
    to: '/games/audio',
    text: 'Аудиовызов',
    icon: <VolumeUpIcon />,
  },
  {
    to: '/games/sprint',
    text: 'Спринт',
    icon: <DirectionsRunIcon />,
  },
];

interface IGameButtons {
  categoryId: number;
  page: number;
}

export const GameButtons = (props: IGameButtons) => {
  const { categoryId, page } = props;

  return (
    <Grid container spacing={1}>
      {links.map((link, index) => (
        <Grid item key={index}>
          <Button
            component={NavLink}
            to={`${link.to}/category/${categoryId}/page/${page}`}
            variant="outlined"
            startIcon={link.icon}
          >
            {link.text}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};
