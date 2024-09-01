// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { Container, Typography, Button, TextField } from '@mui/material';
import { registerWithEmailPassword, signInWithGoogle } from '../firebase';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await registerWithEmailPassword(email, password);
      setMessage(`Verification email sent to ${userCredential.user.email}. Please verify your email.`);
      setTimeout(() => {
        navigate('/login');
      }, 5000);  // Redirect to login page after 5 seconds
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error("Error during Google sign-up:", error);
      setMessage("Google sign-up failed. Please try again.");
    }
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#FFD700', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="sm" style={{ textAlign: 'center' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '30px' }}>
          Register at Wallpaper Hub
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField 
            label="Email" 
            variant="outlined" 
            fullWidth 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ marginBottom: '20px', backgroundColor: '#fff', borderRadius: '5px' }}
          />
          <TextField 
            label="Password" 
            variant="outlined" 
            type="password" 
            fullWidth 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ marginBottom: '20px', backgroundColor: '#fff', borderRadius: '5px' }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            style={{ backgroundColor: '#FFD700', color: '#000', width: '100%', padding: '10px' }}>
            Register
          </Button>
        </form>
        <Typography variant="body2" style={{ color: '#888', marginTop: '20px' }}>
          or
        </Typography>
        <Button 
          onClick={handleGoogleSignIn} 
          variant="contained" 
          style={{ backgroundColor: '#FFD700', color: '#000', marginTop: '20px', width: '100%', padding: '10px' }}>
          Sign up with Google
        </Button>
        {message && <Typography variant="body2" style={{ color: '#FFD700', marginTop: '20px' }}>{message}</Typography>}
      </Container>
    </div>
  );
};

export default RegisterPage;
