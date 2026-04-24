# Blog Platform

A fullstack blog application built with Next.js on the frontend and Express.js on the backend. Users can register, log in, create and manage posts, leave comments, and send messages via a contact form.

---

## Tech Stack

### Frontend

| Tool                                        | Purpose                          |
| ------------------------------------------- | -------------------------------- |
| [Next.js](https://nextjs.org/) (App Router) | Framework & file-based routing   |
| [Zustand](https://zustand-demo.pmnd.rs/)    | Global auth state management     |
| [Zod](https://zod.dev/)                     | Form schema validation           |
| [Axios](https://axios-http.com/)            | HTTP client with JWT interceptor |

### Backend

| Tool                                                                      | Purpose                         |
| ------------------------------------------------------------------------- | ------------------------------- |
| [Express.js](https://expressjs.com/)                                      | REST API server                 |
| [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) | Database & data modeling        |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js)                          | Password hashing & salting      |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)                | JWT generation & verification   |
| [Nodemailer](https://nodemailer.com/)                                     | Contact form email delivery     |
| [dotenv](https://github.com/motdotla/dotenv)                              | Environment variable management |

---

## Project Structure

```
blog-platform/
├── frontend/                   # Next.js application
│   ├── app/
│   │   ├── layout.js           # Root layout with shared Navbar
│   │   ├── page.js             # Homepage
│   │   ├── blog/
│   │   │   ├── page.js         # All posts listing
│   │   │   ├── create/
│   │   │   │   └── page.js     # Create new post (protected)
│   │   │   └── [slug]/
│   │   │       ├── page.js     # Single post + comments
│   │   │       └── edit/
│   │   │           └── page.js # Edit post (protected)
│   │   ├── login/
│   │   │   └── page.js
│   │   ├── register/
│   │   │   └── page.js
│   │   ├── dashboard/
│   │   │   └── page.js         # Author dashboard (protected)
│   │   └── contact/
│   │       └── page.js
│   ├── store/
│   │   └── authStore.js        # Zustand auth store
│   └── utils/
│       └── api.js              # Axios instance + JWT interceptor
│
└── backend/                    # Express.js application
    ├── server.js               # Entry point
    ├── .env                    # Environment variables
    ├── models/
    │   ├── User.js
    │   ├── Post.js
    │   └── Comment.js
    ├── routes/
    │   ├── auth.js
    │   ├── posts.js
    │   ├── comments.js
    │   └── contact.js
    ├── controllers/
    │   ├── authController.js
    │   ├── postController.js
    │   ├── commentController.js
    │   └── contactController.js
    ├── middleware/
    │   └── authMiddleware.js
    └── utils/
        └── sendEmail.js        # Nodemailer helper
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Mailtrap](https://mailtrap.io/) account for email testing

---

### Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
```

Fill in your `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key

MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password
BLOG_OWNER_EMAIL=owner@example.com
```

```bash
# Start the backend server
npm run dev
```

The backend will be running at `http://localhost:5000`. Confirm it's working by visiting `GET /api/health`.

---

### Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be running at `http://localhost:3000`.

> Make sure the backend is running before starting the frontend, as all API calls point to `http://localhost:5000/api`.

---

## API Reference

### Auth

| Method | Endpoint             | Access    | Description                |
| ------ | -------------------- | --------- | -------------------------- |
| `POST` | `/api/auth/register` | Public    | Register a new user        |
| `POST` | `/api/auth/login`    | Public    | Log in, receive JWT        |
| `GET`  | `/api/users/profile` | Protected | Get logged-in user profile |

### Posts

| Method   | Endpoint           | Access                  | Description                                       |
| -------- | ------------------ | ----------------------- | ------------------------------------------------- |
| `GET`    | `/api/posts`       | Public                  | Get all published posts (supports `?tag=` filter) |
| `GET`    | `/api/posts/:slug` | Public                  | Get a single post by slug                         |
| `POST`   | `/api/posts`       | Protected               | Create a new post                                 |
| `PUT`    | `/api/posts/:id`   | Protected (author only) | Edit a post                                       |
| `DELETE` | `/api/posts/:id`   | Protected (author only) | Delete a post                                     |

### Comments

| Method   | Endpoint                  | Access                  | Description                 |
| -------- | ------------------------- | ----------------------- | --------------------------- |
| `GET`    | `/api/posts/:id/comments` | Public                  | Get all comments for a post |
| `POST`   | `/api/posts/:id/comments` | Protected               | Add a comment to a post     |
| `DELETE` | `/api/comments/:id`       | Protected (author only) | Delete a comment            |

### Contact

| Method | Endpoint       | Access | Description                      |
| ------ | -------------- | ------ | -------------------------------- |
| `POST` | `/api/contact` | Public | Send a message to the blog owner |

---

## Features

- **Authentication** — Register and log in with JWT-based sessions. Auth state is persisted to `localStorage` and managed globally with Zustand.
- **Blog Posts** — Create, read, edit, and delete posts. Posts have a title, content, excerpt, tags, and an auto-generated slug. Only the post author can edit or delete their own posts.
- **Comments** — Authenticated users can comment on any post. Authors can delete their own comments.
- **Author Dashboard** — A protected page where authors can view and manage all their posts in one place.
- **Contact Form** — Visitors can send a message to the blog owner. Messages are delivered to the owner's email via Nodemailer/Mailtrap.
- **Route Protection** — Protected pages redirect unauthenticated users back to `/login` using Zustand state checks and Next.js `useRouter`.
- **Form Validation** — All forms are validated on the client with Zod before any API request is made.

---

## Testing the API

You can test all backend endpoints using [Postman](https://www.postman.com/) or any REST client.

For protected routes, include the JWT in the request header:

```
Authorization: Bearer <your_token_here>
```

---

## License

This project was built for educational purposes.
