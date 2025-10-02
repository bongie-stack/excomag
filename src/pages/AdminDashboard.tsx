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
  const [articles, setArticles] = useState<Article[]>([
    {
      id: "1",
      title: "The Future of African Entrepreneurship: Digital Innovation Leading the Way",
      excerpt: "Exploring how digital transformation is reshaping business landscapes across Africa, from fintech to agritech solutions.",
      content: `The African continent stands at the precipice of a digital revolution that promises to transform its entrepreneurial landscape forever. From the bustling tech hubs of Lagos and Nairobi to the emerging startup ecosystems in Accra and Cape Town, a new generation of African entrepreneurs is leveraging technology to solve local problems with global impact.

The rise of mobile money platforms like M-Pesa in Kenya has demonstrated Africa's capacity to leapfrog traditional financial infrastructure. This innovation has not only revolutionized how Africans handle money but has also inspired similar solutions across the continent and beyond.

In the agricultural sector, startups are using IoT sensors, satellite imagery, and AI to help smallholder farmers optimize their yields and connect to markets. Companies like Twiga Foods in Kenya and Gro Intelligence across multiple African countries are proving that technology can address food security challenges while creating sustainable businesses.

The e-commerce space has also seen remarkable growth, with platforms like Jumia and Konga demonstrating that African consumers are ready to embrace online shopping. These platforms have had to innovate around unique African challenges, such as limited formal addresses and cash-based payment preferences.

Looking ahead, the future of African entrepreneurship will be defined by solutions that are inherently African but globally relevant. The continent's young, digitally-native population is uniquely positioned to drive this innovation forward.`,
      author: "Dr. Amara Okafor",
      date: "March 15, 2024",
      category: "Technology",
      readTime: "8 min read"
    },
    {
      id: "2", 
      title: "Building Sustainable Supply Chains: Lessons from African SMEs",
      excerpt: "How small and medium enterprises across Africa are creating resilient supply chains that can weather global disruptions.",
      content: `Small and medium enterprises (SMEs) across Africa have long been masters of resilience, operating in environments where supply chain disruptions are not exceptional events but part of the business landscape. The COVID-19 pandemic and recent global supply chain challenges have highlighted the wisdom embedded in African SME practices.

One key lesson is the importance of local sourcing and building strong community networks. Many successful African SMEs prioritize relationships with local suppliers, creating supply chains that are not only more resilient but also contribute to local economic development.

The concept of "Ubuntu" - the African philosophy of interconnectedness - manifests beautifully in business contexts where companies see their suppliers as partners rather than mere vendors. This approach has enabled many African businesses to maintain operations even during global disruptions.

Technology is playing an increasingly important role in modernizing these traditional approaches. Digital platforms are helping SMEs find alternative suppliers, track inventory more effectively, and predict potential disruptions before they occur.

The lessons from African SMEs about flexibility, community engagement, and local focus are increasingly relevant for businesses worldwide as they seek to build more sustainable and resilient operations.`,
      author: "Samuel Mensah",
      date: "March 10, 2024", 
      category: "Business",
      readTime: "6 min read"
    }
  ]);
  
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