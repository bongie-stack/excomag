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
  
  // Persist articles to localStorage for site & article page
  useEffect(() => {
    localStorage.setItem('articles', JSON.stringify(articles));
  }, [articles]);
  
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

  const handleAddArticle = (articleData: Omit<Article, 'id' | 'date'>) => {
    const newArticle: Article = {
      ...articleData,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
    
    setArticles(prev => [newArticle, ...prev]);
    toast({
      title: "Success",
      description: "Article published successfully!"
    });
  };

  const handleEditArticle = (id: string, articleData: Omit<Article, 'id' | 'date'>) => {
    setArticles(prev => prev.map(article => 
      article.id === id 
        ? { ...article, ...articleData }
        : article
    ));
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(prev => prev.filter(article => article.id !== id));
    toast({
      title: "Article Deleted",
      description: "The article has been removed successfully."
    });
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