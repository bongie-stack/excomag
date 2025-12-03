import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
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

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        setLoading(false);
        return;
      }

      const formattedArticle: Article = {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt || '',
        content: data.content || '',
        author: data.author || '',
        date: new Date(data.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        category: data.category || '',
        imageUrl: data.image_url || undefined,
        readTime: data.read_time || '',
        mediaUrls: data.media_urls || undefined
      };

      setArticle(formattedArticle);
      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Loading...</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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

  // Transform content to render actual media instead of raw URLs/placeholders
  const buildTransformedHtml = () => {
    const text = article.content || "";

    // Heuristic: if content already contains HTML tags, trust it (from RichTextEditor)
    const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(text.trim());
    if (looksLikeHtml) {
      return text;
    }

    let html = text;

    // Helper to decide if a URL is image or video
    const isImage = (url: string) => /(\.png|\.jpg|\.jpeg|\.gif|\.webp|\.avif)$/i.test(url);
    const isVideo = (url: string) => /(\.mp4|\.webm|\.ogg|\.mov|\.m4v)$/i.test(url);

    // 1) Replace [IMAGE:n] and [VIDEO:n] with mediaUrls[n]
    html = html.replace(/\[IMAGE:(\d+)\]/g, (_, idx: string) => {
      const i = parseInt(idx, 10);
      const src = article.mediaUrls?.[i];
      return src
        ? `<img src="${src}" alt="Article media ${i + 1}" class="w-full max-w-3xl h-auto rounded-lg my-4 mx-auto block" loading="lazy" />`
        : "";
    });

    html = html.replace(/\[VIDEO:(\d+)\]/g, (_, idx: string) => {
      const i = parseInt(idx, 10);
      const src = article.mediaUrls?.[i];
      return src
        ? `<video controls preload="metadata" class="w-full max-w-3xl rounded-lg my-4 mx-auto block"><source src="${src}" /></video>`
        : "";
    });

    // 2) Replace generic [IMAGE: description] / [VIDEO: description] sequentially
    let nextMediaIndex = 0;
    html = html.replace(/\[(IMAGE|VIDEO):\s*([^\]]*)\]/gi, (_match, kind: string) => {
      const src = article.mediaUrls?.[nextMediaIndex++];
      if (!src) return "";
      if (kind.toUpperCase() === "IMAGE" || isImage(src)) {
        return `<img src="${src}" alt="Article media" class="w-full max-w-3xl h-auto rounded-lg my-4 mx-auto block" loading="lazy" />`;
      }
      return `<video controls preload="metadata" class="w-full max-w-3xl rounded-lg my-4 mx-auto block"><source src="${src}" /></video>`;
    });

    // 3) Convert bare URLs into media embeds when possible
    html = html.replace(/(https?:\/\/[^\s<]+[^\s<\.)])/g, (url: string) => {
      if (isImage(url)) {
        return `<img src="${url}" alt="Article image" class="w-full max-w-3xl h-auto rounded-lg my-4 mx-auto block" loading="lazy" />`;
      }
      if (isVideo(url)) {
        return `<video controls preload="metadata" class="w-full max-w-3xl rounded-lg my-4 mx-auto block"><source src="${url}" /></video>`;
      }
      // Fallback: turn into a link (but not a raw URL in text)
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="underline">${url}</a>`;
    });

    // 4) Wrap text blocks into paragraphs for nicer formatting
    const paragraphs = html
      .split(/\n{2,}/)
      .map(p => p.trim())
      .filter(Boolean)
      .map(p => (p.startsWith("<") ? p : `<p>${p.replace(/\n/g, "<br/>")}</p>`))
      .join("\n\n");

    return paragraphs;
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
                className="w-full h-auto object-cover max-w-full"
                loading="lazy"
              />
            </div>
          )}

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none dark:prose-invert prose-img:rounded-lg prose-img:mx-auto prose-img:my-4 prose-video:rounded-lg prose-video:mx-auto prose-video:my-4 prose-img:max-w-3xl prose-video:max-w-3xl"
            dangerouslySetInnerHTML={{ __html: buildTransformedHtml() }}
          />

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
