// src/components/WallpaperGrid.js
import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

const WallpaperGrid = ({ wallpapers }) => {
  return (
    <Grid container spacing={2}>
      {wallpapers.map((photo) => (
        <Grid item xs={12} sm={6} md={4} key={photo.id}>
          <Card>
            <CardMedia
              component="img"
              alt={photo.alt_description}
              height="140"
              image={photo.urls.small}
              title={photo.alt_description}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {photo.alt_description || 'No description'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default WallpaperGrid;
