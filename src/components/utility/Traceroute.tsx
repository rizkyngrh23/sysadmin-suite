import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Traceroute: React.FC = () => {
  const [host, setHost] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleTraceroute = async () => {
    if (!host) {
      alert('Please enter a host.');
      return;
    }
    try {
      const response = await fetch(`/api/traceroute?host=${host}`);
      const data = await response.text();
      setResult(data);
    } catch (error) {
      console.error('Failed to perform traceroute:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Traceroute</Typography>
      <TextField
        label="Host"
        variant="outlined"
        fullWidth
        value={host}
        onChange={(e) => setHost(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleTraceroute} sx={{ mb: 2 }}>
        Traceroute
      </Button>
      <Box sx={{ whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
        {result}
      </Box>
    </Box>
  );
};

export default Traceroute;
