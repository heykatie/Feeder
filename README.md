🍳 SousChef – Gamify Your Cooking Experience

SousChef is a modern, interactive recipe and meal planning application for your pet that brings fun to cooking! SousChef gamifies the cooking process, tracks culinary progress, and makes grocery shopping effortless.

⸻

🎯 Key Features

✅ Core Functionality
	•	Recipe Management (Full CRUD)
	•	Create, update, delete, and browse recipes.
	•	Auto-generate shopping lists from recipes.
	•	Upload recipe images using AWS S3.
	•	Shopping List Management (Full CRUD)
	•	Create, update, and share shopping lists.
	•	Generate ingredient lists automatically from selected recipes.
	•	XP & SousChef Evolution System
	•	Earn XP by engaging with the app (adding recipes, completing cooking tasks).
	•	Level up your SousChef pet avatar based on progress.

🔥 Upcoming Features
	•	Ratings & Reviews for recipes
	•	Favorites & Following (social features)
	•	Achievements & Badges for culinary milestones
	•	Real-time notifications
	•	AI-powered smart recipe suggestions
	•	Grocery delivery integration

⸻

🛠️ Tech Stack

Backend:
	•	Node.js with Express.js
	•	Sequelize ORM for database management
	•	PostgreSQL (Production) / SQLite3 (Development)
	•	Authentication: bcryptjs, JWT
	•	File Uploads: AWS S3 + Multer
	•	Security: csurf, helmet
	•	OAuth Integration: Google, Facebook, Discord, Apple

Frontend:
	•	React with Vite
	•	Redux for state management
	•	Framer Motion for animations
	•	React Beautiful DnD (Drag & Drop UI)
	•	React Toastify for notifications

⸻

🏗️ Installation & Setup

1️⃣ Clone the Repository

git clone [https://github.com/heykatie/souschef.git](https://github.com/heykatie/SousChef.git)
cd souschef

2️⃣ Backend Setup

cd backend
npm install
npm run dev

3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

4️⃣ Database Setup

npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all

5️⃣ Configure Environment Variables

Create a .env file in the backend directory with:

PORT=8000
DATABASE_URL=your_postgres_url
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=your_s3_bucket



⸻

📖 API Documentation
	•	SousChef API Docs
	•	RESTful API with authentication and protected routes

⸻

🎨 UI/UX Design
	•	Wireframes & UI Mockups
	•	Navigation:
	•	Top Navbar – Quick actions
	•	Left Sidebar – Primary navigation
	•	Right Sidebar – XP tracking & notifications
	•	Dark Mode Support (Planned)

⸻

🚀 Deployment
	•	Hosted on Render
	•	PostgreSQL database

⸻

👥 Contributors
	•	Your Name (@yourusername)
	•	Other Contributors

⸻

📜 License

SousChef is licensed under the MIT License.

⸻

🤝 Contributing

Contributions are welcome! Please follow these steps:
	1.	Fork the repository
	2.	Create a feature branch (feature-branch)
	3.	Commit your changes
	4.	Open a pull request

For major changes, open an issue to discuss.

⸻

🛠️ Issues & Support

If you encounter any issues or have feature requests, please open an issue.

⸻
