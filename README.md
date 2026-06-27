# Job Portal — Backend

Node.js + Express.js REST API for a full-stack MERN job portal with JWT authentication and role-based access control.

## 🌐 Live Demo
https://job-portal-frontend-virid-nine.vercel.app

## 🔗 Frontend Repo
https://github.com/nehakumbhar2005-sudo/job-portal-frontend

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT + bcryptjs
- Render (deployment)
- MongoDB Atlas (database)

## 📁 Folder Structure
backend/

├── config/         # MongoDB connection

├── controllers/    # Business logic

├── middleware/     # JWT auth middleware

├── models/         # Mongoose schemas

├── routes/         # API routes

└── server.js


## 🔐 API Endpoints
### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/profile`
- PUT `/api/auth/profile/update`

### Jobs
- POST `/api/job/post`
- GET `/api/job/get`
- GET `/api/job/get/:id`
- GET `/api/job/getrecruiterjobs`
- DELETE `/api/job/delete/:id`

### Company
- POST `/api/company/register`
- GET `/api/company/get`
- GET `/api/company/get/:id`
- PUT `/api/company/update/:id`

### Application
- POST `/api/application/apply/:id`
- GET `/api/application/get`
- GET `/api/application/:id/applicants`
- PUT `/api/application/status/:id/update`

## 🚀 Run Locally
npm install

npm run dev

## ⚙️ Environment Variables
PORT=5000

MONGO_URI=your_mongodb_atlas_uri

JWT_SECRET=your_jwt_secret
