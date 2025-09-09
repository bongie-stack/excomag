import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface ArticleCardProps {
  article: Article;
  onRead: (id: string) => void;
}

const ArticleCard = ({ article, onRead }: ArticleCardProps) => {
  return (
    <Card className="card-shadow hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden">
      {article.imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="bg-accent text-accent-foreground">
            {article.category}
          </Badge>
          <span className="text-sm text-muted-foreground">{article.readTime}</span>
        </div>
        
        <h3 className="text-xl font-bold leading-tight group-hover:text-accent transition-colors">
          {article.title}
        </h3>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRead(article.id);
            }}
            className="text-accent hover:text-accent/80"
          >
            Read More
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;