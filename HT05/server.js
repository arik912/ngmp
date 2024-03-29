import http from 'http';
import url from 'url';
import {getUsers, createUser, deleteUser,getUserHobbies, updateUserHobbies} from './user/user.controllers.js'

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);

  // Routing, need to find better methods maybe {'/api/users':getUsers}
  if (req.method === 'GET' && reqUrl.pathname === '/api/users') {
      getUsers(req, res);
  } else if (req.method === 'POST' && reqUrl.pathname === '/api/users') {
      createUser(req, res);
  } else if (req.method === 'DELETE' && reqUrl.pathname.startsWith('/api/users/')) {
      const userId = reqUrl.pathname.split('/').pop();
      deleteUser(req, res, userId);
  } else if (req.method === 'GET' && reqUrl.pathname.startsWith('/api/users/')) {
      const userId = reqUrl.pathname.split('/').pop();
      getUserHobbies(req, res, userId);
  } else if (req.method === 'PATCH' && reqUrl.pathname.startsWith('/api/users/')) {
      const userId = reqUrl.pathname.split('/').pop();
      let body = '';
      req.on('data', chunk => {
          body += chunk.toString();
      });
      req.on('end', () => {
          req.body = JSON.parse(body);
          updateUserHobbies(req, res, userId);
      });
  } else {
      sendJSONResponse(res, 404, { message: 'Not found' });
  }
});

// Start server
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle stop command
process.on('SIGINT', () => {
  console.log('Stopping server...');
  server.close(() => {
      console.log('Server stopped.');
      process.exit(0);
  });
});