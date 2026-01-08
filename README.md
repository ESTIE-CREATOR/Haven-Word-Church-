# Haven Word Church Website

A modern, production-ready church website built with Next.js 14, Supabase, and Tailwind CSS.

## Features

- **Public Website**: Home, Messages (Video/Audio), Locations, About, Events, Giving, Testimonies, Contact
- **Admin Dashboard**: Secure admin panel with role-based access control (admin, media, finance)
- **YouTube Video System**: All videos hosted on YouTube, no local video storage
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Motion Animations**: Framer Motion animations with reduced-motion support
- **Responsive Design**: Mobile-first, fully responsive across all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (Postgres + Auth + Storage)
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Maps**: Leaflet + OpenStreetMap

## Prerequisites

- Node.js 18+ and npm
- Supabase account and project

## Setup Instructions

### 1. Clone and Install

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at https://supabase.com
2. Go to SQL Editor and run the schema file:
   ```bash
   # Run supabase/schema.sql
   ```
3. Run the RLS policies file:
   ```bash
   # Run supabase/rls-policies.sql
   ```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SITE_NAME="HAVEN WORD CHURCH"
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
RESEND_API_KEY=your_resend_api_key
```

### 4. Create Admin User

1. Go to Supabase Dashboard > Authentication > Users
2. Create a new user with email and password
3. Go to SQL Editor and run:
   ```sql
   INSERT INTO user_roles (user_id, role)
   VALUES ('user-uuid-here', 'admin');
   ```
   Replace `user-uuid-here` with the actual user ID from the auth.users table.

### 5. Seed Data (Optional)

Run the seed script to populate initial data:

```bash
# Create a seed script in scripts/seed.ts
npm run seed
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access

- Admin dashboard: `/admin`
- Login page: `/admin/login` (ONLY login page - not linked on public site)
- Admin users must be created manually in Supabase Auth dashboard
- Each admin user must have a role assigned in the `user_roles` table

## Roles

- **admin**: Full access to all admin features
- **media**: Manage audio & video messages only
- **finance**: View giving records only

## Project Structure

```
app/
├── (public)/          # Public routes
├── admin/             # Admin routes (protected)
├── api/               # API routes
components/
├── ui/                # shadcn/ui components
├── motion/            # Motion primitives
lib/
├── supabase/         # Supabase client & queries
├── utils/            # Utility functions
supabase/
├── schema.sql        # Database schema
└── rls-policies.sql  # Row Level Security policies
```

## YouTube Video System

- All videos are hosted ONLY on YouTube
- Admin adds videos by pasting YouTube URL
- Automatically extracts video ID and thumbnail
- No video file uploads
- All views count on YouTube

## Brand Colors

- Primary: Deep Blue (#1e3a8a)
- Secondary: Bright Orange (#ff6b35)
- Accent: Gold (#fbbf24)
- White (#ffffff)

## Building for Production

```bash
npm run build
npm start
```

## License

Copyright © 2024 Haven Word Church. All rights reserved.


