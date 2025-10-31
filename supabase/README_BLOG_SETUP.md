# Blog Article Setup

## Quick Start: Add Your First Article

### Option 1: Using Supabase SQL Editor (Recommended)

1. Open your [Supabase Dashboard](https://app.supabase.com)
2. Navigate to **SQL Editor**
3. Copy the entire contents of `insert_first_blog_post.sql`
4. Paste it into the SQL Editor
5. Click **Run** or press `Ctrl+Enter`

The article will be immediately available on your blog page!

### Option 2: Using the Script

If you have a `.env` file with your Supabase credentials:

```bash
npx tsx scripts/insert-blog-post.ts
```

**Make sure your `.env` file contains:**
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Files

- `insert_first_blog_post.sql` - SQL statement ready to run in Supabase
- `insert_blog_post_template.sql` - Template for creating future articles
- `20251031104505_create_blog_posts_table.sql` - Migration file (run this first if the table doesn't exist)

## Troubleshooting

### "Table doesn't exist" error
Run the migration first: `supabase/migrations/20251031104505_create_blog_posts_table.sql`

### "Duplicate key" error
A blog post with the same slug already exists. Change the slug or delete the existing post.

### Article not showing
- Make sure `published = true`
- Check that `published_at` is set to a date (not NULL)
- Refresh your blog page

