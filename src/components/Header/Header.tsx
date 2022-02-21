import * as React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';

import './Header.scss';
import { UserProfile } from '../UserProfile/UserProfile';

const pages = [
  {
    to: '/textbook',
    text: 'Учебник',
  },
  {
    to: '/games',
    text: 'Игры',
  },
  {
    to: '/statistics',
    text: 'Статистика',
  },
];

const mobilePages = [
  {
    to: '/',
    text: 'Главная',
  },
  ...pages,
];

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" className="Header" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'inline' } }}>
            <Box component={Link} to="/" className="logo">
              RSLang
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {mobilePages.map((page) => (
                <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                  <Link key={page.text} to={page.to} className="menu-link">
                    {page.text}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Button
            component={Link}
            to="/"
            className="logo"
            sx={{ flexGrow: 1, display: { xs: 'inline', md: 'none' } }}
          >
            RSLang
          </Button>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }} className="nav">
            {pages.map((page) => (
              <Link key={page.text} onClick={handleCloseNavMenu} to={page.to}>
                {page.text}
              </Link>
            ))}
          </Box>

          <UserProfile />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
