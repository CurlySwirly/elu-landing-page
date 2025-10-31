/*
  # Create blog_posts table for ELU Blog

  ## Overview
  This migration creates the blog_posts table to store articles for the ELU blog page,
  with support for German language content, categorization, and SEO metadata.

  ## New Tables
  - `blog_posts`
    - `id` (uuid, primary key) - Unique identifier for each blog post
    - `title` (text) - Blog post title in German
    - `slug` (text, unique) - URL-friendly version of the title
    - `excerpt` (text) - Short preview text (max 180 characters recommended)
    - `content` (text) - Full blog post content in HTML/Markdown
    - `category` (text) - One of: "Bewegung & Training", "Ernährung & Stoffwechsel", "Mentale Gesundheit", "Unternehmen & Prävention"
    - `featured_image_url` (text) - URL to the featured image
    - `image_alt_text` (text) - German alt text for accessibility
    - `meta_title` (text) - SEO title tag
    - `meta_description` (text) - SEO meta description
    - `author_name` (text) - Name of the author/expert
    - `published` (boolean, default false) - Whether the post is published
    - `published_at` (timestamptz) - When the post was published
    - `created_at` (timestamptz) - When the record was created
    - `updated_at` (timestamptz) - When the record was last updated

  ## Security
  - Enable RLS on `blog_posts` table
  - Add policy for public read access to published posts only
  - This is a read-only public blog, so only published posts are accessible

  ## Indexes
  - Index on `published` and `published_at` for efficient querying of published posts
  - Index on `category` for filtering
  - Index on `slug` for URL lookups
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL CHECK (category IN ('Bewegung & Training', 'Ernährung & Stoffwechsel', 'Mentale Gesundheit', 'Unternehmen & Prävention')),
  featured_image_url text NOT NULL,
  image_alt_text text NOT NULL,
  meta_title text NOT NULL,
  meta_description text NOT NULL,
  author_name text NOT NULL DEFAULT 'ELU Team',
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published blog posts
CREATE POLICY "Public can view published blog posts"
  ON blog_posts
  FOR SELECT
  USING (published = true);