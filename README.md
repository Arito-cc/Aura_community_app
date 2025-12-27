
# 🟣 AURA | Full-Stack Community Discussion Hub

**AURA** is a high-performance, mobile-first community platform built with the **MERN stack**. It features a modern "OLED/Neon" aesthetic and a professional **Admin-Approval Hierarchy**. Unlike traditional forums, AURA supports **recursive comment threading**, hashtag-based discovery, and deep moderation tools.



---

## ✨ Key Features

### 🔐 Advanced Authentication & Security
- **Admin-Approval Hierarchy:** The first registered user becomes the "Root Admin." All subsequent admin registrations are locked and require manual verification via the Admin Dashboard.
- **Identity Protection:** Enforced unique constraints on usernames and emails.
- **JWT Authorization:** Secure, token-based sessions with `bcrypt.js` password encryption.

### 💬 Discussion & Engagement
- **Recursive Threading:** Infinite nested replies with visual "thread lines" for structured conversations.
- **Upvote System:** Reddit-style upvoting for both primary "Pulses" (posts) and comments.
- **Hashtag Discovery:** Auto-detects `#hashtags` and `@handles` for instant filtering.
- **Cascade Logic:** Intelligent database cleanup—deleting a post automatically wipes all associated comments.

### 🎨 Design & UI
- **OLED Aesthetic:** High-contrast black theme optimized for modern mobile displays.
- **Mobile-First Navigation:** Context-aware bottom navigation bar that changes based on user role.
- **Responsive Layout:** Adaptive 12-column grid for Desktop, Tablet (iPad), and Mobile.

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
1. **Clone the repo:**
   ```bash
   git clone [https://github.com/Arito-cc/Aura_community_app.git](https://github.com/Arito-cc/Aura_community_app.git)
   cd aura/backend

```

2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment:** Create a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

```


4. **Start Server:**
```bash
npm start

```



### 2️⃣ Frontend Setup (`/frontend`)

1. **Install dependencies:**
```bash
cd ../frontend
npm install

```


2. **Set API URL:** Ensure `src/api/axios.js` points to `http://localhost:5000/api`.
3. **Launch App:**
```bash
npm run dev

```



---

## 📖 API Documentation

### 👤 User & Admin

* `POST /api/users/register` - Create account (User or Admin).
* `POST /api/users/login` - Authenticate and receive token.
* `GET /api/users/pending-admins` - (Admin Only) List unverified admins.
* `PUT /api/users/approve-admin/:id` - (Admin Only) Grant system access.

### 📑 Topics (Pulses)

* `GET /api/topics` - Public feed with search/filter support.
* `POST /api/topics` - (Auth) Create new discussion.
* `PUT /api/topics/:id/upvote` - (Auth) Toggle upvote.
* `DELETE /api/topics/:id` - (Owner/Admin) Terminate pulse.

### 💬 Comments

* `GET /api/comments/:topicId` - Fetch full comment tree.
* `POST /api/comments/:topicId` - (Auth) Post comment or nested reply.
* `DELETE /api/comments/:id` - (Owner/Admin) Remove comment and its children.

---

## 👨‍💻 Author

**Abhishek Chaudhary**

* 📧 [contact.abhishek.cc@gmail.com](mailto:contact.abhishek.cc@gmail.com)
* 🔗 [LinkedIn](https://www.linkedin.com/in/contactabhishekcc) | [GitHub](https://github.com/Arito-cc)

---

## 🌟 Support

If you find the **AURA** architecture helpful, give this repo a ⭐!

```
