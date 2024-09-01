// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Import the auth object from firebase
import { Typography, Container, Box, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    
    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success('Logged out successfully!'); // Show success toast
      navigate('/login'); // Redirect to login page or desired route
    } catch (error) {
      toast.error('Error logging out.'); // Show error toast
    }
  };

  return (
    <>
      <Navbar user={user} logOut={handleLogout} /> {/* Pass handleLogout function */}
      <Container maxWidth="sm" style={{ marginTop: '50px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        {user ? (
          <Box>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="Profile"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '20px'
                }}
              />
            )}
            <Typography variant="h6">Email: {user.email}</Typography>
            <Button
              component={Link}
              to="/"
              variant="contained"
              style={{ backgroundColor: '#FFD700', color: '#000', marginTop: '20px' }}
            >
              Go to Home
            </Button>
            <Button
              onClick={handleLogout}
              variant="contained"
              style={{ backgroundColor: '#FF5733', color: '#fff', marginTop: '20px' }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Typography variant="h6">
            No user is logged in. Please log in to view your profile.
          </Typography>
        )}
      </Container>
      <ToastContainer /> {/* Render ToastContainer for toast notifications */}
    </>
  );
};

export default Profile;
