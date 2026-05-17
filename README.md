# ServiceBoard

ServiceBoard is a full-stack web application that allows users to browse and post local service requests (e.g., Plumbing, Electrical, Carpentry). It features a robust Next.js frontend and an Express/MongoDB backend with JWT authentication.

## Repository Structure
- `/frontend` - Next.js (App Router) application with Tailwind CSS for styling.
- `/backend` - Node.js/Express REST API connected to MongoDB.

---

## 🛠️ Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)

### 1. Clone the repository
Ensure you have cloned or downloaded the project repository to your local machine.

### 2. Environment Variables

#### Backend (`/backend/.env`)
Create a `.env` file in the `/backend` directory and add the following variables:
```env
# The port your backend server will run on
PORT=5000

# Your MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/serviceBoard

# Secret key for signing JSON Web Tokens
JWT_SECRET=your_super_secret_jwt_key
```

#### Frontend (`/frontend/.env` or `/frontend/.env.local`)
Create a `.env.local` file in the `/frontend` directory and add the following variable:
```env
# URL for the backend API
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🚀 Run Instructions

### Starting the Backend
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. (Optional) Seed the database with sample jobs:
   ```bash
   node seed.js
   ```
4. Start the server:
   ```bash
   node server.js
   ```
   *The backend should now be running on `http://localhost:5000`.*

### Starting the Frontend
1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *The frontend should now be running on `http://localhost:3000`.*

---

## 🧪 Testing

The backend includes a comprehensive Jest test suite for the API endpoints.

To run the unit tests:
```bash
cd backend
npm test
```

## 🔐 Authentication

To test posting or deleting jobs on the frontend, you must be logged in. You can use the built-in test credentials on the `/login` page:
- **Username:** `admin`
- **Password:** `password`
