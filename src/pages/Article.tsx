import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // This will be replaced with actual data fetching from Supabase
  // For now, using localStorage to share data from Index page
  const articlesData = localStorage.getItem('articles');
  const articles: Article[] = articlesData ? JSON.parse(articlesData) : [];
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <Button onClick={() => navigate("/")}>Return Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Parse content for embedded images
  const renderContent = () => {
    const parts = article.content.split(/\[IMAGE:(\d+)\]/g);
    const elements: JSX.Element[] = [];

    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        // Text content
        parts[i].split('\n\n').forEach((paragraph, idx) => {
          if (paragraph.trim()) {
            elements.push(
              <p key={`p-${i}-${idx}`} className="text-lg text-foreground/90 leading-relaxed mb-6">
                {paragraph}
              </p>
            );
          }
        });
      } else {
        // Image reference
        const imageIndex = parseInt(parts[i]);
        if (article.mediaUrls && article.mediaUrls[imageIndex]) {
          elements.push(
            <div key={`img-${i}`} className="my-8">
              <img
                src={article.mediaUrls[imageIndex]}
                alt={`Article media ${imageIndex + 1}`}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          );
        }
      }
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Button>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                {article.category}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {article.readTime}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{article.date}</span>
              </div>
            </div>

            {article.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-accent pl-6 py-2">
                {article.excerpt}
              </p>
            )}
          </header>

          {/* Featured Image */}
          {article.imageUrl && (
            <div className="mb-8 rounded-lg overflow-hidden shadow-xl">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {renderContent()}
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Written by</p>
                <p className="font-semibold text-lg">{article.author}</p>
              </div>
              <Button onClick={() => navigate("/")}>
                Back to Articles
              </Button>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default Article;
