import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Save, Mail } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

interface NewsletterSettings {
  id: string;
  subject_template: string;
  email_template: string;
}

const NewsletterManager = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [settings, setSettings] = useState<NewsletterSettings | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSubscribers();
    fetchSettings();
  }, []);

  const fetchSubscribers = async () => {
    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .eq('is_active', true)
      .order('subscribed_at', { ascending: false });

    if (error) {
      console.error('Error fetching subscribers:', error);
    } else {
      setSubscribers(data || []);
    }
  };

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('newsletter_settings')
      .select('*')
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching settings:', error);
    } else {
      setSettings(data);
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    const { error } = await supabase
      .from('subscribers')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to remove subscriber",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Subscriber Removed",
        description: "Subscriber has been removed successfully"
      });
      fetchSubscribers();
    }
  };

  const handleSaveSettings = async () => {
    if (!settings) return;

    setIsLoading(true);
    const { error } = await supabase
      .from('newsletter_settings')
      .update({
        subject_template: settings.subject_template,
        email_template: settings.email_template,
        updated_at: new Date().toISOString()
      })
      .eq('id', settings.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Settings Saved",
        description: "Newsletter template has been updated successfully"
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Newsletter Settings
          </CardTitle>
          <CardDescription>
            Customize the email template sent to subscribers when a new article is published.
            Use {'{{title}}'}, {'{{excerpt}}'}, and {'{{url}}'} as placeholders.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {settings && (
            <>
              <div className="space-y-2">
                <Label htmlFor="subject">Email Subject Template</Label>
                <Input
                  id="subject"
                  value={settings.subject_template}
                  onChange={(e) => setSettings({ ...settings, subject_template: e.target.value })}
                  placeholder="New Article: {{title}}"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template">Email Body Template</Label>
                <Textarea
                  id="template"
                  value={settings.email_template}
                  onChange={(e) => setSettings({ ...settings, email_template: e.target.value })}
                  placeholder="Email template..."
                  className="min-h-[200px]"
                />
              </div>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Template"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscribers ({subscribers.length})</CardTitle>
          <CardDescription>
            Manage your newsletter subscribers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {subscribers.length === 0 ? (
              <p className="text-muted-foreground text-sm">No subscribers yet.</p>
            ) : (
              subscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div>
                    <p className="font-medium">{subscriber.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Subscribed on {new Date(subscriber.subscribed_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteSubscriber(subscriber.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterManager;
