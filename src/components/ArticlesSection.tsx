import ArticleCard from "./ArticleCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl?: string;
  readTime: string;
}

interface ArticlesSectionProps {
  articles: Article[];
  onReadArticle: (id: string) => void;
}

const ArticlesSection = ({ articles, onReadArticle }: ArticlesSectionProps) => {
  const featuredArticles = articles.slice(0, 6);

  return (
    <section id="articles" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest <span className="text-accent">Insights</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the latest trends, innovations, and stories shaping 
            Africa's entrepreneurial landscape.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-4">No Articles Yet</h3>
              <p className="text-muted-foreground mb-6">
                Our editorial team is working on bringing you the latest insights. 
                Check back soon for exciting content!
              </p>
              <div className="w-24 h-1 bg-accent mx-auto rounded"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onRead={onReadArticle}
                />
              ))}
            </div>

            {articles.length > 6 && (
              <div className="text-center">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  View All Articles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;