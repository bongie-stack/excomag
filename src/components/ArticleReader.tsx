import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";

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
}

interface ArticleReaderProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArticleReader = ({ article, isOpen, onClose }: ArticleReaderProps) => {
  if (!article) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Article Header */}
          <div className="p-6 border-b">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Button>
            
            <div className="flex items-center space-x-3 mb-4">
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                {article.category}
              </Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
            </div>
          </div>

          {/* Article Image */}
          {article.imageUrl && (
            <div className="aspect-video">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="p-6">
            {article.excerpt && (
              <div className="text-lg text-muted-foreground mb-6 p-4 bg-muted/50 rounded-lg border-l-4 border-accent">
                {article.excerpt}
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Article Footer */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Written by</p>
                  <p className="font-semibold">{article.author}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Published</p>
                  <p className="font-semibold">{article.date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleReader;