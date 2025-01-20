import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface CommandInputProps {
  onCommand: (command: string) => void;
}

const CommandInput: React.FC<CommandInputProps> = ({ onCommand }) => {
  const [command, setCommand] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onCommand(command);
    setCommand('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1, alignItems: 'center', padding: 2, border: '1px solid #ccc', borderRadius: 4, backgroundColor: '#f5f5f5' }}>
      <TextField
        label="Command"
        variant="outlined"
        fullWidth
        value={command}
        onChange={(e) => setCommand(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Run
      </Button>
    </Box>
  );
};

export default CommandInput;
