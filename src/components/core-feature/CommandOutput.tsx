import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

interface CommandHistory {
  command: string;
  output: string;
}

interface CommandOutputProps {
  history: CommandHistory[];
}

const CommandOutput: React.FC<CommandOutputProps> = ({ history }) => {
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const latestEntry = history[history.length - 1];

  return (
    <Box
      mt={2}
      ref={outputRef}
      sx={{
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4',
        p: 2,
        borderRadius: 1,
        fontFamily: 'Roboto Mono, monospace',
        height: '400px',
        overflowY: 'auto',
        boxShadow: 'inset 0 0 10px #000000',
      }}
    >
      {latestEntry && (
        <Box mb={2}>
          <Typography variant="body1" component="pre">
            $ {latestEntry.command}
          </Typography>
          <Typography variant="body1" component="pre">
            {latestEntry.output}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CommandOutput;
