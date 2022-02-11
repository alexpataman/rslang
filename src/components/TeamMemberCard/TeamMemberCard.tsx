import * as React from 'react';

import { GitHub } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './TeamMemberCard.scss';

interface ITeamMemberCard {
  img: string;
  name: string;
  description: string;
  github: string;
}

export default function TeamMemberCard(props: ITeamMemberCard) {
  const { img, name, github, description } = props;
  return (
    <Card sx={{ maxWidth: 300 }} className="TeamMemberCard">
      <CardMedia component="img" image={img} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          startIcon={<GitHub />}
          href={`https://github.com/${github}`}
        >
          {github}
        </Button>
      </CardActions>
    </Card>
  );
}
