import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

const CodeRunner: React.FC = () => {
  const [language, setLanguage] = useState<string>('python');
  const [code, setCode] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleExecuteCode = async () => {
    try {
      const response = await fetch('/api/execute-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language, code }),
      });
      const data = await response.text();
      setResult(data);
    } catch (error) {
      console.error('Failed to execute code:', error);
    }
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Code Runner</Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Language</InputLabel>
        <Select
          value={language}
          onChange={handleLanguageChange}
          label="Language"
        >
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="javascript">JavaScript</MenuItem>
          <MenuItem value="ruby">Ruby</MenuItem>
          <MenuItem value="php">PHP</MenuItem>
          <MenuItem value="bash">Bash</MenuItem>
          {/* Add more languages here */}
        </Select>
      </FormControl>
      {language === 'php' && (
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Note: You do not need to include PHP tags (&lt;?php ?&gt;) in your code.
        </Typography>
      )}
      <TextField
        label="Code"
        variant="outlined"
        fullWidth
        multiline
        rows={10}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleExecuteCode} sx={{ mb: 2 }}>
        Execute Code
      </Button>
      <Box sx={{ whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
        {result}
      </Box>
    </Box>
  );
};

export default CodeRunner;
