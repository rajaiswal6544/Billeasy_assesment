# 📚 Book Review RESTful API

A simple Book Review API built using **Node.js**, **Express.js**, **MongoDB**, and **JWT-based Authentication**.

This API allows users to sign up, log in, add/search books, and submit reviews.

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Token) for authentication
- dotenv for environment variables

---


## 📁 Project Structure

```

book-review-api/
│
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── reviewController.js
│
├── models/
│   ├── User.js
│   ├── Book.js
│   └── Review\.js
│
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── reviewRoutes.js
│
├── middlewares/
│   └── authMiddleware.js
│
├── .env
├── app.js
├── server.js
├── package.json
└── README.md

````

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/rajaiswal6544/Billeasy_assesment.git
cd book-review-api
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory with the following content:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bookreview
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the Server

```bash
npm run dev
```

---

## 🔐 Authentication

### 🔸 POST `/signup`

Register a new user.

```json
{
  "username": "raj",
  "email": "raj@example.com",
  "password": "password123"
}
```

### 🔸 POST `/login`

Log in and receive a JWT token.

```json
{
  "email": "raj@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "token": "your_jwt_token"
}
```

---

## 📚 Books Endpoints

### 🔸 POST `/books` (Auth required)

Add a new book.

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self-help",
  "description": "A guide to habit building."
}
```

### 🔸 GET `/books`

Retrieve all books with optional filters and pagination.

Query params:

* `page`
* `limit`
* `author`
* `genre`

### 🔸 GET `/books/:id`

Get book details by ID (includes average rating and paginated reviews).

---

## ✍️ Review Endpoints

### 🔸 POST `/books/:id/reviews` (Auth required)

Submit a review for a book (1 per user per book).

```json
{
  "rating": 5,
  "comment": "Great read!"
}
```

### 🔸 PUT `/reviews/:id` (Auth required)

Update your own review.

```json
{
  "rating": 4,
  "comment": "Changed my opinion, still good!"
}
```

### 🔸 DELETE `/reviews/:id` (Auth required)

Delete your own review.

---

## 🔍 Search Endpoint

### 🔸 GET `/search`

Search books by title or author (partial and case-insensitive).

Example:

```
GET /search?query=habit
```

---

## 🔐 Auth Header for Protected Routes

For POST/PUT/DELETE on protected routes, include:

```
Authorization: Bearer <your_token>
```

---

## 📄 Design Decisions / Assumptions

* A user can only review a book once.
* Pagination is applied to both books and reviews.
* Search uses regex for partial matches (case-insensitive).
* Users can only edit/delete their own reviews.
* All protected routes check for valid JWT tokens.

---

## 🧪 Testing

Example `curl` request:

```bash
curl -X POST http://localhost:3000/books \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Atomic Habits","author":"James Clear","genre":"Self-help","description":"A guide to habit building."}'
```

---

## 🗃️ Database Schema

### User

```js
{
  username: String,
  email: String,
  password: String (hashed)
}
```

### Book

```js
{
  title: String,
  author: String,
  genre: String,
  publishedYear:Number (Timestamps)
}
```

### Review

```js
{
  user: ObjectId (ref: 'User'),
  book: ObjectId (ref: 'Book'),
  rating: Number (1 to 5),
  comment: String
}
```

---


## 👤 Author

**Raj Jaiswal**

GitHub: [https://github.com/rajaiswal6544](https://github.com/rajaiswal6544)

---

