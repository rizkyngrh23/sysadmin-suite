import React, { useState } from 'react';
import { Paper, Box } from '@mui/material';
import CommandInput from './CommandInput';
import CommandOutput from './CommandOutput';

interface CommandHistory {
  command: string;
  output: string;
}

interface TerminalProps {
  onCommandExecuted: (currentDirectory: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({ onCommandExecuted }) => {
  const [history, setHistory] = useState<CommandHistory[]>([]);

  const handleCommand = async (command: string) => {
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });
      const result = await response.text();
      setHistory([{ command, output: result }]);

      const dirResponse = await fetch('/api/current-directory');
      const dirResult = await dirResponse.json();
      onCommandExecuted(dirResult.currentDirectory);
    } catch (error) {
      if (error instanceof Error) {
        setHistory([{ command, output: `Error: ${error.message}` }]);
      } else {
        setHistory([{ command, output: 'An unknown error occurred' }]);
      }
      const dirResponse = await fetch('/api/current-directory');
      const dirResult = await dirResponse.json();
      onCommandExecuted(dirResult.currentDirectory);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <CommandInput onCommand={handleCommand} />
      <Box mt={2}>
        <CommandOutput history={history} />
      </Box>
    </Paper>
  );
};

export default Terminal;

export {};
