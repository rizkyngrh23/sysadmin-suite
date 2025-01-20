import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const commands = [
  { command: 'ls', description: 'List directory contents' },
  { command: 'cd', description: 'Change the current directory' },
  { command: 'pwd', description: 'Print the current working directory' },
  { command: 'mkdir', description: 'Create a new directory' },
  { command: 'rmdir', description: 'Remove an empty directory' },
  { command: 'rm', description: 'Remove files or directories' },
  { command: 'cp', description: 'Copy files or directories' },
  { command: 'mv', description: 'Move or rename files or directories' },
  { command: 'touch', description: 'Create an empty file or update the timestamp of an existing file' },
  { command: 'cat', description: 'Concatenate and display file contents' },
  { command: 'echo', description: 'Display a line of text' },
  { command: 'grep', description: 'Search for patterns in files' },
  { command: 'find', description: 'Search for files in a directory hierarchy' },
  { command: 'chmod', description: 'Change file permissions' },
  { command: 'chown', description: 'Change file owner and group' },
  { command: 'ps', description: 'Report a snapshot of current processes' },
  { command: 'top', description: 'Display Linux tasks' },
  { command: 'htop', description: 'Interactive process viewer' },
  { command: 'df', description: 'Report file system disk space usage' },
  { command: 'du', description: 'Estimate file space usage' },
  { command: 'free', description: 'Display amount of free and used memory in the system' },
  { command: 'uname', description: 'Print system information' },
  { command: 'whoami', description: 'Print the current user name' },
  { command: 'man', description: 'Display the manual for a command' },
];

const CommandList: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Linux Command List</Typography>
      <List>
        {commands.map((cmd, index) => (
          <ListItem key={index}>
            <ListItemText primary={cmd.command} secondary={cmd.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CommandList;
