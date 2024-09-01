// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { auth, logOut } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { Typography, Button, Container, Box, TextField, Grid, Card, CardMedia, CardContent } from '@mui/material';
import './Home.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [wallpapers, setWallpapers] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.emailVerified) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const handleSearchWallpapers = async () => {
    if (!query) {
      alert("Please enter a search term.");
      return;
    }

    try {
      setLoading(true);

      // Fetch from Pixabay
      const pixabayResponse = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '',  // Replace with your Pixabay API key
          q: query,
          image_type: 'photo',
          per_page: 10
        }
      });

      // Fetch from Pexels
      const pexelsResponse = await axios.get('https://api.pexels.com/v1/search', {
        headers: {
          Authorization: ''  // Replace with your Pexels API key
        },
        params: {
          query: query,
          per_page: 10
        }
      });

      // Combine results
      const combinedWallpapers = [
        ...pixabayResponse.data.hits,
        ...pexelsResponse.data.photos
      ];

      setWallpapers(combinedWallpapers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching wallpapers:", error);
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <Navbar user={user} logOut={logOut} />
      <Container maxWidth="lg" className="content-container">
        <Box className="hero-section" textAlign="center" paddingY={4}>
          {!user && (
            <>
              <Typography variant="h2" gutterBottom className="hero-title">
                Find Beautiful Wallpapers
              </Typography>
              <Typography variant="h6" className="hero-subtitle">
                Enter a search term to find stunning wallpapers.
              </Typography>
            </>
          )}
        </Box>
        <Box className="content-body" textAlign="center">
          {user ? (
            <>
              <Typography variant="h4" gutterBottom className="welcome-message">
                Welcome, {user.displayName || user.email}!
              </Typography>

              <Box marginTop={4}>
                <TextField
                  label="Search for wallpapers"
                  variant="outlined"
                  fullWidth
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{ marginBottom: '20px', backgroundColor: '#fff', borderRadius: '5px' }}
                />
                <Button
                  onClick={handleSearchWallpapers}
                  variant="contained"
                  style={{ backgroundColor: '#FFD700', color: '#000', padding: '10px 20px' }}
                >
                  Search
                </Button>
              </Box>

              {loading && <LoadingSpinner />}

              {wallpapers.length > 0 && (
                <Box marginTop={4}>
                  <Typography variant="h6" gutterBottom>
                    Your Search Results:
                  </Typography>
                  <Grid container spacing={4}>
                    {wallpapers.map((photo) => (
                      <Grid item xs={12} sm={6} md={4} key={photo.id || photo.src.original}>
                        <Card>
                          <CardMedia
                            component="img"
                            image={photo.webformatURL || photo.src.medium}
                            alt={photo.tags || photo.photographer}
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                          <CardContent>
                            <Button
                              href={photo.webformatURL || photo.src.original}
                              download
                              variant="outlined"
                              style={{ width: '100%' }}
                            >
                              Download
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </>
          ) : null}

          {user && !user.emailVerified && (
            <Box marginTop={2}>
              <Button
                onClick={() => auth.currentUser.sendEmailVerification()}
                variant="contained"
                style={{ backgroundColor: '#FFD700', color: '#000' }}
              >
                Resend Verification Email
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Home;
