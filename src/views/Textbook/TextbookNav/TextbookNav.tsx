import MenuBookIcon from '@mui/icons-material/MenuBook';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import SchoolIcon from '@mui/icons-material/School';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

import { AuthorisedOnly } from '../../../components/AuthorisedOnly/AuthorisedOnly';

const links = [
  {
    to: '/textbook',
    text: 'Все категории',
    icon: <MenuBookIcon />,
  },
  {
    to: '/textbook/difficult',
    text: 'Сложные слова',
    icon: <NewReleasesIcon />,
  },
  {
    to: '/textbook/known',
    text: 'Изученные слова',
    icon: <SchoolIcon />,
  },
];

export const TextbookNav = () => (
  <AuthorisedOnly>
    <Grid container spacing={1}>
      {links.map((link, index) => (
        <Grid item key={index}>
          <Button
            component={NavLink}
            to={link.to}
            variant="outlined"
            startIcon={link.icon}
          >
            {link.text}
          </Button>
        </Grid>
      ))}
    </Grid>
  </AuthorisedOnly>
);
