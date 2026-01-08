# Haven Word Church - Supabase Setup Guide

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your "haven word church" project
3. Go to **Settings** → **API**
4. You'll see:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...` - KEEP THIS SECRET!)

Copy these three values - you'll need them in Step 2.

## Step 2: Create Environment File

Share your credentials with me and I'll create the `.env.local` file, OR create it manually:

Create a file named `.env.local` in the root directory with:

```env
NEXT_PUBLIC_SITE_NAME="HAVEN WORD CHURCH"
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Step 3: Run Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `supabase/schema.sql`
4. Click **Run** (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

## Step 4: Set Up Row Level Security (RLS)

1. Still in **SQL Editor**, click **New Query**
2. Copy and paste the contents of `supabase/rls-policies.sql`
3. Click **Run**
4. You should see "Success. No rows returned"

## Step 5: Create Your First Admin User

1. Go to **Authentication** → **Users** in Supabase dashboard
2. Click **Add user** → **Create new user**
3. Enter:
   - **Email**: your admin email
   - **Password**: a strong password
4. Click **Create user**
5. Copy the **User UID** (it's a UUID like `123e4567-e89b-12d3-a456-426614174000`)

## Step 6: Assign Admin Role

1. Go back to **SQL Editor**
2. Run this query (replace `USER_UUID_HERE` with the UUID you copied):

```sql
INSERT INTO user_roles (user_id, role)
VALUES ('USER_UUID_HERE', 'admin');
```

3. Click **Run**
4. You should see "Success. 1 row inserted"

## Step 7: Test the Setup

1. Restart your dev server (if running)
2. Go to http://localhost:3000/admin/login
3. Login with the email and password you created
4. You should see the admin dashboard!

## Troubleshooting

- If login fails, check that the user_roles table has your user ID
- If you see database errors, make sure both SQL files ran successfully
- Check the browser console for any error messages

