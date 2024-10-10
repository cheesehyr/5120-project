import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Box } from '@mui/material';
import './Password.css';

const PasswordPage = ({ onAuthenticate }) => {
  const [password, setPassword] = useState('');
  const correctPassword = 'tp19tp19'; 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      onAuthenticate();
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} style={{ padding: '2rem', minWidth: '300px' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Enter Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default PasswordPage;