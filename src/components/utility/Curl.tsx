import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Curl: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleCurl = async () => {
    if (!url) {
      alert('Please enter a URL.');
      return;
    }
    try {
      const response = await fetch(`/api/curl?url=${encodeURIComponent(url)}`);
      const data = await response.text();
      setResult(data);
    } catch (error) {
      console.error('Failed to fetch URL:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Curl</Typography>
      <TextField
        label="URL"
        variant="outlined"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleCurl} sx={{ mb: 2 }}>
        Fetch
      </Button>
      <Box sx={{ whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
        {result}
      </Box>
    </Box>
  );
};

export default Curl;
