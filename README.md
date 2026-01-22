

```markdown
# JobBoard Project

A full-stack Job Board application built with:

- **Frontend:** React + TypeScript + Vite + TailwindCSS  
- **Backend:** Node.js + Express + TypeScript  
- **Database:** MongoDB (Atlas or local)  

This project demonstrates a complete job posting platform with a clean separation of frontend and backend.

---

## Project Structure

```

JobBoard/
├─ backend/              # Node.js + Express backend
│  ├─ src/
│  ├─ package.json
│  └─ ...
├─ frontend/             # React + Vite frontend
│  ├─ src/
│  ├─ package.json
│  └─ ...
├─ README.md
├─ package.json
├─ vite.config.ts
├─ tailwind.config.js
└─ ...

````

---

## Prerequisites

- Node.js **v20+** (required for Vite)  
- npm **v10+**  
- MongoDB (Atlas cloud database recommended)  
- VS Code (optional, for development)  
- Git  

---

## Clone the Repository

```bash
git clone https://github.com/SruthiK30/JobBoard
cd JobBoard
````

---

## Backend Setup

1. Go to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```bash
touch .env
```

Add the following variables :

```
MONGO_URI=your_mongodb_connection_string
PORT=4000
```


4. Run the backend:

```bash
npm run dev
```

---

## Frontend Setup

1. Go to the frontend folder:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend:

```bash
npm run dev
```

Vite will show:

```
Local:   http://localhost:5173/
Network: use --host to expose
```

---

## Running in GitHub Codespaces

1. Open the repo in **GitHub Codespaces**.
2. Upgrade Node.js if necessary:

```bash
nvm install 20
nvm use 20
nvm alias default 20
```

3. Follow **backend** and **frontend** setup steps.
4. In Codespaces, open the **Ports tab** and make ports **4000 (backend)** and **5173 (frontend)** public.
5. Open the links in browser → your JobBoard app will be live.

---

## References

* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* [Vite Documentation](https://vitejs.dev/)
* [React Documentation](https://reactjs.org/)
* [Node.js](https://nodejs.org/en/)

```

---
