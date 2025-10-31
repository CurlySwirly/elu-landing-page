-- Update the featured image URL for the blog post
-- Run this in Supabase SQL Editor

UPDATE blog_posts 
SET 
  featured_image_url = 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop&crop=center'
WHERE slug = 'stress-abbauen-im-alltag-mini-pausen';

