/*
  # Create newsletter_subscriptions table for ELU Newsletter

  ## Overview
  This migration creates the newsletter_subscriptions table to store email addresses
  for the ELU blog newsletter signup.

  ## New Tables
  - `newsletter_subscriptions`
    - `id` (uuid, primary key) - Unique identifier for each subscription
    - `email` (text, unique) - Email address of the subscriber
    - `created_at` (timestamptz) - When the subscription was created
    - `source` (text) - Where the subscription came from (e.g., 'blog_page', 'blog_post')

  ## Security
  - Enable RLS on `newsletter_subscriptions` table
  - Add policy for public insert (anyone can subscribe)
  - No public read access (only authenticated admin can read)
*/

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  source text DEFAULT 'blog_page',
  created_at timestamptz DEFAULT now()
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_created_at ON newsletter_subscriptions(created_at DESC);

-- Enable Row Level Security
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (subscribe to newsletter)
CREATE POLICY "Public can subscribe to newsletter"
  ON newsletter_subscriptions
  FOR INSERT
  WITH CHECK (true);

-- Policy: No public read access (only admins can read subscriptions)
-- This requires authenticated admin access, which you can configure separately if needed

