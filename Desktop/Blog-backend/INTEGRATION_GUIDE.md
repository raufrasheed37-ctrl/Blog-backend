# Frontend & Backend Integration Guide

## Setup Complete ✅

Your Next.js frontend is now connected to your Node.js/Express backend!

---

## Quick Start

### 1. Start Both Servers

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
# Running on http://localhost:5000
```

**Frontend (Terminal 2):**
```bash
cd frontend-blog
npm run dev
# Running on http://localhost:3000
```

---

## Usage Examples

### Example 1: Fetch All Posts

```jsx
import { useEffect, useState } from 'react';
import { postsAPI } from '@/utils/api';

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { posts } = await postsAPI.getAll();
        setPosts(posts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
```

---

### Example 2: Create a Post with Image

```jsx
import { useState } from 'react';
import { postsAPI } from '@/utils/api';

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '', // User ID from auth
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await postsAPI.create(formData, file);
      console.log('Post created:', response);
      // Show success message
    } catch (error) {
      console.error('Failed to create post:', error);
      // Show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
}
```

---

### Example 3: User Login

```jsx
import { useState } from 'react';
import { authAPI } from '@/utils/api';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { token, user } = await authAPI.login({ email, password });
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Store user in state/zustand store
      console.log('Logged in:', user);
      
      // Redirect to dashboard
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

---

### Example 4: Using the useApi Hook

```jsx
import { useApi } from '@/hooks/useApi';
import { postsAPI } from '@/utils/api';

export default function FeaturedPosts() {
  const { data: posts, loading, error } = useApi(
    () => postsAPI.getFeatured(5),
    true // Auto-execute on mount
  );

  if (loading) return <div>Loading featured posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {posts?.map((post) => (
        <article key={post._id}>
          <h2>{post.title}</h2>
          <img src={post.coverImage} alt={post.title} />
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

---

## Available API Methods

### Posts
- `postsAPI.getAll(limit, skip, featured)` - Get all posts
- `postsAPI.getFeatured(limit)` - Get featured posts
- `postsAPI.getById(id)` - Get single post
- `postsAPI.getByAuthor(authorId)` - Get posts by author
- `postsAPI.create(data, file)` - Create post with optional image
- `postsAPI.update(id, data)` - Update post
- `postsAPI.delete(id)` - Delete post

### Auth
- `authAPI.register(data)` - Register new user
- `authAPI.login(data)` - Login user
- `authAPI.getMe()` - Get current user
- `authAPI.updateMe(data)` - Update the logged-in user's public profile fields

### Authors
- `authorsAPI.getById(authorId)` - Get a public author profile

---

## Public Author Profile

Use this for author detail pages that anyone can view.

### Get a Public Profile

```http
GET /api/authors/:authorId
```

Response shape:

```json
{
  "author": {
    "_id": "...",
    "id": "...",
    "name": "Jane Doe",
    "bio": "Writer and editor",
    "avatar": "https://...",
    "coverImage": "https://...",
    "location": "Lagos, Nigeria",
    "website": "https://...",
    "socialLinks": {
      "twitter": "https://twitter.com/...",
      "linkedin": "https://linkedin.com/in/...",
      "github": "https://github.com/...",
      "instagram": "https://instagram.com/..."
    }
  },
  "stats": {
    "publishedPostCount": 12
  },
  "recentPosts": []
}
```

### Update the Current User Profile

```http
PUT /api/auth/me
Authorization: Bearer <token>
Content-Type: application/json
```

Example body:

```json
{
  "name": "Jane Doe",
  "bio": "Writer and editor",
  "avatar": "https://...",
  "coverImage": "https://...",
  "location": "Lagos, Nigeria",
  "website": "https://...",
  "socialLinks": {
    "twitter": "https://twitter.com/...",
    "linkedin": "https://linkedin.com/in/...",
    "github": "https://github.com/...",
    "instagram": "https://instagram.com/..."
  }
}
```

The frontend can use `GET /api/authors/:authorId` for public author pages and `PUT /api/auth/me` for the author dashboard edit form.

### Comments
- `commentsAPI.getByPost(postId)` - Get post comments
- `commentsAPI.create(data)` - Create comment
- `commentsAPI.update(id, data)` - Update comment
- `commentsAPI.delete(id)` - Delete comment

### Contact
- `contactAPI.send(data)` - Send contact form

---

## Environment Variables

Add these to `frontend-blog/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

For production, update to your live backend URL:
```
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

---

## Auth Flow (with Zustand)

**Create a store for auth:**

```javascript
// store/authStore.js
import { create } from 'zustand';
import { authAPI } from '@/utils/api';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  
  login: async (email, password) => {
    const { token, user } = await authAPI.login({ email, password });
    localStorage.setItem('token', token);
    set({ token, user });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
  
  register: async (name, email, password) => {
    const { token, user } = await authAPI.register({ name, email, password });
    localStorage.setItem('token', token);
    set({ token, user });
  },
}));
```

**Use in components:**

```jsx
import { useAuthStore } from '@/store/authStore';

export default function LoginButton() {
  const { user, logout } = useAuthStore();
  
  if (!user) {
    return <button>Login</button>;
  }
  
  return (
    <div>
      <span>Welcome, {user.name}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## CORS Configuration

The backend has CORS enabled for all origins by default. For production, update `backend/server.js`:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true,
}));
```

---

## Troubleshooting

**"Cannot reach backend" error:**
- ✅ Ensure backend is running on http://localhost:5000
- ✅ Check `NEXT_PUBLIC_API_URL` in `.env.local`
- ✅ Verify firewall isn't blocking port 5000

**"Invalid author id" when creating posts:**
- ✅ Use a valid user ID from your database
- ✅ Register/login a user first to get the user ID

**CORS errors:**
- ✅ Backend CORS is enabled globally (development mode)
- ✅ For production, configure specific origins in backend

---

## Next Steps

1. Create Zustand stores for global state (auth, posts, etc.)
2. Build reusable components (PostCard, AuthForm, etc.)
3. Add error boundaries and loading states
4. Set up API request/response interceptors for logging
5. Add input validation with Zod
6. Deploy frontend and backend to production

---

Happy coding! 🚀
