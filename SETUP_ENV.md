# Setting Up Your .env File

## Step 1: Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (or create a new one if you don't have one)
3. Go to **Settings** (gear icon in the left sidebar)
4. Click on **API** in the settings menu
5. You'll see two values you need:

   - **Project URL**: Something like `https://xxxxx.supabase.co`
   - **anon public** key: A long string starting with `eyJ...`

## Step 2: Create Your .env File

1. In your project root directory, create a new file named `.env` (with the dot at the beginning)
2. Copy the template from `env.example` or use this format:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Replace the placeholder values with your actual Supabase credentials:
   - Replace `https://your-project-id.supabase.co` with your actual Project URL
   - Replace `your-anon-key-here` with your actual anon public key

## Example .env File

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDAwMDAwMCwiZXhwIjoxOTQ1NTc2MDAwfQ.example_key
```

## Step 3: Restart Your Dev Server

After creating or updating your `.env` file:

1. Stop your dev server (Ctrl+C if it's running)
2. Restart it with `npm run dev`
3. Your app should now connect to Supabase!

## Important Notes

- ✅ The `.env` file is in `.gitignore` - it will NOT be committed to git (this is correct for security)
- ✅ Do NOT share your `.env` file or commit it to version control
- ✅ The `anon public` key is safe to use in frontend code (it's designed for client-side use)
- ❌ Never use the `service_role` key in frontend code - it's for backend use only

## Troubleshooting

### "Missing Supabase environment variables" error
- Make sure your `.env` file exists in the project root
- Check that the variable names are exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Make sure there are no spaces around the `=` sign
- Restart your dev server after creating/updating the `.env` file

### "Invalid API key" error
- Make sure you're using the `anon public` key, NOT the `service_role` key
- Verify the key starts with `eyJ...`
- Check that you copied the entire key (it's very long)

### Can't find Settings > API in Supabase
- Make sure you're logged into Supabase
- Make sure you've selected the correct project
- Try refreshing the dashboard

## Need Help?

If you're having trouble:
1. Double-check that you copied the correct values from Supabase
2. Make sure your `.env` file is in the project root (same directory as `package.json`)
3. Restart your dev server completely
4. Check the browser console for any error messages

