import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const TextEditor: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [filename, setFilename] = useState<string>('');

  const handleSave = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'untitled.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Text Editor</Typography>
      <TextField
        label="Filename"
        variant="outlined"
        fullWidth
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Content"
        variant="outlined"
        fullWidth
        multiline
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
};

export default TextEditor;
