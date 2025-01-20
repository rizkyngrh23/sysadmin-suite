import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const ShellScripting: React.FC = () => {
  const [script, setScript] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleExecuteScript = async () => {
    try {
      const response = await fetch('/api/execute-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ script }),
      });
      const data = await response.text();
      setResult(data);
    } catch (error) {
      console.error('Failed to execute script:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Shell Scripting</Typography>
      <TextField
        label="Shell Script"
        variant="outlined"
        fullWidth
        multiline
        rows={10}
        value={script}
        onChange={(e) => setScript(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleExecuteScript} sx={{ mb: 2 }}>
        Execute Script
      </Button>
      <Box sx={{ whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
        {result}
      </Box>
    </Box>
  );
};

export default ShellScripting;
