import { Elysia } from 'elysia';
import { exec } from 'child_process';
import { readdir, readFile } from 'fs/promises';
import { resolve as _resolve } from 'path';
import { Headers as UndiciHeaders } from 'undici';
import { promisify } from 'util';
import os from 'os';

globalThis.Headers = UndiciHeaders as unknown as typeof Headers;

const app = new Elysia();
const execPromise = promisify(exec);

app.onBeforeHandle(({ request }) => {
  (request as any).start = Date.now();
});

app.onAfterHandle(({ request }) => {
  const end = Date.now();
  const method = request.method;
  console.log(`[${method}]: ${end - (request as any).start}ms`);
});

let currentDirectory = process.cwd();

app.post('/api/execute', async ({ body }) => {
  const { command } = body as { command: string };

  if (command.startsWith('cd ')) {
    const newDirectory = command.slice(3).trim();
    currentDirectory = _resolve(currentDirectory, newDirectory);
    return `Changed directory to ${currentDirectory}`;
  }

  return new Promise((resolve, reject) => {
    exec(command, { cwd: currentDirectory }, (error, stdout, stderr) => {
      if (error) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
});

app.post('/api/execute-script', async ({ body }) => {
  const { script } = body as { script: string };
  try {
    const { stdout, stderr } = await execPromise(script);
    if (stderr) {
      return { error: stderr };
    }
    return stdout;
  } catch (error) {
    return { error: error.message };
  }
});

app.post('/api/execute-code', async ({ body }) => {
  const { language, code } = body as { language: string; code: string };
  let command: string;

  switch (language) {
    case 'python':
      command = `python -c "${code.replace(/"/g, '\\"')}"`;
      break;
    case 'javascript':
      command = `node -e "${code.replace(/"/g, '\\"')}"`;
      break;
    case 'ruby':
      command = `ruby -e "${code.replace(/"/g, '\\"')}"`;
      break;
    case 'php':
      const phpCode = code.trim().startsWith('<?php') ? code : `<?php ${code} ?>`;
      command = `php -r "${phpCode.replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\\/g, '\\\\')}"`;
      break;
    case 'bash':
      command = `bash -c "${code.replace(/"/g, '\\"')}"`;
      break;
    // Add cases for other languages here
    default:
      return { error: 'Unsupported language' };
  }

  try {
    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
      return { error: stderr };
    }
    return stdout;
  } catch (error) {
    return { error: error.message };
  }
});

app.post('/api/execute-git', async ({ body }) => {
  const { command } = body as { command: string };
  try {
    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
      return { error: stderr };
    }
    return stdout;
  } catch (error) {
    return { error: error.message };
  }
});

app.post('/api/execute-package', async ({ body }) => {
  const { command } = body as { command: string };
  try {
    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
      return { error: stderr };
    }
    return stdout;
  } catch (error) {
    return { error: error.message };
  }
});

app.get('/api/files', async ({ query }) => {
  const path = query.path || '';
  const directoryPath = _resolve(currentDirectory, path);
  try {
    const files = await readdir(directoryPath, { withFileTypes: true });
    return files.map(file => ({
      name: file.name,
      isDirectory: file.isDirectory()
    }));
  } catch (error) {
    return { error: error.message };
  }
});

app.get('/api/current-directory', () => {
  return { currentDirectory };
});

app.get('/api/processes', async () => {
  try {
    const { stdout } = await execPromise('ps aux');
    const processes = stdout.split('\n').slice(1).map(line => {
      const columns = line.trim().split(/\s+/);
      return {
        user: columns[0],
        pid: columns[1],
        cpu: columns[2],
        mem: columns[3],
        vsz: columns[4],
        rss: columns[5],
        tty: columns[6],
        stat: columns[7],
        start: columns[8],
        time: columns[9],
        command: columns.slice(10).join(' ')
      };
    });
    return processes;
  } catch (error) {
    return { error: error.message };
  }
});

app.get('/api/resource-stats', () => {
  const cpus = os.cpus();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const diskUsage = os.totalmem();

  return {
    cpu: cpus.map(cpu => ({
      model: cpu.model,
      speed: cpu.speed,
      times: cpu.times
    })),
    memory: {
      total: totalMemory,
      used: usedMemory,
      free: freeMemory
    },
    disk: {
      total: diskUsage,
      used: usedMemory,
      free: freeMemory 
    }
  };
});

app.get('/api/users', async () => {
  try {
    const { stdout } = await execPromise('cat /etc/passwd');
    const users = stdout.split('\n').map(line => {
      const columns = line.split(':');
      return {
        username: columns[0],
        uid: columns[2],
        gid: columns[3],
        home: columns[5],
        shell: columns[6]
      };
    }).filter(user => user.username);
    return users;
  } catch (error) {
    return { error: error.message };
  }
});

app.get('/api/groups', async () => {
  try {
    const { stdout } = await execPromise('cat /etc/group');
    const groups = stdout.split('\n').map(line => {
      const columns = line.split(':');
      return {
        groupname: columns[0],
        gid: columns[2],
        members: columns[3] ? columns[3].split(',') : []
      };
    }).filter(group => group.groupname);
    return groups;
  } catch (error) {
    return { error: error.message };
  }
});

app.get('/api/logs', async () => {
  try {
    const logs = await readFile('./mock-logs/syslog', 'utf-8'); //change the path to actual log folder
    return logs;
  } catch (error) {
    return { error: error.message };
  }
});

app.get('/api/ping', async ({ query }) => {
  const host = query.host as string;
  try {
    const { stdout } = await execPromise(`ping -c 4 ${host}`);
    return stdout;
  } catch (error) {
    return { error: error.message };
  }
});

app.get('/api/traceroute', async ({ query }) => {
  const host = query.host as string;
  try {
    const { stdout } = await execPromise(`traceroute ${host}`);
    return stdout;
  } catch (error) {
    return { error: error.message };
  }
});

app.get('/api/curl', async ({ query }) => {
  const url = query.url as string;
  try {
    const { stdout } = await execPromise(`curl -s ${url}`);
    return stdout;
  } catch (error) {
    return { error: error.message };
  }
});

app.post('/api/schedule-task', async ({ body }) => {
  const { cronExpression, command } = body as { cronExpression: string; command: string };
  try {
    const cronJob = `${cronExpression} ${command}`;
    await execPromise(`(crontab -l ; echo "${cronJob}") | crontab -`);
    return 'Task scheduled successfully';
  } catch (error) {
    return { error: error.message };
  }
});

app.get('/refresh', () => {
  return 'Page refreshed or loaded';
});

app.listen(3001, () => {
  console.log(`🦊 Elysia is running on http://localhost:3001`);
});

