import AccessAlarmSharpIcon from '@mui/icons-material/AccessAlarmSharp';
import InsightsSharpIcon from '@mui/icons-material/InsightsSharp';
import MenuBookSharpIcon from '@mui/icons-material/MenuBookSharp';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Typography, Grid } from '@mui/material';

import './HomeFeatures.scss';

const features = [
  {
    icon: MenuBookSharpIcon,
    title: '3600 слов для тренировок',
  },
  {
    icon: AccessAlarmSharpIcon,
    title: 'Игры на время',
  },
  {
    icon: InsightsSharpIcon,
    title: 'Прогресс изучения',
  },
  {
    icon: PersonSharpIcon,
    title: 'Персональный профиль',
  },
  {
    icon: TagFacesIcon,
    title: 'Простой интерфейс',
  },
];

export const HomeFeatures = () => (
  <section className="HomeFeatures">
    <div className="container">
      <Grid
        container
        justifyContent="space-around"
        alignContent="center"
        className="items"
      >
        {features.map((el, index) => (
          <Grid item xs={12} sm={4} md={2} className="item" key={index}>
            <el.icon className="icon" />
            <Typography>{el.title}</Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  </section>
);
