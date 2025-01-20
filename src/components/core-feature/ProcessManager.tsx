import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface Process {
  user: string;
  pid: string;
  cpu: string;
  mem: string;
  vsz: string;
  rss: string;
  tty: string;
  stat: string;
  start: string;
  time: string;
  command: string;
}

const ProcessManager: React.FC = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchProcesses = async () => {
    try {
      const response = await fetch('/api/processes');
      const result = await response.json();
      if (result.error) {
        setError(result.error);
      } else {
        setProcesses(result);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  useEffect(() => {
    fetchProcesses();
  }, []);

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Process Manager</Typography>
        <Tooltip title="Refresh">
          <IconButton onClick={fetchProcesses}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>PID</TableCell>
              <TableCell>CPU</TableCell>
              <TableCell>MEM</TableCell>
              <TableCell>VSZ</TableCell>
              <TableCell>RSS</TableCell>
              <TableCell>TTY</TableCell>
              <TableCell>STAT</TableCell>
              <TableCell>START</TableCell>
              <TableCell>TIME</TableCell>
              <TableCell>COMMAND</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {processes.map((process, index) => (
              <TableRow key={index}>
                <TableCell>{process.user}</TableCell>
                <TableCell>{process.pid}</TableCell>
                <TableCell>{process.cpu}</TableCell>
                <TableCell>{process.mem}</TableCell>
                <TableCell>{process.vsz}</TableCell>
                <TableCell>{process.rss}</TableCell>
                <TableCell>{process.tty}</TableCell>
                <TableCell>{process.stat}</TableCell>
                <TableCell>{process.start}</TableCell>
                <TableCell>{process.time}</TableCell>
                <TableCell>{process.command}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProcessManager;
