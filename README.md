📝 Task Management System
A full-stack task manager built with Next.js, Node.js, TypeScript, and PostgreSQL.
⚡ Features

🔐 JWT Authentication (Access + Refresh Tokens)
✅ Create, Edit, Delete Tasks
🔍 Search & Filter
📄 Pagination
📱 Responsive Design

🛠️ Tech Stack
Backend: Node.js, Express, TypeScript, Prisma, PostgreSQL
Frontend: Next.js 15, TypeScript, Tailwind CSS
🚀 Quick Start
Prerequisites

Node.js 18+
PostgreSQL

Backend Setup
bashcd task-management-backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev  # Runs on port 5000
Frontend Setup
bashcd task-management-frontend
npm install
npm run dev  # Runs on port 3000
Environment Variables
Backend (.env):
envDATABASE_URL="postgresql://user:password@localhost:5432/taskmanager"
JWT_ACCESS_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-key"
PORT=5000
Frontend (.env.local):
envNEXT_PUBLIC_API_URL=http://localhost:5000
📸 Screenshots
Show Image
Show Image
📝 API Endpoints

POST /auth/register - Register user
POST /auth/login - Login
POST /auth/refresh - Refresh token
GET /tasks - Get all tasks
POST /tasks - Create task
PATCH /tasks/:id - Update task
DELETE /tasks/:id - Delete task
