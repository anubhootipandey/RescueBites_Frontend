# 🍽️ RescueBites 

## Backend 

Welcome to the **RescueBites**! This RESTful API powers the RescueBites food donation platform, connecting donors with receivers, generating recipes using AI, and managing an admin panel with real-time data and a reward system.

---

### 🛠 Tech Stack

* **Node.js + Express.js** (REST API)
* **MongoDB + Mongoose** (NoSQL Database)
* **JWT Auth + Bcrypt** (Authentication & Security)
* **OpenAI API** (Recipe Generator)
* **Cloudinary (Optional)** (Image Uploads)
* **Deployed on**: Render

---

### 📁 Folder Structure Overview

```
backend/
├── config/              # MongoDB connection setup
├── controllers/         # Business logic for each module
├── middleware/          # Auth, error handlers, role checks
├── models/              # Mongoose schemas
├── routes/              # API route definitions
├── utils/               # Helper functions (JWT, OpenAI)
├── .env                 # Environment variables
└── server.js            # Entry point
```

---

### 🔐 Authentication (authController.js)

Handles user registration and login with hashed passwords.

#### Endpoints:

* `POST /api/auth/register` – Register user with name, email, password, role
* `POST /api/auth/login` – Login with email & password, returns JWT

#### Features:

* Password hashing with bcrypt
* Role-based auth: `donor`, `receiver`, `admin`
* Token generation with JWT

---

### 👤 User Model (User.js)

```js
name: String,
email: { type: String, unique: true },
password: String,
role: ['donor', 'receiver', 'admin'],
rewards: Number
```

---

### 🍽️ Donations (donationController.js)

Allows donors to add food, and receivers to claim it. Admins can view all.

#### Endpoints:

* `POST /api/donations` – Donor adds food (auth required)
* `GET /api/donations` – Public/receiver view of available food
* `PATCH /api/donations/:id/claim` – Receiver claims donation
* `GET /api/donations/mine` – Logged-in donor sees their donations

#### Features:

* Real-time donation list
* Status updates: `pending`, `claimed`, `delivered`
* Auto timestamps

#### Donation Schema:

```js
donor: ObjectId,
receiver: ObjectId,
food: String,
quantity: String,
status: 'pending' | 'claimed' | 'delivered',
location: String,
createdAt: Date
```

---

### 📦 Recipes (recipeController.js)

Generates recipes based on user input using OpenAI.

#### Endpoints:

* `POST /api/recipes` – Send ingredients → get back a recipe
* `GET /api/recipes/mine` – Get recipes created by user

#### Features:

* AI integration (OpenAI API)
* Saves prompt & result in DB

#### Recipe Schema:

```js
user: ObjectId,
ingredients: [String],
result: String
```

---

### 🏆 Rewards (rewardController.js)

Tracks points for user actions (donation, claiming, recipe creation).

#### Endpoints:

* `GET /api/rewards/user/:id` – Fetch rewards for user
* `POST /api/rewards/add` – Add points to user based on action

#### Reward Schema:

```js
user: ObjectId,
activity: String, // e.g. 'donated', 'claimed'
points: Number,
timestamp: Date
```

#### Notes:

* Users earn fixed or dynamic points per activity
* Admin can expand logic to redeem rewards

---

### 🧑‍💼 Admin (adminController.js)

Admin controls dashboard analytics, users, and donation stats.

#### Endpoints:

* `GET /api/admin/users` – List all users
* `GET /api/admin/stats` – Real-time insights: total donations, users, claimed
* `PATCH /api/admin/user/:id` – Update user roles

#### Features:

* Use role-based middleware `authorizeRoles('admin')`
* Aggregate data from DB in real time

---

### 🔐 Middleware

* **auth.js** – Verifies JWT, adds `req.user`
* **roles.js** – Restricts access based on role
* **error.js** – (optional) Express error handler

---

### 🔧 Utils

* `generateToken.js` – Signs a JWT with expiration
* `openaiHelper.js` – Sends POST to OpenAI with prompt

---

### 🌐 Environment Variables (.env)

```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
```

---

### 🧪 Testing API

Use Postman or Thunder Client:

* Register and login to get your JWT
* Add `Authorization: Bearer <token>` to test protected endpoints

---

### 🚀 Deployment Notes

* Deploy backend using Render
* MongoDB Atlas for live data
* Use `.env` with secure secrets

---
---

## Frontend 

---

### 🛠 Tech Stack

* **React.js** (via Vite)
* **TailwindCSS** (Responsive styling)
* **Framer Motion** (UI animations)
* **Axios** (API requests)
* **React Router DOM** (Routing)
* **React Hook Form + Yup** (Form validation)
* **React Context API** (Auth & global state)
* **Chart.js / Recharts** (Stats visualization)
* **Leaflet.js** (Location-based donation filtering)

---

### 📁 Folder Structure Overview

```
frontend/
├── public/                  # Static assets
├── src/
│   ├── assets/             # Images, logos, icons
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page-level components
│   ├── context/            # Auth and global state
│   ├── hooks/              # Custom hooks
│   ├── routes/             # App route definitions
│   ├── services/           # API interaction layer
│   ├── utils/              # Helper utilities
│   ├── App.jsx             # App entry component
│   └── main.jsx            # Vite main entry
├── .env                    # Environment variables
├── index.html
└── tailwind.config.js
```

---

### 🔐 Authentication Flow

* Uses JWT stored in localStorage
* React Context provides global auth state
* Role-based UI display: donor, receiver, admin
* Protected routes using custom `<PrivateRoute />`

---

### 🔄 Real-Time Data Rules

✅ All data must come from real user input or backend API calls:

* Food donations are submitted and fetched via API
* Recipes are generated dynamically from OpenAI API
* Reward system updates based on user activity
* No static JSON, hardcoded lists, or fake responses allowed

---

### 🧩 Key Pages

#### HomePage.jsx

* Intro to RescueBites
* Stats fetched from backend: meals donated, users helped, food saved

#### Login.jsx / Signup.jsx

* React Hook Form + Yup for validation
* Auth request to `/api/auth/*`

#### Dashboard.jsx (Role-based)

* Donor: add/view donations, view rewards
* Receiver: browse/claim donations
* Admin: analytics, user control, charts

#### DonateFood.jsx

* Form to submit food: name, type, quantity, location (via Leaflet map), expiry
* POSTs to `/api/donations`

#### ViewDonations.jsx

* Displays available food in real-time
* Claim button PATCHes to `/api/donations/:id/claim`

#### Recipes.jsx

* Input: ingredients as comma-separated values
* Output: real-time recipe from AI (OpenAI API)

#### Rewards.jsx

* Show user points and activities
* Leaderboard from real-time API

#### AdminPanel.jsx

* View all users, donations, stats
* Modify user roles and get insights from `/api/admin/stats`

---

### 🌐 Environment Variables (.env)

```
VITE_API_URL=https://rescuebites-backend.onrender.com/api
VITE_OPENAI_API_KEY=your_openai_key
```

---

### 📡 API Integration

Use **Axios** to interact with backend APIs. Set base URL via `.env`. Example:

```js
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

---
