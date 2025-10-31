// Test script to verify blog setup
// Run with: npx tsx scripts/test-blog-connection.ts

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load environment variables
const envFile = resolve(process.cwd(), '.env');
let envVars: Record<string, string> = {};

try {
  const envContent = readFileSync(envFile, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#][^=]*)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      envVars[key] = value;
    }
  });
} catch (error) {
  console.error('Could not read .env file');
}

const supabaseUrl = envVars.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = envVars.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Missing Supabase environment variables');
  console.error('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file');
  process.exit(1);
}

console.log('✅ Found Supabase credentials');
console.log(`URL: ${supabaseUrl.substring(0, 30)}...`);
console.log(`Key: ${supabaseAnonKey.substring(0, 30)}...`);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('\n🔍 Testing Supabase connection...\n');

  // Test 1: Check if blog_posts table exists
  console.log('1. Checking if blog_posts table exists...');
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('count')
      .limit(1);

    if (error) {
      if (error.message?.includes('relation') || error.message?.includes('does not exist')) {
        console.error('❌ The blog_posts table does NOT exist');
        console.error('   → Run the migration: supabase/migrations/20251031104505_create_blog_posts_table.sql');
        return;
      } else {
        console.error('❌ Error:', error.message);
        return;
      }
    }
    console.log('✅ blog_posts table exists');
  } catch (error: any) {
    console.error('❌ Error checking table:', error.message);
    return;
  }

  // Test 2: Check if there are any blog posts
  console.log('\n2. Checking for blog posts...');
  try {
    const { data, error, count } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .eq('published', true);

    if (error) {
      console.error('❌ Error fetching posts:', error.message);
      return;
    }

    const postCount = count || data?.length || 0;
    console.log(`✅ Found ${postCount} published blog post(s)`);

    if (postCount === 0) {
      console.log('\n⚠️  No published posts found');
      console.log('   → Run: supabase/insert_first_blog_post.sql to insert the first article');
      
      // Check for unpublished posts
      const { data: allPosts } = await supabase
        .from('blog_posts')
        .select('id, title, published');
      
      if (allPosts && allPosts.length > 0) {
        console.log(`\n   Found ${allPosts.length} unpublished post(s):`);
        allPosts.forEach(post => {
          console.log(`   - ${post.title} (published: ${post.published})`);
        });
      }
    } else {
      console.log('\n📝 Published posts:');
      data?.forEach(post => {
        console.log(`   - ${post.title} (${post.slug})`);
      });
    }
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    return;
  }

  console.log('\n✅ All checks passed! Your blog should work now.');
}

testConnection();

