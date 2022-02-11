import { Avatar, Button, Grid, Typography } from '@mui/material';

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
    description: 'Описание что делал',
  },
  {
    name: 'Aliona Bulanava',
    img: ava3Img,
    github: 'kxzws',
    description: 'Описание что делал',
  },
  {
    name: 'Andrei Shpak',
    img: ava2Img,
    github: 'shpakitze',
    description: 'Описание что делал',
  },
];

export const HomeAbout = () => (
  <div className="container">
    <div className="HomeAbout">
      <Typography variant="h2">О команде</Typography>
      <Grid container justifyContent="space-around">
        {team.map((el, index) => (
          <Grid item xs={3} className="TeamMemberItem" key={index}>
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
