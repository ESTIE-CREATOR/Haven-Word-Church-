# Quick Setup Checklist

## ✅ What You've Done:
- [x] Created Supabase project
- [x] Created .env.local file with credentials

## 🔲 What's Left to Do:

### 1. Run Database Schema (REQUIRED)
- Go to Supabase Dashboard → SQL Editor
- Copy contents of `supabase/schema.sql` and run it
- Should see "Success. No rows returned"

### 2. Run RLS Policies (REQUIRED)
- In SQL Editor, click "New Query"
- Copy contents of `supabase/rls-policies.sql` and run it
- Should see "Success. No rows returned"

### 3. Seed Initial Data (REQUIRED)
- Run the seed script: `npm run seed`
- OR manually insert the Ibadan branch in Supabase

### 4. Create Admin User (REQUIRED for admin access)
- Authentication → Users → Add user
- Create user with email/password
- Copy the User UID
- Run SQL: `INSERT INTO user_roles (user_id, role) VALUES ('YOUR_UID', 'admin');`

### 5. Restart Dev Server
- Stop server (Ctrl+C)
- Run `npm run dev` again

## 🐛 Troubleshooting

If you only see "Haven Word Church":
- Database tables might not exist → Run schema.sql
- No data in database → Run seed script
- Check browser console for errors (F12)
- Check terminal for errors

