import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const LogViewer: React.FC = () => {
  const [logs, setLogs] = useState<string>('');

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/logs');
      const data = await response.text();
      setLogs(data);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Log Viewer</Typography>
      <Button variant="contained" color="primary" onClick={fetchLogs} sx={{ mb: 2 }}>
        Refresh Logs
      </Button>
      <Box sx={{ whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
        {logs}
      </Box>
    </Box>
  );
};

export default LogViewer;
