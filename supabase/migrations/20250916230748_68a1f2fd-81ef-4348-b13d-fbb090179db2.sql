-- Create medias table
CREATE TABLE public.medias (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'audio', 'video')),
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration INTEGER, -- for audio/video files in seconds
  file_size BIGINT, -- file size in bytes
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.medias ENABLE ROW LEVEL SECURITY;

-- Create policies for medias (public read access)
CREATE POLICY "Medias are viewable by everyone" 
ON public.medias 
FOR SELECT 
USING (true);

CREATE POLICY "Only authenticated admins can manage medias" 
ON public.medias 
FOR ALL
USING (false);

-- Create contacts table
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'nouveau' CHECK (status IN ('nouveau', 'lu', 'traite')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for contacts
CREATE POLICY "Users can submit contact forms" 
ON public.contacts 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only authenticated admins can view contacts" 
ON public.contacts 
FOR SELECT
USING (false);

-- Create trigger for automatic timestamp updates on both tables
CREATE TRIGGER update_medias_updated_at
BEFORE UPDATE ON public.medias
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at
BEFORE UPDATE ON public.contacts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();