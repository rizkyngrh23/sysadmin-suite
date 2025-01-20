import React, { useState } from 'react';
import { Container, Typography, AppBar, Toolbar, Tabs, Tab, Box } from '@mui/material';
import * as Icons from '@mui/icons-material';
import * as CoreFeature from './components/core-feature';
import * as Utility from './components/utility';
import * as DevelopmentTools from './components/development-tools';

const App: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [currentDirectory, setCurrentDirectory] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('core');
  const [selectedCoreFeature, setSelectedCoreFeature] = useState<string>('terminal');
  const [selectedUtilityFeature, setSelectedUtilityFeature] = useState<string>('textEditor');
  const [selectedDevelopmentTool, setSelectedDevelopmentTool] = useState<string>('shellScripting');

  const handleCommandExecuted = (directory: string) => {
    setCurrentDirectory(directory);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleSelectSection = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedSection(newValue);
  };

  const handleSelectCoreFeature = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedCoreFeature(newValue);
  };

  const handleSelectUtilityFeature = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedUtilityFeature(newValue);
  };

  const handleSelectDevelopmentTool = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedDevelopmentTool(newValue);
  };

  const renderCoreFeature = () => {
    switch (selectedCoreFeature) {
      case 'terminal':
        return <CoreFeature.Terminal onCommandExecuted={handleCommandExecuted} />;
      case 'fileManager':
        return <CoreFeature.FileManager refreshTrigger={refreshTrigger} currentDirectory={currentDirectory} />;
      case 'processManager':
        return <CoreFeature.ProcessManager />;
      case 'resourceMonitor':
        return <CoreFeature.ResourceMonitor />;
      case 'userManagement':
        return <CoreFeature.UserManagement />;
      case 'commandList':
        return <CoreFeature.CommandList />;
      default:
        return null;
    }
  };

  const renderUtilityFeature = () => {
    switch (selectedUtilityFeature) {
      case 'textEditor':
        return (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Use the Text Editor to create and edit text files.
            </Typography>
            <Utility.TextEditor />
          </>
        );
      case 'logViewer':
        return (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Use the Log Viewer to view system logs.
            </Typography>
            <Utility.LogViewer />
          </>
        );
      case 'ping':
        return (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Use Ping to check the network connectivity to a host.
            </Typography>
            <Utility.Ping />
          </>
        );
      case 'traceroute':
        return (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Use Traceroute to trace the path packets take to a network host.
            </Typography>
            <Utility.Traceroute />
          </>
        );
      case 'curl':
        return (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Use Curl to make HTTP requests and view the responses.
            </Typography>
            <Utility.Curl />
          </>
        );
      case 'taskScheduler':
        return (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Use the Task Scheduler to schedule commands using cron syntax.
            </Typography>
            <Utility.TaskScheduler />
          </>
        );
      default:
        return null;
    }
  };

  const renderDevelopmentTool = () => {
    switch (selectedDevelopmentTool) {
      case 'shellScripting':
        return (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Write and execute shell scripts.
            </Typography>
            <DevelopmentTools.ShellScripting />
          </>
        );
      case 'codeRunner':
        return (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Execute small snippets of Python, JavaScript, or other supported languages.
            </Typography>
            <DevelopmentTools.CodeRunner />
          </>
        );
      case 'git':
        return (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Simulate basic Git operations.
            </Typography>
            <DevelopmentTools.Git />
          </>
        );
      case 'packageManager':
        return (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Simulate package management operations.
            </Typography>
            <DevelopmentTools.PackageManager />
          </>
        );
      // Add cases for other development tools here
      default:
        return null;
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            SysAdmin Suite
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          backgroundColor: '#ffffff',
          color: '#000',
          borderBottom: '1px solid #e0e0e0',
          mb: 2,
        }}
      >
        <Tabs
          value={selectedSection}
          onChange={handleSelectSection}
          centered
          sx={{
            '& .MuiTab-root': {
              fontWeight: 'bold',
              fontSize: '1.1rem',
            },
            '& .Mui-selected': {
              color: '#1976d2',
            },
          }}
        >
          <Tab label="Core" value="core" />
          <Tab label="Utilities" value="utilities" />
          <Tab label="Development Tools" value="developmentTools" />
        </Tabs>
      </Box>
      {selectedSection === 'core' && (
        <>
          <Box
            sx={{
              backgroundColor: '#fafafa',
              borderRadius: 1,
              border: '1px solid #e0e0e0',
              mb: 2,
              p: 1,
            }}
          >
            <Tabs
              value={selectedCoreFeature}
              onChange={handleSelectCoreFeature}
              centered
              sx={{
                '& .MuiTab-root': {
                  fontSize: '0.9rem',
                  minWidth: 120,
                },
                '& .Mui-selected': {
                  color: '#1976d2',
                },
              }}
            >
              <Tab icon={<Icons.Terminal />} label="Terminal" value="terminal" />
              <Tab icon={<Icons.Folder />} label="File Manager" value="fileManager" />
              <Tab icon={<Icons.Assessment />} label="Process Manager" value="processManager" />
              <Tab icon={<Icons.Memory />} label="Resource Monitor" value="resourceMonitor" />
              <Tab icon={<Icons.People />} label="User Management" value="userManagement" />
              <Tab icon={<Icons.List />} label="Command List" value="commandList" />
            </Tabs>
          </Box>
          <Container maxWidth="md" sx={{ mt: 4 }}>
            {renderCoreFeature()}
          </Container>
        </>
      )}
      {selectedSection === 'utilities' && (
        <>
          <Box
            sx={{
              backgroundColor: '#fafafa',
              borderRadius: 1,
              border: '1px solid #e0e0e0',
              mb: 2,
              p: 1,
            }}
          >
            <Tabs
              value={selectedUtilityFeature}
              onChange={handleSelectUtilityFeature}
              centered
              sx={{
                '& .MuiTab-root': {
                  fontSize: '0.9rem',
                  minWidth: 120,
                },
                '& .Mui-selected': {
                  color: '#1976d2',
                },
              }}
            >
              <Tab icon={<Icons.Edit />} label="Text Editor" value="textEditor" />
              <Tab icon={<Icons.Visibility />} label="Log Viewer" value="logViewer" />
              <Tab icon={<Icons.NetworkCheck />} label="Ping" value="ping" />
              <Tab icon={<Icons.Timeline />} label="Traceroute" value="traceroute" />
              <Tab icon={<Icons.Http />} label="Curl" value="curl" />
              <Tab icon={<Icons.Schedule />} label="Task Scheduler" value="taskScheduler" />
            </Tabs>
          </Box>
          <Container maxWidth="md" sx={{ mt: 4 }}>
            {renderUtilityFeature()}
          </Container>
        </>
      )}
      {selectedSection === 'developmentTools' && (
        <>
          <Box
            sx={{
              backgroundColor: '#fafafa',
              borderRadius: 1,
              border: '1px solid #e0e0e0',
              mb: 2,
              p: 1,
            }}
          >
            <Tabs
              value={selectedDevelopmentTool}
              onChange={handleSelectDevelopmentTool}
              centered
              sx={{
                '& .MuiTab-root': {
                  fontSize: '0.9rem',
                  minWidth: 120,
                },
                '& .Mui-selected': {
                  color: '#1976d2',
                },
              }}
            >
              <Tab label="Shell Scripting" value="shellScripting" />
              <Tab label="Code Runner" value="codeRunner" />
              <Tab label="Git" value="git" />
              <Tab label="Package Manager" value="packageManager" />
              {/* Add tabs for other development tools here */}
            </Tabs>
          </Box>
          <Container maxWidth="md" sx={{ mt: 4 }}>
            {renderDevelopmentTool()}
          </Container>
        </>
      )}
    </>
  );
};

export default App;
