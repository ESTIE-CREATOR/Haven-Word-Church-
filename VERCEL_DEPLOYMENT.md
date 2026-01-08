# Vercel Deployment Guide

## Step 1: Connect Your GitHub Repository

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository: `ESTIE-CREATOR/Haven-Word-Church-`
4. Vercel will auto-detect Next.js

## Step 2: Configure Environment Variables

In the Vercel project settings, add these environment variables:

### Required Environment Variables:

```
NEXT_PUBLIC_SITE_NAME=HAVEN WORD CHURCH
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Optional Environment Variables (if you're using these features):

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
RESEND_API_KEY=your_resend_api_key
```

**How to add environment variables in Vercel:**
1. Go to your project dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable (make sure to select all environments: Production, Preview, Development)
4. Click **Save**

## Step 3: Build Settings

Vercel should auto-detect these settings, but verify:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (root)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

## Step 4: Deploy

1. Click **Deploy**
2. Wait for the build to complete
3. Check the build logs if there are errors

## Common Issues and Solutions

### Issue 1: Build Fails - Missing Environment Variables
**Error**: `NEXT_PUBLIC_SUPABASE_URL is not defined`

**Solution**: Make sure all required environment variables are added in Vercel project settings.

### Issue 2: Build Fails - TypeScript Errors
**Error**: Type errors during build

**Solution**: Run `npm run build` locally first to catch errors:
```bash
npm run build
```

### Issue 3: Build Fails - ESLint Errors
**Error**: ESLint configuration errors

**Solution**: The project uses ESLint 8 which is compatible. If you see errors, check the build logs.

### Issue 4: Runtime Errors - Supabase Connection
**Error**: Cannot connect to Supabase

**Solution**: 
- Verify your Supabase URL and keys are correct
- Make sure your Supabase project is active
- Check Supabase dashboard for any service issues

### Issue 5: Images Not Loading
**Error**: Images fail to load

**Solution**: The `next.config.js` already has image domains configured. Make sure your image URLs are correct.

## Step 5: Verify Deployment

After successful deployment:
1. Visit your Vercel URL (e.g., `your-project.vercel.app`)
2. Test the homepage
3. Test navigation
4. Test admin login (if configured)

## Additional Notes

- **Automatic Deployments**: Vercel will automatically deploy when you push to GitHub
- **Preview Deployments**: Every pull request gets a preview URL
- **Custom Domain**: You can add a custom domain in Vercel project settings

## Need Help?

If you're still getting errors:
1. Check the Vercel build logs (they show detailed error messages)
2. Share the specific error message you're seeing
3. Make sure your Supabase database schema is set up correctly

