import React, { useEffect, useState } from 'react';
import { ArrowRight, Instagram, Facebook, Linkedin } from 'lucide-react';
import { supabase, BlogPost } from '../lib/supabase';
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

const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onBack, onRelatedPostClick, onNavigate }) => {
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
      console.error('Error fetching blog post:', error);
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
      console.error('Error fetching related posts:', error);
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

      {/* Footer */}
      <footer className="bg-[#292B27] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/favicon.png" 
                  alt="elu – elevate you" 
                  className="w-10 h-10"
                />
                <h3 className="text-2xl font-bold text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  <span className="font-bold">elu.</span> <span className="font-extralight italic">elevate you</span>
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Gesundheit ohne Umwege. Finde geprüfte Experten für alle Bereiche der Vorsorge und Prävention.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/elevateyou.app/" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-[#6D8EEC] p-3 rounded-full transition-colors duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61579333094922" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-[#6D8EEC] p-3 rounded-full transition-colors duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/108662379/" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-[#6D8EEC] p-3 rounded-full transition-colors duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Rechtliches
              </h4>
              <ul className="space-y-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                <li>
                  <button 
                    onClick={() => onNavigate ? onNavigate('impressum') : onBack?.()} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    Impressum
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate ? onNavigate('datenschutz') : onBack?.()} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    Datenschutz
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate ? onNavigate('agb') : onBack?.()} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    AGB
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Kontakt
              </h4>
              <ul className="space-y-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                <li>
                  <button 
                    onClick={() => onNavigate ? onNavigate('contact') : onBack?.()} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    Kontakt
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate ? onNavigate('support') : onBack?.()} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    Support
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate ? onNavigate('blog') : onBack?.()} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    Blog
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-12 pt-8 text-center">
            <p className="text-gray-400" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              © 2025 <span className="font-bold">elu.</span> <span className="font-extralight italic">elevate you</span>. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPostPage;

