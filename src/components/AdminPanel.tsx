import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, Upload } from "lucide-react";
import AdminHeader from "@/components/AdminHeader";
import NewsletterManager from "@/components/NewsletterManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onAddArticle: (article: Omit<Article, 'id' | 'date'>) => void;
  onEditArticle: (id: string, article: Omit<Article, 'id' | 'date'>) => void;
  onDeleteArticle: (id: string) => void;
  userEmail?: string;
}

const AdminPanel = ({ 
  isOpen, 
  onClose, 
  articles, 
  onAddArticle, 
  onEditArticle, 
  onDeleteArticle,
  userEmail 
}: AdminPanelProps) => {
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [additionalMedia, setAdditionalMedia] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    imageUrl: "",
    readTime: "",
    mediaUrls: [] as string[]
  });

  const categories = [
    "Entrepreneurship",
    "Technology", 
    "Business",
    "Innovation",
    "Startups",
    "Investment",
    "Leadership"
  ];

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      category: "",
      imageUrl: "",
      readTime: "",
      mediaUrls: []
    });
    setSelectedFile(null);
    setAdditionalMedia([]);
    setIsAddingArticle(false);
    setEditingArticle(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Please select an image file",
          variant: "destructive"
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleAdditionalMediaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      toast({
        title: "Warning",
        description: "Only image files are supported",
        variant: "destructive"
      });
    }
    
    setAdditionalMedia(prev => [...prev, ...imageFiles]);
  };

  const uploadImage = async () => {
    if (!selectedFile) return formData.imageUrl;

    setIsUploading(true);
    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('article-images')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const uploadAdditionalMedia = async () => {
    if (additionalMedia.length === 0) return formData.mediaUrls;

    setIsUploading(true);
    try {
      const uploadedUrls: string[] = [];

      for (const file of additionalMedia) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('article-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('article-images')
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      return [...formData.mediaUrls, ...uploadedUrls];
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "Failed to upload additional media. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.author || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const imageUrl = await uploadImage();
      const mediaUrls = await uploadAdditionalMedia();
      const articleData = { ...formData, imageUrl, mediaUrls };

      if (editingArticle) {
        onEditArticle(editingArticle.id, articleData);
        toast({
          title: "Success",
          description: "Article updated successfully"
        });
      } else {
        onAddArticle(articleData);
        toast({
          title: "Success", 
          description: "Article published successfully"
        });
      }
      
      resetForm();
    } catch (error) {
      // Error already handled in upload functions
    }
  };

  const startEdit = (article: Article) => {
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      author: article.author,
      category: article.category,
      imageUrl: article.imageUrl || "",
      readTime: article.readTime,
      mediaUrls: article.mediaUrls || []
    });
    setEditingArticle(article);
  };

  if (!isOpen) return null;

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader onLogout={onClose} userEmail={userEmail} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your magazine articles and newsletter</p>
        </div>

        <Tabs defaultValue="articles" className="w-full">
          <TabsList>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            <div className="flex items-center justify-end">
              <Button 
                onClick={() => setIsAddingArticle(true)}
                className="bg-accent hover:bg-accent/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Article
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Article Form */}
          {(isAddingArticle || editingArticle) && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingArticle ? "Edit Article" : "Create New Article"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Article title"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      placeholder="Author name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Category *</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => setFormData({...formData, category: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="readTime">Read Time</Label>
                      <Input
                        id="readTime"
                        value={formData.readTime}
                        onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                        placeholder="e.g., 5 min read"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image">Article Image</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="flex-1"
                        />
                        {selectedFile && (
                          <Badge variant="outline" className="whitespace-nowrap">
                            <Upload className="h-3 w-3 mr-1" />
                            {selectedFile.name}
                          </Badge>
                        )}
                      </div>
                      {formData.imageUrl && (
                        <p className="text-xs text-muted-foreground">
                          Current: {formData.imageUrl}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                      placeholder="Brief description of the article"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      placeholder="Full article content. Use [IMAGE:0], [IMAGE:1], etc. to insert additional media at specific positions."
                      rows={8}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Tip: Use [IMAGE:0] to insert the first additional image, [IMAGE:1] for the second, etc.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="additionalMedia">Additional Media (Optional)</Label>
                    <div className="space-y-2">
                      <Input
                        id="additionalMedia"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleAdditionalMediaSelect}
                      />
                      {additionalMedia.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {additionalMedia.map((file, idx) => (
                            <Badge key={idx} variant="outline">
                              <Upload className="h-3 w-3 mr-1" />
                              {file.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {formData.mediaUrls.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          Currently: {formData.mediaUrls.length} uploaded media file(s)
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      type="submit" 
                      className="bg-accent hover:bg-accent/90"
                      disabled={isUploading}
                    >
                      {isUploading ? "Uploading..." : editingArticle ? "Update Article" : "Publish Article"}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Articles List */}
          <Card>
            <CardHeader>
              <CardTitle>Published Articles ({articles.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {articles.map((article) => (
                  <div key={article.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{article.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          By {article.author} • {article.date}
                        </p>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => startEdit(article)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onDeleteArticle(article.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                  </div>
                ))}
                
                {articles.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No articles published yet. Create your first article!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
            </div>
          </TabsContent>

          <TabsContent value="newsletter">
            <NewsletterManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;