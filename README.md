# Airbnb-Inspired Application

A full-stack application built with the MERN stack (MongoDB, Express.js, React, Node.js) for browsing, booking, and managing property listings.

---

## Features
- MongoDB database with Mongoose for data storage
- User authentication with JWT and bcrypt
- Browse and fetch property listings
- Create and view bookings
- Role-based registration (hosts or guests)
- Hosts can add, manage, and delete their listings
- Hosts can view bookings for their properties
- Mini admin panel to manage listings and bookings
- Secure backend with role-based access control
- Responsive frontend with signup/login pages
- State management using JWT in localStorage
- Clean styling and user feedback

---

## Technologies
- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Styling**: [Tailwind CSS or CSS Modules]

---

## Roles and Permissions

The application supports three user roles, each with specific capabilities:

- **Guest**:
  - Browse property listings
  - Make bookings
  - View their own booking history

- **Host**:
  - All guest capabilities
  - Add, manage, and delete their own property listings
  - View bookings for their properties

- **Admin**:
  - All host capabilities
  - Manage all listings (add, view, delete)
  - View all bookings across the platform

---

## Setup
1. Clone the repo: `git clone https://github.com/yourusername/yourrepo.git`
2. Install backend: `cd backend && npm install`
3. Install frontend: `cd ../frontend && npm install`
4. Add `.env` in `backend`:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```
5. Run backend: `cd backend && npm start`
6. Run frontend: `cd frontend && npm start`
7. Visit `http://localhost:3000`

## API Endpoints
- **POST /api/auth/register**: `{ "username": "", "password": "", "role": "host" | "guest" }`
- **POST /api/auth/login**: `{ "username": "", "password": "" }`
- **GET /api/listings**: Fetch all listings
- **POST /api/bookings**: `{ "propertyId": "", "userId": "", "dates": {} }`
- **POST /api/host/listings**: Add listing (host only)
- **GET /api/host/bookings**: View host bookings
- **GET /api/admin/listings**: View all listings (admin only)

---

## Notes
- Requires MongoDB setup
- Protected routes redirect to login
- User feedback on actions

  
---


