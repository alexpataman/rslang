import { Grid, Typography } from '@mui/material';

import ava1Img from '../../../assets/img/team_1.jpeg';
import ava2Img from '../../../assets/img/team_2.jpeg';
import ava3Img from '../../../assets/img/team_3.png';
import TeamMemberCard from '../../../components/TeamMemberCard/TeamMemberCard';

import './HomeAbout.scss';

const team = [
  {
    name: 'Alexander Pataman',
    img: ava1Img,
    github: 'alexpataman',
    description: 'Авторизация, учебник, статистика, базовый UI',
  },
  {
    name: 'Aliona Bulanava',
    img: ava3Img,
    github: 'kxzws',
    description: 'Игра "Аудиовызов"',
  },
  {
    name: 'Andrei Shpak',
    img: ava2Img,
    github: 'shpakitze',
    description: 'Игра "Спринт"',
  },
];

export const HomeAbout = () => (
  <div className="container">
    <div className="HomeAbout">
      <Typography variant="h2">О команде</Typography>
      <Grid container justifyContent="space-around" spacing={2}>
        {team.map((el, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            className="TeamMemberItem"
            key={index}
          >
            <TeamMemberCard
              name={el.name}
              img={el.img}
              description={el.description}
              github={el.github}
            ></TeamMemberCard>
          </Grid>
        ))}
      </Grid>
    </div>
  </div>
);
