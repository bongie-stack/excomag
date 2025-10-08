-- Create subscribers table for newsletter
CREATE TABLE public.subscribers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  subscribed_at timestamp with time zone NOT NULL DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true
);

-- Enable RLS
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for subscribers
CREATE POLICY "Admins can view all subscribers"
ON public.subscribers
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM profiles p
  WHERE p.user_id = auth.uid() AND p.role = 'admin'
));

CREATE POLICY "Admins can delete subscribers"
ON public.subscribers
FOR DELETE
USING (EXISTS (
  SELECT 1 FROM profiles p
  WHERE p.user_id = auth.uid() AND p.role = 'admin'
));

CREATE POLICY "Anyone can subscribe"
ON public.subscribers
FOR INSERT
WITH CHECK (true);

-- Create newsletter_settings table for admin to manage newsletter content
CREATE TABLE public.newsletter_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_template text NOT NULL DEFAULT 'New Article from ExcoMag Africa',
  email_template text NOT NULL DEFAULT 'Check out our latest article!',
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.newsletter_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for newsletter_settings
CREATE POLICY "Admins can view newsletter settings"
ON public.newsletter_settings
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM profiles p
  WHERE p.user_id = auth.uid() AND p.role = 'admin'
));

CREATE POLICY "Admins can update newsletter settings"
ON public.newsletter_settings
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM profiles p
  WHERE p.user_id = auth.uid() AND p.role = 'admin'
));

CREATE POLICY "Admins can insert newsletter settings"
ON public.newsletter_settings
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM profiles p
  WHERE p.user_id = auth.uid() AND p.role = 'admin'
));

-- Insert default newsletter settings
INSERT INTO public.newsletter_settings (subject_template, email_template)
VALUES (
  'New Article: {{title}} - ExcoMag Africa',
  'Hello!\n\nWe have just published a new article that we think you''ll love:\n\n{{title}}\n{{excerpt}}\n\nRead the full article at: {{url}}\n\nBest regards,\nThe ExcoMag Africa Team'
);