# Blog Troubleshooting Guide

## Problem: Blog not showing articles

### Step 1: Verify .env file has correct values

Your `.env` file should have your **actual** Supabase credentials, not placeholders:

**❌ Wrong:**
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**✅ Correct:**
```
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**To get your credentials:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Settings → API
4. Copy **Project URL** and **anon public** key
5. Paste into your `.env` file

**After updating .env:**
- Restart your dev server (Ctrl+C, then `npm run dev`)

---

### Step 2: Check if blog_posts table exists

1. Go to Supabase Dashboard → **Table Editor**
2. Look for `blog_posts` in the list

**If table doesn't exist:**
- Go to **SQL Editor**
- Copy and run: `supabase/migrations/20251031104505_create_blog_posts_table.sql`

---

### Step 3: Check if article is inserted

1. Go to Supabase Dashboard → **Table Editor**
2. Click on `blog_posts` table
3. Check if you see any rows

**If no rows exist:**
- Go to **SQL Editor**
- Copy and run: `supabase/insert_first_blog_post.sql`

**If you see rows:**
- Make sure `published` column is `true` (green checkmark)
- Make sure `published_at` has a date value

---

### Step 4: Check browser console

1. Open http://localhost:5173/blog
2. Open browser console (F12)
3. Look for error messages

**Common errors:**

- **"Missing Supabase environment variables"**
  → `.env` file has placeholder values or is missing
  
- **"relation blog_posts does not exist"**
  → Run the migration: `supabase/migrations/20251031104505_create_blog_posts_table.sql`
  
- **"No published posts found"**
  → Either no posts exist, or they're not marked as `published = true`

---

### Step 5: Verify Supabase connection

Run this test script:
```bash
npx tsx scripts/test-blog-connection.ts
```

This will tell you:
- ✅ If credentials are correct
- ✅ If table exists
- ✅ If posts exist
- ❌ What's missing

---

## Quick Checklist

- [ ] `.env` file has actual Supabase URL (not placeholder)
- [ ] `.env` file has actual Supabase anon key (not placeholder)
- [ ] Dev server restarted after updating `.env`
- [ ] `blog_posts` table exists in Supabase
- [ ] At least one row exists in `blog_posts` table
- [ ] Post has `published = true`
- [ ] Post has `published_at` date set
- [ ] Browser console shows no errors

---

## Still Not Working?

Check the browser console for specific error messages and share them, or run the test script above and share its output.

