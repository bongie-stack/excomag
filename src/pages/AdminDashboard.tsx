import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from '@supabase/supabase-js';
import AdminPanel from "@/components/AdminPanel";
import AdminLogin from "@/components/AdminLogin";

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

const AdminDashboard = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  
  // Fetch articles from Supabase
  useEffect(() => {
    fetchArticles();
  }, []);

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
  
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Set up authentication state management
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Check admin role when user logs in
          setTimeout(() => {
            checkAdminRole(session.user.id);
          }, 0);
        } else {
          setIsAdminAuthenticated(false);
          setIsCheckingAuth(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        setIsCheckingAuth(false);
        setIsLoginOpen(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error checking user role:', error);
        setIsAdminAuthenticated(false);
        setIsLoginOpen(true);
      } else if (profile?.role === 'admin') {
        setIsAdminAuthenticated(true);
        setIsLoginOpen(false);
      } else {
        setIsAdminAuthenticated(false);
        setIsLoginOpen(true);
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error checking admin role:', error);
      setIsAdminAuthenticated(false);
      setIsLoginOpen(true);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleAddArticle = async (articleData: Omit<Article, 'id' | 'date'>) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('articles')
      .insert({
        user_id: user.id,
        title: articleData.title,
        excerpt: articleData.excerpt,
        content: articleData.content,
        author: articleData.author,
        category: articleData.category,
        image_url: articleData.imageUrl,
        media_urls: articleData.mediaUrls,
        read_time: articleData.readTime
      })
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to publish article. Please try again.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Article published successfully!"
    });
    
    fetchArticles();
  };

  const handleEditArticle = async (id: string, articleData: Omit<Article, 'id' | 'date'>) => {
    const { error } = await supabase
      .from('articles')
      .update({
        title: articleData.title,
        excerpt: articleData.excerpt,
        content: articleData.content,
        author: articleData.author,
        category: articleData.category,
        image_url: articleData.imageUrl,
        media_urls: articleData.mediaUrls,
        read_time: articleData.readTime
      })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update article. Please try again.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Article updated successfully!"
    });
    
    fetchArticles();
  };

  const handleDeleteArticle = async (id: string) => {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete article. Please try again.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Article Deleted",
      description: "The article has been removed successfully."
    });
    
    fetchArticles();
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsLoginOpen(false);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAdminAuthenticated(false);
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully."
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading Admin Dashboard...</h2>
          <p className="text-muted-foreground">Verifying authentication</p>
        </div>
      </div>
    );
  }

  // Redirect to main site if not authenticated
  if (!user && !isLoginOpen) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Login Dialog */}
      <AdminLogin
        isOpen={isLoginOpen}
        onClose={() => {
          if (!isAdminAuthenticated) {
            // Redirect to main site if login is closed without authentication
            window.location.href = '/';
          }
          setIsLoginOpen(false);
        }}
        onLoginSuccess={handleLoginSuccess}
        currentUser={user}
      />

      {/* Admin Panel - Always open when authenticated */}
      {isAdminAuthenticated && (
        <AdminPanel
          isOpen={true}
          onClose={handleLogout}
          articles={articles}
          onAddArticle={handleAddArticle}
          onEditArticle={handleEditArticle}
          onDeleteArticle={handleDeleteArticle}
          userEmail={user?.email}
        />
      )}
    </div>
  );
};

export default AdminDashboard;