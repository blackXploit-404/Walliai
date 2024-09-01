// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';

const Navbar = ({ user, logOut }) => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#000' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, color: '#FFD700' }}>
          Walliai
        </Typography>
        {user ? (
          <>
            <Button component={Link} to="/profile" style={{ color: '#FFD700' }}>
              <AccountCircle />
            </Button>
            <Button onClick={logOut} style={{ color: '#FFD700' }}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/login" style={{ color: '#FFD700' }}>Login</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
