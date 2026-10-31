# 📚 EduHub – Global Educational Platform

A clean, modern, full-stack educational platform where learners and educators can share knowledge and grow together.

**Frontend + Backend integrated and ready to deploy.**

---

## ✨ Features

- **Browse Resources** – View community-shared educational materials
- **Share Knowledge** – Submit new resources (title, category, description, type)
- **Contact Form** – Messages are saved to the database
- **Dark / Light Mode** – Persistent theme toggle
- **Responsive Design** – Works on mobile, tablet, and desktop
- **RESTful API** – Users, Resources, and Contact endpoints
- **MongoDB** – Persistent data storage

---

## 🛠️ Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | HTML5, CSS3, Vanilla JS |
| Backend   | Node.js, Express        |
| Database  | MongoDB (Mongoose)     |
| Other     | CORS, dotenv, Morgan    |

---

## 📁 Project Structure

```
GizachewH/
├── package.json
├── .env.example
├── .gitignore
├── README.md
├── server.js                 # Entry point – serves API + static frontend
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   ├── Resource.js
│   └── Contact.js
├── controllers/
│   ├── userController.js
│   ├── resourceController.js
│   └── contactController.js
├── routes/
│   ├── userRoutes.js
│   ├── resourceRoutes.js
│   └── contactRoutes.js
└── public/                   # Frontend (served by Express)
    ├── index.html
    ├── styles.css
    └── script.js
```

---

## 🚀 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/GizachewL/GizachewH.git
cd GizachewH
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set your MongoDB connection string:

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/eduhub?retryWrites=true&w=majority
NODE_ENV=development
```

> Free MongoDB Atlas: https://www.mongodb.com/cloud/atlas

### 4. Run the server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Open **http://localhost:5000** in your browser.

---

## 📡 API Endpoints

### Resources
| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| GET    | `/api/resources`      | List all resources   |
| GET    | `/api/resources?category=tech` | Filter by category |
| POST   | `/api/resources`      | Create a resource    |
| GET    | `/api/resources/:id`  | Get one resource     |
| DELETE | `/api/resources/:id`  | Delete a resource    |

### Contact
| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| POST   | `/api/contact`   | Submit contact form    |
| GET    | `/api/contact`   | List all messages      |

### Users
| Method | Endpoint           | Description     |
|--------|--------------------|-----------------|
| GET    | `/api/users`       | List users      |
| POST   | `/api/users`       | Create user     |
| GET    | `/api/users/:id`   | Get one user    |
| DELETE | `/api/users/:id`   | Delete user     |

---

## 🌐 Deploy

### Option 1 – Render (Recommended)

1. Push this repo to GitHub (already done).
2. Go to [render.com](https://render.com) → New → Web Service.
3. Connect the repository.
4. Settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Add `MONGO_URI` and `NODE_ENV=production`
5. Deploy.

### Option 2 – Railway

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Add environment variables (`MONGO_URI`, `PORT`)
4. Deploy.

### Option 3 – Any Node host (Heroku, Fly.io, DigitalOcean App Platform, etc.)

Same pattern: install dependencies, set `MONGO_URI`, run `npm start`.

> The Express server serves both the API **and** the static frontend from the `public/` folder, so one service is enough.

---

## 🎨 Theme

Professional green color scheme (`#10b981`) for a calm, educational feel. Dark mode supported.

---

## 📄 License

MIT

---

Made with ❤️ by GizachewL
