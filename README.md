# Fight Feed - Boxing & MMA News App

A simple Boxing and MMA news app that updates itself using the GNews API.

## What it does

- Shows Boxing and MMA news
- Has tabs for All, Boxing and MMA
- Refreshes automatically every 10 minutes while open
- Pulls live articles from a news API
- Works as a web app and can later be turned into an iPhone/Android app

## Setup

1. Install Node.js
2. Get a free GNews API key from gnews.io
3. Copy `.env.example` and rename it to `.env`
4. Add your API key:
   GNEWS_API_KEY=your_key_here
5. Open Terminal in this folder
6. Run:
   npm install
   npm start
7. Open:
   http://localhost:3000

## Next upgrades

- Push notifications
- Fighter search
- Save favourite articles
- Admin panel
- App Store / Google Play version using React Native or Flutter