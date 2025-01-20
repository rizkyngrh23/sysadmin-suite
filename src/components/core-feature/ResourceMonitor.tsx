import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Grid, Paper, Divider } from '@mui/material';

interface CPU {
  model: string;
  speed: number;
  times: {
    user: number;
    nice: number;
    sys: number;
    idle: number;
    irq: number;
  };
}

interface Memory {
  total: number;
  used: number;
  free: number;
}

interface Disk {
  total: number;
  used: number;
  free: number;
}

interface ResourceStats {
  cpu: CPU[];
  memory: Memory;
  disk: Disk;
}

const ResourceMonitor: React.FC = () => {
  const [stats, setStats] = useState<ResourceStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/resource-stats');
      const result = await response.json();
      if (result.error) {
        setError(result.error);
      } else {
        setStats(result);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!stats) {
    return <CircularProgress />;
  }

  const { cpu, memory, disk } = stats;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Resource Monitor</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">CPU</Typography>
            <Divider sx={{ my: 1 }} />
            {cpu.map((core, index) => (
              <Box key={index} mb={2}>
                <Typography variant="body1">Core {index + 1}</Typography>
                <Typography variant="body2">Model: {core.model}</Typography>
                <Typography variant="body2">Speed: {core.speed} MHz</Typography>
                <Typography variant="body2">User: {core.times.user}</Typography>
                <Typography variant="body2">System: {core.times.sys}</Typography>
                <Typography variant="body2">Idle: {core.times.idle}</Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Memory</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2">Total: {(memory.total / (1024 ** 3)).toFixed(2)} GB</Typography>
            <Typography variant="body2">Used: {(memory.used / (1024 ** 3)).toFixed(2)} GB</Typography>
            <Typography variant="body2">Free: {(memory.free / (1024 ** 3)).toFixed(2)} GB</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Disk</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2">Total: {(disk.total / (1024 ** 3)).toFixed(2)} GB</Typography>
            <Typography variant="body2">Used: {(disk.used / (1024 ** 3)).toFixed(2)} GB</Typography>
            <Typography variant="body2">Free: {(disk.free / (1024 ** 3)).toFixed(2)} GB</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResourceMonitor;
