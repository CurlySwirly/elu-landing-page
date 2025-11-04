# Vercel Environment Variables Setup

## Required Environment Variables

For the newsletter subscription to work, you need to add these environment variables in your Vercel project settings:

1. **VITE_SUPABASE_URL** - Your Supabase project URL
   - Example: `https://your-project.supabase.co`

2. **VITE_SUPABASE_ANON_KEY** - Your Supabase anonymous/public key
   - This is the `anon` or `public` key from your Supabase project settings

## How to Add Environment Variables in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - **Key**: `VITE_SUPABASE_URL`
   - **Value**: Your Supabase project URL
   - **Environment**: Production, Preview, Development (check all)
4. Repeat for `VITE_SUPABASE_ANON_KEY`
5. **Important**: After adding variables, you need to **redeploy** your project for them to take effect

## Verify Setup:

After adding the environment variables and redeploying:
- The newsletter subscription should work
- If it still doesn't work, check the browser console for specific error messages
- Common issues:
  - RLS (Row Level Security) policies blocking inserts
  - Table doesn't exist in Supabase
  - Invalid API keys

## Check Supabase Setup:

Make sure in your Supabase project:
1. The `newsletter_subscriptions` table exists
2. RLS policies allow INSERT operations for anonymous users
3. The table has the correct columns: `email`, `source`, `created_at`

