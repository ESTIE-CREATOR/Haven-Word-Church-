# Haven Word Church - Setup Checklist

## ✅ Completed
- [x] Project initialized with Next.js 14
- [x] All dependencies installed
- [x] All pages and components created
- [x] `.env.local` file created with Supabase credentials
- [x] Duplicate root page removed

## 🔲 Remaining Steps

### 1. Database Setup (REQUIRED)
**Status: Not Done Yet**

You need to run the SQL files in Supabase:

1. **Go to Supabase Dashboard** → Your project → **SQL Editor**
2. **Run Schema SQL:**
   - Click "New Query"
   - Open `supabase/schema.sql` from your project
   - Copy ALL contents (Ctrl+A, Ctrl+C)
   - Paste into Supabase SQL Editor
   - Click **Run** (or Ctrl+Enter)
   - Should see: "Success. No rows returned"

3. **Run RLS Policies SQL:**
   - Click "New Query" again
   - Open `supabase/rls-policies.sql` from your project
   - Copy ALL contents (Ctrl+A, Ctrl+C)
   - Paste into Supabase SQL Editor
   - Click **Run**
   - Should see: "Success. No rows returned"

### 2. Create Admin User (REQUIRED)
**Status: Not Done Yet**

1. **In Supabase Dashboard:**
   - Go to **Authentication** → **Users**
   - Click **Add user** → **Create new user**
   - Enter:
     - Email: your admin email (e.g., admin@havenwordchurch.org)
     - Password: create a strong password
   - Click **Create user**
   - **Copy the User UID** (the UUID shown)

2. **Assign Admin Role:**
   - Go to **SQL Editor**
   - Click **New Query**
   - Run this SQL (replace `USER_UUID_HERE` with the UUID you copied):

```sql
INSERT INTO user_roles (user_id, role)
VALUES ('USER_UUID_HERE', 'admin');
```

   - Click **Run**
   - Should see: "Success. 1 row inserted"

### 3. Restart Dev Server
**Status: Needs Restart**

After completing steps 1-2:
1. Stop the current dev server (Ctrl+C in terminal)
2. Run: `npm run dev`
3. Visit: http://localhost:3000

### 4. Test the Site
- [ ] Visit http://localhost:3000 (should see full home page)
- [ ] Visit http://localhost:3000/admin/login
- [ ] Login with your admin credentials
- [ ] Check admin dashboard works

### 5. Seed Initial Data (Optional)
After database is set up, you can run:
```bash
npm run seed
```
(Note: You may need to install tsx first: `npm install tsx --save-dev`)

---

## Current Issue: "Only seeing Haven Word Church"

**Fixed:** Removed duplicate `app/page.tsx` file. The full home page should now show.

**If you still see issues:**
1. Restart the dev server
2. Hard refresh the browser (Ctrl+Shift+R)
3. Check browser console for errors
4. Check terminal for any error messages

---

## Next Steps
1. **Run the SQL files in Supabase** (Step 1 above)
2. **Create your admin user** (Step 2 above)
3. **Restart dev server**
4. **Test the site**

Let me know when you've completed the database setup!



