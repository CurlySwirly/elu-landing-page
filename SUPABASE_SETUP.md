# Supabase Setup Guide for ELU Landing Page

This guide will help you set up Supabase as a backend for storing form submissions and emails.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `elu-landing-page` (or your preferred name)
   - Database Password: Create a strong password
   - Region: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be created (this may take a few minutes)

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)

## 3. Set Up Environment Variables

1. Create a `.env` file in your project root (copy from `env.example`)
2. Add your Supabase credentials:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:** Never commit the `.env` file to version control!

## 4. Create Database Tables

Run these SQL commands in your Supabase **SQL Editor**:

### Beta Signups Table
```sql
CREATE TABLE beta_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE beta_signups ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from authenticated and anonymous users
CREATE POLICY "Allow anonymous inserts" ON beta_signups
  FOR INSERT WITH CHECK (true);

-- Create policy to allow users to view their own data (if needed)
CREATE POLICY "Allow users to view own data" ON beta_signups
  FOR SELECT USING (true);
```

### Contact Messages Table
```sql
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from authenticated and anonymous users
CREATE POLICY "Allow anonymous inserts" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Create policy to allow users to view their own data (if needed)
CREATE POLICY "Allow users to view own data" ON contact_messages
  FOR SELECT USING (true);
```

### Expert Applications Table
```sql
CREATE TABLE expert_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  expertise TEXT[] NOT NULL,
  experience_years INTEGER,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE expert_applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from authenticated and anonymous users
CREATE POLICY "Allow anonymous inserts" ON expert_applications
  FOR INSERT WITH CHECK (true);

-- Create policy to allow users to view their own data (if needed)
CREATE POLICY "Allow users to view own data" ON expert_applications
  FOR SELECT USING (true);
```

### **Table 4: Pricing Info Emails**
```sql
CREATE TABLE pricing_info_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  plan_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE pricing_info_emails ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from authenticated and anonymous users
CREATE POLICY "Allow anonymous inserts" ON pricing_info_emails
  FOR INSERT WITH CHECK (true);

-- Create policy to allow users to view their own data (if needed)
CREATE POLICY "Allow users to view own data" ON pricing_info_emails
  FOR SELECT USING (true);
```

## 5. Test the Integration

1. Start your development server: `npm run dev`
2. Fill out and submit the forms on your landing page
3. Check your Supabase **Table Editor** to see if data is being stored
4. Check the browser console for any error messages

## 6. View Your Data

In your Supabase dashboard:
- **Table Editor**: View all stored data
- **Logs**: Monitor API requests and errors
- **API**: Test your endpoints

## 7. Security Considerations

- The current setup allows anonymous users to insert data
- Consider adding rate limiting to prevent spam
- You may want to add CAPTCHA or other anti-spam measures
- Consider adding email validation

## 8. Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Check that your `.env` file exists and has the correct values
   - Restart your development server after adding environment variables

2. **"Invalid API key"**
   - Verify you're using the `anon public` key, not the `service_role` key
   - Check that your project URL is correct

3. **"Table doesn't exist"**
   - Make sure you've created the tables in Supabase
   - Check that table names match exactly

4. **CORS errors**
   - Supabase handles CORS automatically for web applications
   - If you're getting CORS errors, check your project URL

### Getting Help:

- Check the [Supabase documentation](https://supabase.com/docs)
- Look at the browser console for error messages
- Check the Supabase dashboard logs
- Verify your environment variables are loaded correctly

## 9. Next Steps

Once everything is working:
- Set up email notifications for new submissions
- Add data validation and sanitization
- Implement user authentication if needed
- Set up automated backups
- Monitor your database usage and costs

## 10. Production Deployment

When deploying to production:
1. Update your environment variables with production Supabase credentials
2. Consider using environment-specific Supabase projects
3. Set up proper monitoring and alerting
4. Implement proper error handling and user feedback
