-- Simple Admin User Creation
-- Follow these steps:

-- STEP 1: Create user via Supabase Dashboard
-- Go to: Authentication → Users → Add user → Create new user
-- Enter email and password, then click Create user

-- STEP 2: Copy the User ID (UUID) from the user you just created

-- STEP 3: Run this SQL (replace 'YOUR_USER_ID_HERE' with the actual UUID):

INSERT INTO user_roles (user_id, role)
VALUES ('YOUR_USER_ID_HERE', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- To find your user ID if you forgot it, run:
-- SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC LIMIT 5;

-- Then use the id from the result in the INSERT statement above

