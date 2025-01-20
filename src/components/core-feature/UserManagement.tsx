import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface User {
  username: string;
  uid: string;
  gid: string;
  home: string;
  shell: string;
}

interface Group {
  groupname: string;
  gid: string;
  members: string[];
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const result = await response.json();
      if (result.error) {
        setError(result.error);
      } else {
        setUsers(result);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/groups');
      const result = await response.json();
      if (result.error) {
        setError(result.error);
      } else {
        setGroups(result);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchGroups();
  }, []);

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6">User Management</Typography>
        <Tooltip title="Refresh">
          <IconButton onClick={() => { fetchUsers(); fetchGroups(); }}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <Typography variant="h6" gutterBottom>Users</Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 200, mb: 2 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>UID</TableCell>
              <TableCell>GID</TableCell>
              <TableCell>Home</TableCell>
              <TableCell>Shell</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.uid}</TableCell>
                <TableCell>{user.gid}</TableCell>
                <TableCell>{user.home}</TableCell>
                <TableCell>{user.shell}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" gutterBottom>Groups</Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Groupname</TableCell>
              <TableCell>GID</TableCell>
              <TableCell>Members</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group, index) => (
              <TableRow key={index}>
                <TableCell>{group.groupname}</TableCell>
                <TableCell>{group.gid}</TableCell>
                <TableCell>{group.members.join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserManagement;
