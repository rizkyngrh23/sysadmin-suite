import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Ping: React.FC = () => {
  const [host, setHost] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handlePing = async () => {
    if (!host) {
      alert('Please enter a host.');
      return;
    }
    try {
      const response = await fetch(`/api/ping?host=${host}`);
      const data = await response.text();
      setResult(data);
    } catch (error) {
      console.error('Failed to ping host:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Ping</Typography>
      <TextField
        label="Host"
        variant="outlined"
        fullWidth
        value={host}
        onChange={(e) => setHost(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handlePing} sx={{ mb: 2 }}>
        Ping
      </Button>
      <Box sx={{ whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
        {result}
      </Box>
    </Box>
  );
};

export default Ping;
