import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const TaskScheduler: React.FC = () => {
  const [cronExpression, setCronExpression] = useState<string>('');
  const [command, setCommand] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleScheduleTask = async () => {
    if (!cronExpression || !command) {
      alert('Please enter a cron expression and a command.');
      return;
    }
    try {
      const response = await fetch('/api/schedule-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cronExpression, command }),
      });
      const data = await response.text();
      setResult(data);
    } catch (error) {
      console.error('Failed to schedule task:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Task Scheduler</Typography>
      <TextField
        label="Cron Expression"
        variant="outlined"
        fullWidth
        value={cronExpression}
        onChange={(e) => setCronExpression(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Command"
        variant="outlined"
        fullWidth
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleScheduleTask} sx={{ mb: 2 }}>
        Schedule Task
      </Button>
      <Box sx={{ whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
        {result}
      </Box>
    </Box>
  );
};

export default TaskScheduler;
