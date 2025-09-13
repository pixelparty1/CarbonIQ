🌍 Carbon Offset Marketplace

A web-based platform where users can calculate their emissions, offset them by funding projects (like planting trees, investing in solar, or supporting wind farms), and earn credits. The website promotes sustainability and supports multiple UN Sustainable Development Goals (SDGs).

✨ Features

🔐 User Authentication with Supabase

📊 Track Emissions from:

Electricity Bills ⚡

Travel/Transport 🚗

Petroleum ⛽

Waste Disposal 🗑️

🌱 Offset Projects

Plant trees 🌳

Fund solar panels ☀️

Support wind farms 🌬️

🎖️ Carbon Credits: Users earn credits when offsetting emissions.

📈 Transaction Tracking with a dedicated Supabase table.

🎯 Aligned with SDGs – Clean Energy, Climate Action, Sustainable Cities, Responsible Consumption, and more.

⚡ Tech Stack

Frontend: React + Vite

Backend: Supabase (Auth + Database + RLS Policies)

Styling: Tailwind CSS

Hosting: (GitHub Pages / Vercel / Netlify – update based on where you host)

📂 Project Structure
├── src
│   ├── components    # Reusable UI components
│   ├── pages         # Website pages
│   ├── utils         # Helper functions
│   ├── supabase.ts   # Supabase client setup
│   └── App.tsx       # Main app entry
├── public            # Static assets
├── .env              # Environment variables (ignored by git)
├── .gitignore
└── README.md

🔑 Environment Variables

Create a .env file in the root with:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key


⚠️ Never commit .env – it’s already ignored by .gitignore.

🚀 Getting Started

Clone the repository

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name


Install dependencies

npm install


Run locally

npm run dev


Build for production

npm run build

🌱 Impact & SDGs

This project contributes to the following UN Sustainable Development Goals:

Affordable & Clean Energy

Sustainable Cities & Communities

Climate Action

Responsible Consumption & Production

Life on Land