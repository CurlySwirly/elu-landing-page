import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase, BlogPost } from '../lib/supabase';
import SiteFooter from './layout/SiteFooter';
import Breadcrumb from './BlogPost/Breadcrumb';
import BackToBlog from './BlogPost/BackToBlog';
import ArticleHeader from './BlogPost/ArticleHeader';
import ArticleContent from './BlogPost/ArticleContent';
import SocialShare from './BlogPost/SocialShare';
import RelatedPosts from './BlogPost/RelatedPosts';
import Newsletter from './Blog/Newsletter';

interface BlogPostPageProps {
  slug: string;
  onBack?: () => void;
  onRelatedPostClick?: (slug: string) => void;
  onNavigate?: (page: string) => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onBack, onRelatedPostClick }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        setError(true);
        return;
      }

      setPost(data);
      fetchRelatedPosts(data.category, data.id);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error fetching blog post:', error);
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async (category: string, currentPostId: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', category)
        .eq('published', true)
        .neq('id', currentPostId)
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setRelatedPosts(data || []);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error fetching related posts:', error);
      }
    }
  };

  const handleBackToBlog = () => {
    if (onBack) {
      onBack();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4F4] flex items-center justify-center">
        <p className="font-['Open_Sans'] text-[#292B27] text-lg">
          Lade Artikel...
        </p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#F8F4F4]">
        <header className="bg-[#292B27] text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src="/favicon.png" 
                  alt="elu – elevate you" 
                  className="w-8 h-8"
                />
                <h1 className="text-xl font-bold" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  elu – elevate you
                </h1>
              </div>
              {onBack && (
                <button
                  onClick={handleBackToBlog}
                  className="inline-flex items-center gap-2 text-white hover:text-[#BADE4F] transition-colors duration-200 font-medium"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Zurück
                </button>
              )}
            </div>
          </div>
        </header>
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h1 className="font-['League_Spartan'] font-bold text-[#292B27] text-[32px] md:text-[46px] mb-6">
            Artikel nicht gefunden
          </h1>
          <p className="font-['Open_Sans'] text-[#292B27] text-lg mb-8">
            Der angeforderte Artikel existiert nicht oder wurde entfernt.
          </p>
          <button
            onClick={handleBackToBlog}
            className="inline-block bg-gradient-to-r from-[#6D8EEC] to-[#BADE4F] text-white font-['Open_Sans'] font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Zur Blog-Übersicht
          </button>
        </div>
      </div>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.slug}` : '';

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#292B27] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/favicon.png" 
                alt="elu – elevate you" 
                className="w-8 h-8"
              />
              <h1 className="text-xl font-bold" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                elu – elevate you
              </h1>
            </div>
            {onBack && (
              <button
                onClick={handleBackToBlog}
                className="inline-flex items-center gap-2 text-white hover:text-[#BADE4F] transition-colors duration-200 font-medium"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Zurück
              </button>
            )}
          </div>
        </div>
      </header>

      <Breadcrumb category={post.category} title={post.title} />
      <BackToBlog onBack={handleBackToBlog} />
      <ArticleHeader
        title={post.title}
        category={post.category}
        author={post.author_name}
        publishedAt={post.published_at}
        featuredImage={post.featured_image_url}
        imageAlt={post.image_alt_text}
      />
      <ArticleContent 
        content={post.content} 
        onPostClick={(slug) => {
          if (onRelatedPostClick) {
            onRelatedPostClick(slug);
          }
        }}
      />
      <SocialShare title={post.title} url={currentUrl} />
      <RelatedPosts posts={relatedPosts} onPostClick={onRelatedPostClick} />
      <Newsletter />

      <SiteFooter />
    </div>
  );
};

export default BlogPostPage;

