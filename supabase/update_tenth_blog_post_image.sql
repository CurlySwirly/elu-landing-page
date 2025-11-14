-- Update featured image for tenth blog post: "Funktionelle Kraft ab 30: Warum sie mehr als ein Fitnessziel ist – sie ist ein Fundament für Langlebigkeit"
-- Run this in Supabase SQL Editor

UPDATE blog_posts 
SET 
  featured_image_url = 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop&crop=center',
  image_alt_text = 'Person mit Langhantel beim Krafttraining – Funktionelle Kraft ab 30 für Langlebigkeit'
WHERE slug = 'funktionelle-kraft-ab-30-fundament-langlebigkeit';

