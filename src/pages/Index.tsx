import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ArticlesSection from "@/components/ArticlesSection";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl?: string;
  readTime: string;
  mediaUrls?: string[];
}

const Index = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);

  // Fetch articles from Supabase
  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching articles:', error);
        return;
      }
      
      if (data) {
        const formattedArticles: Article[] = data.map(article => ({
          id: article.id,
          title: article.title,
          excerpt: article.excerpt || '',
          content: article.content || '',
          author: article.author || '',
          date: new Date(article.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          category: article.category || '',
          imageUrl: article.image_url || undefined,
          readTime: article.read_time || '',
          mediaUrls: article.media_urls || undefined
        }));
        setArticles(formattedArticles);
      }
    };

    fetchArticles();
  }, []);

  const handleReadArticle = (id: string) => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        <ArticlesSection 
          articles={articles} 
          onReadArticle={handleReadArticle}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
