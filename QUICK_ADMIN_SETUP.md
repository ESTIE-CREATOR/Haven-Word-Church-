# Quick Admin User Setup

## Method 1: Using Supabase Dashboard + SQL (Recommended)

### Step 1: Create User in Dashboard
1. Go to **Supabase Dashboard** → **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - **Email**: your-admin-email@example.com
   - **Password**: your-strong-password
4. Click **"Create user"**
5. **Copy the User ID** (the UUID shown, e.g., `123e4567-e89b-12d3-a456-426614174000`)

### Step 2: Assign Admin Role via SQL
1. Go to **SQL Editor** in Supabase Dashboard
2. Click **"New Query"**
3. Paste this SQL (replace `YOUR_USER_ID_HERE` with the UUID you copied):

```sql
INSERT INTO user_roles (user_id, role)
VALUES ('YOUR_USER_ID_HERE', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
```

4. Click **"Run"**
5. You should see: "Success. 1 row inserted"

### Step 3: Verify
Run this to verify your admin user:

```sql
SELECT ur.*, au.email
FROM user_roles ur
JOIN auth.users au ON ur.user_id = au.id
WHERE ur.role = 'admin';
```

---

## Method 2: Auto-Assign to Latest User

If you just created a user and it's the most recent one, you can use this SQL to automatically assign admin role:

```sql
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM user_roles)
ORDER BY created_at DESC
LIMIT 1
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
```

---

## Method 3: Find User by Email, Then Assign

If you know the email but not the ID:

```sql
-- Step 1: Find your user
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'your-email@example.com';

-- Step 2: Use the id from above
INSERT INTO user_roles (user_id, role)
VALUES ('id-from-step-1', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
```

---

## Why Can't We Create Users Purely via SQL?

Supabase's `auth.users` table requires:
- Proper password hashing (bcrypt)
- Security constraints
- Email verification setup

These are handled by Supabase's Auth API, so it's safer and easier to create users via the Dashboard, then assign roles via SQL.

---

## Test Your Admin Access

After setup:
1. Go to http://localhost:3000/admin/login
2. Login with your email and password
3. You should see the admin dashboard!

