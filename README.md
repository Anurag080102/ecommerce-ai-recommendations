# ShopAI - E-Commerce Platform with AI Recommendations

> A full-stack e-commerce application featuring an AI-powered product recommendation engine, built with the MERN stack.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📌 About This Project

This is one of my favorite projects from my **ISEP Master's program (2024)**. I built this e-commerce platform during the summer to explore how AI-based recommendation systems work in real-world applications.

### What I Learned

- Designing and implementing a **content-based recommendation engine** from scratch
- Building **scalable RESTful APIs** with proper error handling and authentication
- Creating a **responsive, user-friendly frontend** with React hooks and context
- Working with **MongoDB** for efficient data modeling and queries
- Integrating frontend and backend in a **full-stack architecture**

### Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React.js, React Router, Context API, Axios |
| **Backend** | Node.js, Express.js, JWT Authentication |
| **Database** | MongoDB with Mongoose ODM |
| **AI/ML** | Jaccard Similarity Algorithm for recommendations |

### Key Highlights

- 🤖 **AI Recommendation Engine** — Suggests similar products based on tags, category, and price
- 🔐 **Secure Authentication** — JWT tokens with bcrypt password hashing
- 🛒 **Full Shopping Experience** — Browse, search, filter, cart, and checkout flow
- 📱 **Responsive Design** — Works seamlessly on desktop and mobile
- ⚡ **Clean Architecture** — Modular code structure for scalability

---

## Features

- **User Authentication** - Register/login with JWT tokens and encrypted passwords
- **Product Browsing** - Filter by category, search, sort by price/rating
- **Shopping Cart** - Add/remove items, quantity management, persisted in localStorage
- **AI Recommendations** - Content-based filtering using Jaccard similarity on product tags
- **Responsive Design** - Works on desktop and mobile

## Tech Stack

- **Frontend**: React.js, React Router, Axios, React Toastify
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT, bcryptjs

## AI Recommendation Engine

The recommendation system uses content-based filtering with three similarity metrics:

1. **Tag Similarity (60%)** - Jaccard similarity on product tags
2. **Category Match (20%)** - Boost for same category products  
3. **Price Similarity (20%)** - Products in similar price ranges

```javascript
// Jaccard similarity formula
similarity = intersection(tags) / union(tags)
```

## Setup Instructions

### Prerequisites
- Node.js v14+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repo
```bash
git clone https://github.com/Anurag080102/ecommerce-ai-recommendations.git
cd ecommerce-ai-recommendations
```

### 2. Setup Backend
```bash
cd server
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

### 3. Setup Frontend
```bash
cd ../client
npm install
```

### 4. Seed Database
```bash
cd ../server
npm run seed
```

### 5. Run the App
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Environment Variables

Create `server/.env`:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get all categories

### Recommendations
- `GET /api/recommendations/:productId` - Get AI recommendations
- `GET /api/recommendations/trending` - Get trending products

## Demo Credentials

After running seed script:
- Email: `admin@example.com`
- Password: `admin123`

## Project Structure

```
ecommerce-ai-recommendations/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── context/        # Auth & Cart context
│       └── api.js          # API configuration
├── server/                 # Express backend
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   └── data/               # Seed data
└── README.md
```

## License

MIT
