# 🔐 Authentication-Based Task Management System

A full-stack task management application built using the MERN stack with secure authentication, role-based access control, and project/task organization.

The system allows users to securely register, log in, manage tasks, and maintain an organized workflow through protected routes and authentication.

---

## 🚀 Features

### Authentication & Security

* User Registration & Login
* JWT Authentication
* Cookie-based session handling
* Protected routes
* Backend authentication verification
* Secure logout

---

## 📋 Task Management

### User Features

* Create tasks
* View tasks
* Update task details
* Delete tasks
* Track task status

### Task Workflow

* Create → Manage → Update → Complete

### Dashboard

* Personalized user dashboard
* Authentication-based access
* Organized task display

---

## 🔐 Access Control

* Secure user authentication
* Session validation
* Authorization middleware
* Route protection

---

## 🛠 Tech Stack

### Frontend

* React.js
* Redux
* HTML
* CSS
* JavaScript
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* JWT
* Cookies

---

## 🏗 System Architecture

```text
Frontend (React)
      ↓
API Requests

Backend (Node.js + Express)
      ↓
JWT Authentication
      ↓
Controllers
      ↓
MongoDB
```

---

## 📸 Screenshots

<img width="1918" height="900" alt="Screenshot 2026-06-17 003316" src="https://github.com/user-attachments/assets/0c5ffe70-7e15-4e09-823d-f86919d63533" />


---

## ⚙️ Installation

Clone repository

```bash
git clone YOUR_REPOSITORY_URL
```

Install dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

Run backend

```bash
npm start
```

---

## 🔑 Environment Variables

Create `.env`

```env
PORT=
MONGODB_URI=
JWT_SECRET=
CLIENT_URL=
NODE_ENV=
```

---

## 📁 Project Structure

```text
client/
 ├── src
 ├── pages
 ├── components

server/
 ├── routes
 ├── controllers
 ├── middleware
 ├── models
 └── utils
```

---

## 💡 Key Learnings

This project helped me understand:

* Authentication flow using JWT
* Cookie-based authorization
* Backend middleware architecture
* Protected routes
* API design
* State management
* Building secure applications

---

## 🚀 Future Improvements

* Role-based permissions
* Team collaboration
* Task reminders
* Notifications
* Analytics dashboard
* Real-time updates

---

## 👨‍💻 Author

Anurag Singh

GitHub:
https://github.com/AnuragSingh-git
