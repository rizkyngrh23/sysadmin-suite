import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, IconButton, Card, CardContent, CardActionArea } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import RefreshIcon from '@mui/icons-material/Refresh';

interface FileEntry {
  name: string;
  isDirectory: boolean;
}

interface FileManagerProps {
  refreshTrigger: number;
  currentDirectory: string;
}

const FileManager: React.FC<FileManagerProps> = ({ refreshTrigger, currentDirectory }) => {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = async (path: string) => {
    try {
      const response = await fetch(`/api/files?path=${encodeURIComponent(path)}`);
      const result = await response.json();
      if (result.error) {
        setError(result.error);
      } else {
        setFiles(result);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  useEffect(() => {
    fetchFiles(currentDirectory);
  }, [currentDirectory]);

  useEffect(() => {
    fetchFiles(currentDirectory);
  }, [refreshTrigger]);

  const handleFileClick = (file: FileEntry) => {
    if (file.isDirectory) {
      const newPath = currentDirectory ? `${currentDirectory}/${file.name}` : file.name;
      fetchFiles(newPath);
    }
  };

  const handleRefresh = () => {
    fetchFiles(currentDirectory);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">File Manager</Typography>
        <IconButton onClick={handleRefresh}>
          <RefreshIcon />
        </IconButton>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <Box sx={{ height: 400, overflowY: 'auto' }}>
        <Grid container spacing={2}>
          {files.map((file, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Card>
                <CardActionArea onClick={() => handleFileClick(file)}>
                  <CardContent>
                    {file.isDirectory ? <FolderIcon fontSize="large" /> : <InsertDriveFileIcon fontSize="large" />}
                    <Typography variant="body2" noWrap>
                      {file.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FileManager;
