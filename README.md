Clothing Brand E-Commerce (MERN) — README

Simple, functional MERN e-commerce app for a fictional clothing brand.
Backend-first focus (authentication, products, cart, orders, Nodemailer). Frontend is minimal React (Vite) to demo features.

Project structure
clothing-ecommerce/
├─ backend/        # Express + MongoDB backend (APIs, models, seed)
└─ frontend/       # React (Vite) frontend (pages, contexts, components)

Quick features

User register / login (bcrypt + JWT stored in HTTP-only cookie)

Products catalog (seeded, min 20 items): name, desc, price, image, category, sizes, stock

Search + filters (category, size, price range) + pagination

Shopping cart (per user; guest cart stored in localStorage and merged on login)

Mock checkout → saves Order in MongoDB and sends order confirmation email via Nodemailer

Basic error handling and auth middleware

Requirements

Node.js v18+

npm

MongoDB (Atlas or local)

Optional: Mailtrap / Gmail app password for email testing

Backend — Setup & run

Open terminal:

cd clothing-ecommerce/backend
npm install


Create .env in backend/ with these variables (example):

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173   # or http://localhost:3000 if using CRA
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_mailtrap_creds
NODE_ENV=development


Seed products (creates 20 demo products):

npm run seed


Start dev server:

npm run dev


Server runs by default on http://localhost:5000 and API base is http://localhost:5000/api.

Important backend scripts (in backend/package.json)

npm run dev — start server with nodemon

npm run start — start server (node)

npm run seed — seed demo products

Frontend — Setup & run

Open a new terminal:

cd clothing-ecommerce/frontend
npm install


Add .env in frontend/:

VITE_API_URL=http://localhost:5000/api


Start dev server:

npm run dev


Open the Vite URL printed in terminal (default http://localhost:5173).

Key API endpoints (backend)

POST /api/auth/register — register { name, email, password }

POST /api/auth/login — login { email, password, guestCart } (guestCart optional for merge)

POST /api/auth/logout — logout (clears cookie)

GET /api/auth/me — get current user (protected)

GET /api/products — list with query params: search, category, size, minPrice, maxPrice, page, limit

GET /api/products/:id — single product

GET /api/cart — get logged-in user's cart (protected)

POST /api/cart/add — add item { productId, size, qty } (protected)

PUT /api/cart/update — overwrite items { items: [{ product, size, qty }] } (protected)

DELETE /api/cart/remove — remove { productId, size } (protected)

POST /api/orders — place order { shippingAddress } (protected)

GET /api/orders/:id — get order (protected)

Notes on auth & cart flow

Login sets an HTTP-only token cookie (JWT). Protected routes read token from cookie or Bearer header.

Guest cart: saved in localStorage on frontend. When logging in, the frontend passes guestCart to /auth/login to merge into the DB cart.

Cart is stored per-user in the DB (Cart model). Guest cart will be merged into DB on login.

Email (Nodemailer)

By default uses Gmail (service: 'gmail') in backend/utils/sendEmail.js. For development, Mailtrap or SendGrid recommended.

If using Gmail with 2FA, create an App Password and use it in EMAIL_PASS.

Email includes:

Order ID

Order date

Items (name, size, qty, price)

Total amount

Testing checklist

Start backend and frontend.

GET /api/products — confirm seeded products.

Register user → inspect users collection in MongoDB.

Login → verify cookie set; call /api/auth/me to confirm.

Add items to cart as guest (localStorage) → login with guestCart merged → check DB cart.

Place order → check orders collection and confirm email sent (check Mailtrap/Gmail).

Test filters + pagination: /api/products?category=Men&size=M&minPrice=100&maxPrice=2000&page=1&limit=10

Deployment tips

Backend: set env vars on host (Railway/Render/Heroku). Use production NODE_ENV and secure cookies (set secure: true).

Frontend: deploy to Vercel/Netlify; set VITE_API_URL to production backend API URL.

Use a transactional email provider (SendGrid, Mailgun) for production emails.

Known improvements (nice-to-have, not required)

Input validation with express-validator or Joi

Rate limiting (express-rate-limit)

Admin endpoints to add/edit products

Use Cloudinary for product images

Add tests (Jest / Supertest) and E2E (Playwright)

Contact / next steps

If you want, I can:

Add README deployment instructions for a specific host (Railway / Render / Vercel)

Add express-validator validations or rate-limiting to backend

Create a short POSTMAN collection for quick API testing

