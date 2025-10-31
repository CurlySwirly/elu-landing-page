import React, { useEffect, useState } from 'react';
import { ArrowRight, Instagram, Facebook, Linkedin } from 'lucide-react';
import { supabase, BlogPost } from '../lib/supabase';
import Hero from './Blog/Hero';
import SearchFilter from './Blog/SearchFilter';
import BlogGrid from './Blog/BlogGrid';
import RecommendedTopics from './Blog/RecommendedTopics';
import Newsletter from './Blog/Newsletter';

interface BlogPageProps {
  onBack?: () => void;
  onPostSelect?: (slug: string) => void;
  onNavigate?: (page: string) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onBack, onPostSelect, onNavigate }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchQuery, selectedCategory]);

  const fetchPosts = async () => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        // Check if it's a table not found error
        if (error.message?.includes('relation') || error.message?.includes('does not exist')) {
          setError('Die Blog-Tabelle existiert noch nicht. Bitte führen Sie die Supabase-Migration aus.');
        } else {
          setError(`Fehler beim Laden der Artikel: ${error.message}`);
        }
        setPosts([]);
        return;
      }
      
      setPosts(data || []);
      if (data && data.length === 0) {
        setError('Es sind noch keine Artikel verfügbar. Artikel werden angezeigt, sobald sie veröffentlicht sind.');
      }
    } catch (error: any) {
      console.error('Error fetching blog posts:', error);
      setError(`Unerwarteter Fehler: ${error?.message || 'Unbekannter Fehler'}`);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = [...posts];

    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author_name.toLowerCase().includes(query)
      );
    }

    setFilteredPosts(filtered);
  };

  const handlePostClick = (slug: string) => {
    if (onPostSelect) {
      onPostSelect(slug);
    }
  };

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
                onClick={onBack}
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

      <div className="min-h-screen">
        <Hero />
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        {loading ? (
          <div className="bg-[#F8F4F4] py-16">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <p className="font-['Open_Sans'] text-[#292B27] text-lg">
                Lade Artikel...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-[#F8F4F4] py-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E2E8FB]">
                <h3 className="font-['League_Spartan'] font-bold text-[#292B27] text-xl mb-4">
                  Hinweis
                </h3>
                <p className="font-['Open_Sans'] text-[#292B27] text-lg mb-4">
                  {error}
                </p>
                {error.includes('Migration') && (
                  <div className="mt-6 p-4 bg-[#E2E8FB] rounded-lg">
                    <p className="font-['Open_Sans'] text-sm text-[#292B27] mb-2">
                      <strong>Migration ausführen:</strong>
                    </p>
                    <p className="font-['Open_Sans'] text-sm text-[#292B27]">
                      Führen Sie die Migration aus der Datei <code className="bg-white px-2 py-1 rounded">supabase/migrations/20251031104505_create_blog_posts_table.sql</code> in Ihrer Supabase-Datenbank aus.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <BlogGrid posts={filteredPosts} onPostClick={handlePostClick} />
        )}
        <RecommendedTopics />
        <Newsletter />
      </div>

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

export default BlogPage;

