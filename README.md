# ElectroShop — E-commerce App

React frontend + Express API + MongoDB.

## Local development

### 1. Backend
```bash
cd backend
cp .env.example .env
# Edit .env — add MongoDB URI and JWT_SECRET
npm install
npm run dev
```

### 2. Frontend
```bash
npm install
npm run dev
```

Open `http://localhost:5173`

**Admin login:** `admin@electroshop.com` / `admin123`

---

## Deploy to GitHub

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

Repo: https://github.com/abdifatahabdiwahab90/Electronic-E-comerci

---

## Deploy frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo `Electronic-E-comerci`
3. Settings:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. **Environment Variable:**
   - `VITE_API_URL` = `https://YOUR-API-URL.onrender.com/api`
5. Click **Deploy**

> Vercel hosts the frontend only. The API must be deployed separately (see below).

---

## Deploy backend → Render (free)

1. Create [MongoDB Atlas](https://www.mongodb.com/atlas) free cluster
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect the same GitHub repo
4. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Environment variables:
   - `MONGODB_URI` — your Atlas connection string
   - `JWT_SECRET` — long random string
   - `CLIENT_ORIGIN` — your Vercel URL (e.g. `https://electronic-e-comerci.vercel.app`)
6. Deploy, then copy the Render URL into Vercel as `VITE_API_URL`

---

## Project structure

```
├── src/           React frontend
├── backend/       Express API
├── vercel.json    SPA routing for Vercel
└── package.json
```
