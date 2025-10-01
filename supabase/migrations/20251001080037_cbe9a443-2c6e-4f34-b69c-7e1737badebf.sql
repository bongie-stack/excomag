-- Update the handle_new_user function to assign admin role by default
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, display_name, role)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    'admin'  -- Changed from 'user' to 'admin'
  );
  RETURN new;
END;
$$;