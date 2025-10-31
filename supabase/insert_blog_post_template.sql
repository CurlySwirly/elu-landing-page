-- Template for inserting a blog post
-- Copy this and fill in your article details
-- Then run it in Supabase SQL Editor

-- Helper function to create URL-friendly slug from title
-- Example: "Mein erster Artikel" -> "mein-erster-artikel"

INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  category,
  featured_image_url,
  image_alt_text,
  meta_title,
  meta_description,
  author_name,
  published,
  published_at
) VALUES (
  'Ihr Artikel-Titel hier',  -- Title of your blog post
  'ihr-artikel-slug-hier',   -- URL-friendly slug (lowercase, hyphens instead of spaces)
  'Kurze Zusammenfassung des Artikels in max. 180 Zeichen...',  -- Short excerpt
  '<p>Hier kommt der vollständige Artikel-Inhalt.</p><p>Sie können HTML verwenden für Formatierung.</p>',  -- Full content (can include HTML)
  'Bewegung & Training',  -- Category: 'Bewegung & Training', 'Ernährung & Stoffwechsel', 'Mentale Gesundheit', or 'Unternehmen & Prävention'
  'https://images.pexels.com/photos/your-image.jpg',  -- URL to featured image
  'Beschreibung des Bildes für Barrierefreiheit',  -- Alt text for image
  'SEO Meta Title',  -- SEO title (usually same as article title or shorter)
  'SEO Meta Description für Suchmaschinen',  -- SEO description (150-160 characters recommended)
  'ELU Team',  -- Author name (or your name)
  true,  -- Set to true to publish immediately
  NOW()  -- Published date (uses current time, or you can specify: '2025-01-15 10:00:00+00')
);

