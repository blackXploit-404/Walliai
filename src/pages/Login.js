// src/pages/LoginPage.js
import React, { useState } from 'react';
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Container, Typography, Button, TextField } from '@mui/material';
import { loginWithEmailPassword } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

const auth = getAuth();
const provider = new GoogleAuthProvider();

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await loginWithEmailPassword(email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        await signOut(auth); // Sign out the user immediately if the email is not verified
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Error during email login:", error);
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        await signOut(auth); // Sign out the user immediately if the email is not verified
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      setError(error.message);
    }
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#FFD700', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="sm" style={{ textAlign: 'center' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '30px' }}>
          Login to Wallpaper Hub
        </Typography>
        <form onSubmit={handleEmailLogin}>
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
            style={{ backgroundColor: '#FFD700', color: '#000', width: '100%', padding: '10px' }}
          >
            Login
          </Button>
        </form>
        <Button
          onClick={handleGoogleLogin}
          variant="contained"
          style={{ backgroundColor: '#4285F4', color: '#fff', marginTop: '20px', width: '100%', padding: '10px' }}
        >
          Sign in with Google
        </Button>
        {error && <Typography variant="body2" style={{ color: 'red', marginTop: '20px' }}>{error}</Typography>}
        <Typography variant="body2" style={{ color: '#888', marginTop: '20px' }}>
          Don't have an account? <Link to="/register" style={{ color: '#FFD700' }}>Register</Link>
        </Typography>
      </Container>
    </div>
  );
};

export default LoginPage;
