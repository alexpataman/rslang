import { useState, useContext } from 'react';

import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { User } from '../../services/User';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectUserData } from '../../store/user/user.slice';
import * as userSlice from '../../store/user/user.slice';
import { Auth } from '../Auth/Auth';
import { ModalContext } from '../context/ModalContext';

export const UserProfile = () => {
  const { isGuest } = useAppSelector(selectUserData);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
        sx={{ textTransform: 'none', color: '#fff' }}
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
        <MenuItem onClick={handleClose}>Словарь</MenuItem>
        <MenuItem onClick={handleClose}>Статистика</MenuItem>
        <MenuItem onClick={handleLogout}>Выход</MenuItem>
      </Menu>
    </div>
  );
};
