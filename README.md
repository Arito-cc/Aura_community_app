# 🟣 AURA | Full-Stack Community Discussion Hub

**AURA** is a high-performance, mobile-first community platform built with the **MERN stack**. It features a modern "OLED/Neon" aesthetic and a professional **Admin-Approval Hierarchy**. Unlike traditional forums, AURA supports **recursive comment threading**, hashtag-based discovery, and deep moderation tools.



---

## 🌐 Live Links & Test Credentials

### 🔗 Live Demo  
**Frontend:** [https://aura-app-s7cl.onrender.com/](https://aura-app-s7cl.onrender.com/)  
**Backend API:** [https://aura-backend-mtth.onrender.com/](https://aura-backend-mtth.onrender.com/)

### 🧪 Test Credentials  
You can log in using:  
**User:** `test_user`  
**Password:** `password123`  

Or simply create your own account!

---

## ✨ Key Features

### 🔐 Advanced Authentication & Security
- **Admin-Approval Hierarchy:** The first registered user automatically becomes the "Root Admin." All subsequent admin registrations are locked and require manual verification via the Admin Dashboard.
- **Environment Security:** API endpoints and sensitive keys are hidden from the frontend using `.env` variables and cross-origin security.
- **JWT Authorization:** Secure, token-based sessions with `bcrypt.js` password encryption.

### 💬 Discussion & Engagement
- **Recursive Threading:** Infinite nested replies with a visual "thread line" for structured conversations on mobile and desktop.
- **Upvote System:** Reddit-style upvoting for both primary "Pulses" (posts) and comments.
- **Hashtag Discovery:** Auto-detects `#hashtags` and `@handles` for instant filtering through MongoDB regex aggregation.
- **God-Mode Moderation:** Admins have global permission to terminate any pulse or comment to keep the community safe.

### 📱 Mobile-First Design
- **Adaptive UI:** Custom mobile bottom navigation bar that shifts icons based on user roles (Admin vs User).
- **OLED Aesthetic:** High-contrast pitch-black theme optimized for modern smartphone displays.
- **Cascade Deletion:** Intelligently removes orphaned comments when a parent topic is deleted.

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | React 18 (Vite), Tailwind CSS 4+, Lucide Icons, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Auth** | JSON Web Tokens (JWT), Bcrypt.js |
| **State** | React Context API |

---

## 🏁 Installation & Setup

### 1️⃣ Backend Setup (`/backend`)
1. **Clone and Install:**
```bash
git clone [https://github.com/Arito-cc/Aura_community_app.git](https://github.com/Arito-cc/Aura_community_app.git)
cd aura/backend
npm install
```

2. **Configure `.env`:**
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173

```


3. **Run:** `npm start`

### 2️⃣ Frontend Setup (`/frontend`)

1. **Install and Build:**
```bash
cd ../frontend
npm install

```


2. **Configure `.env`:**
```env
VITE_API_BASE_URL=[https://your-backend-url.onrender.com/api](https://your-backend-url.onrender.com/api)

```


3. **Run:** `npm run dev`

---

## 📖 API Architecture

### 🛡️ Admin & User Logic

* `POST /api/users/register` - Create account (Roles: `user`, `admin`).
* `PUT /api/users/approve-admin/:id` - (Admin Only) Approve a pending admin account.
* `GET /api/users/pending-admins` - (Admin Only) View verification queue.

### 📑 Topic & Comment Logic

* `GET /api/topics?search=` - Aggregated feed (Supports `@user` and `#tag`).
* `PUT /api/topics/:id/upvote` - Toggle pulse upvote.
* `POST /api/comments/:topicId` - Post a root comment or a nested reply (using `parentId`).
* `DELETE /api/comments/:id` - (Owner/Admin) Cascade delete comment thread.

---

## 👨‍💻 Author

**Abhishek Chaudhary**

* 📧 [contact.abhishek.cc@gmail.com](mailto:contact.abhishek.cc@gmail.com)
* 🔗 [LinkedIn](https://www.linkedin.com/in/contactabhishekcc) | [GitHub](https://github.com/Arito-cc)

---

## 🌟 Support

If you find the **AURA** architecture helpful for your own projects, give this repository a ⭐!
