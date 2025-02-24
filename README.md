# web2finalproject

Task Manager API

Simple RESTful API for task management built on Node.js, Express.js and MongoDB. Includes user authentication, task management, mass updating/deleting tasks and statistics.


Clone the repository:
Git clone https://github.com/spravdelivost/web2finalproject.git
Cd is your repository

Install dependencies:
Npm install

Create an .env file and add variables:
MONGODB_URI=mongodb+srv://sprvdlvst:malikov@clusterfinal.my3ch.mongodb.net/task-manager
JWT_SECRET=9f4d7b2a5e1c8f3a6b9d2e5c8f1a3b7d6e9f2a5c8b3e6f9d2a5c8
JWT_EXPIRES_IN=1d
PORT=5003


Start the server:
npm start


API Documentation


Authentication


Registration: POST /api/auth/register
Login: POST /api/auth/login

Tasks
Create a task: POST /api/tasks
Get all tasks: GET /api/tasks
Update task: PUT /api/tasks/:id
Delete task: DELETE /api/tasks/:id
Mass update: PUT /api/tasks/bulk-update
Bulk deletion: DELETE /api/tasks/bulk-delete
Task statistics: GET /api/tasks/stats

Technologies
Node.js
Express.js
MongoDB
JWT (authentication)
Bcrypt (password hashing)
