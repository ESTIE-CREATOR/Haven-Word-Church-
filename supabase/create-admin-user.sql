-- ============================================
-- CREATE ADMIN USER - SQL METHOD
-- ============================================
-- 
-- IMPORTANT: You MUST create the user in Supabase Dashboard first
-- because password hashing requires Supabase's auth system.
--
-- Steps:
-- 1. Go to Supabase Dashboard → Authentication → Users
-- 2. Click "Add user" → "Create new user"
-- 3. Enter email and password, click "Create user"
-- 4. Copy the User ID (UUID) shown
-- 5. Run the SQL below with your User ID
--
-- ============================================

-- OPTION 1: Assign admin role to existing user (replace USER_ID_HERE)
INSERT INTO user_roles (user_id, role)
VALUES ('USER_ID_HERE', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- OPTION 2: Find your user ID by email, then assign role
-- Step 1: Find your user (replace email):
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'your-email@example.com';

-- Step 2: Use the id from above in this query:
-- INSERT INTO user_roles (user_id, role)
-- VALUES ('id-from-step-1', 'admin')
-- ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- OPTION 3: Assign admin role to the most recently created user
-- (Use this if you just created the user and it's the latest one)
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM user_roles)
ORDER BY created_at DESC
LIMIT 1
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- Verify the role was assigned:
SELECT ur.*, au.email
FROM user_roles ur
JOIN auth.users au ON ur.user_id = au.id
WHERE ur.role = 'admin';
