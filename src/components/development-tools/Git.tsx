import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Git: React.FC = () => {
  const [command, setCommand] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleExecuteGitCommand = async () => {
    try {
      const response = await fetch('/api/execute-git', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });
      const data = await response.text();
      setResult(data);
    } catch (error) {
      console.error('Failed to execute Git command:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Git</Typography>
      <TextField
        label="Git Command"
        variant="outlined"
        fullWidth
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleExecuteGitCommand} sx={{ mb: 2 }}>
        Execute Command
      </Button>
      <Box sx={{ whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
        {result}
      </Box>
    </Box>
  );
};

export default Git;
