-- Update featured image for fourth blog post: "So erkennst du, wann dein Körper wirklich Ruhe braucht"
-- Run this in Supabase SQL Editor

UPDATE blog_posts 
SET 
  featured_image_url = 'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop&crop=center',
  image_alt_text = 'Ruhe und Entspannung in der Natur – Steine am Seeufer symbolisieren Ruhe und Balance'
WHERE slug = 'wann-dein-koerper-ruhe-braucht';

