📝 Task Management System

- A full-stack task manager built with Next.js, Node.js, TypeScript, and PostgreSQL.

⚡ Features

- JWT Authentication (Access + Refresh Tokens)

- Create, Edit, Delete Tasks

- Search & Filter Tasks

- Pagination

- Responsive Design

🛠️ Tech Stack

- Backend:- Node.js, Express, TypeScript, Prisma, PostgreSQL
- Frontend:- Next.js 15, TypeScript, Tailwind CSS

🚀 Quick Start

- Node.js 18+
- PostgreSQL

📸 Screenshots
<img width="1886" height="818" alt="image" src="https://github.com/user-attachments/assets/94ed06e3-405a-4f75-aae9-a86b3c7437bf" />
<img width="1790" height="862" alt="image" src="https://github.com/user-attachments/assets/1da8aadf-ea25-44c0-93d2-5845eb19d0e4" />
<img width="1649" height="802" alt="image" src="https://github.com/user-attachments/assets/ae00860e-cfbf-4470-b64c-32dc719d8659" />


📝 API Endpoints

Authentication
| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | `/auth/register` | Register user |
| POST   | `/auth/login`    | Login user    |
| POST   | `/auth/refresh`  | Refresh token |

Tasks
| Method | Endpoint     | Description   |
| ------ | ------------ | ------------- |
| GET    | `/tasks`     | Get all tasks |
| POST   | `/tasks`     | Create a task |
| PATCH  | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |


###  Setup

```bash
- Backend Setup 
cd task-management-backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev  # Runs on port 5000


- Frontend Setup
cd task-management-frontend
npm install
npm run dev  # Runs on port 3000

- Environment Variables

- Backend (.env)
DATABASE_URL="postgresql://user:password@localhost:5432/taskmanager"
JWT_ACCESS_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-key"
PORT=5000

- Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000
