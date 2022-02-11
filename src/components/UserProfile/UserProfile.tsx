import { useState, useContext } from 'react';

import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

import { ModalContext } from '../../context/ModalContext';
import { useUserIsGuest } from '../../hooks/useUserIsGuest';
import { User } from '../../services/User';
import { useAppDispatch } from '../../store/hooks';
import * as userSlice from '../../store/user/user.slice';
import { Auth } from '../Auth/Auth';

export const UserProfile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isGuest = useUserIsGuest();
  const dispatch = useAppDispatch();

  const modal = useContext(ModalContext);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (isGuest) {
      modal.setModalData({
        content: <Auth successfulCallback={() => modal.setModalOpen(false)} />,
      });
      modal.setModalOpen(true);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(userSlice.logout());
    handleClose();
  };

  const userName = isGuest ? 'Гость' : User.getName();

  return (
    <div>
      <Button
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        sx={{ textTransform: 'none' }}
      >
        <AccountCircle sx={{ mr: '5px' }} />
        <Typography>{userName}</Typography>
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="/textbook/difficult">
          Сложные слова
        </MenuItem>
        <MenuItem component={Link} to="/textbook/known">
          Изученные слова
        </MenuItem>
        <MenuItem onClick={handleLogout}>Выход</MenuItem>
      </Menu>
    </div>
  );
};
