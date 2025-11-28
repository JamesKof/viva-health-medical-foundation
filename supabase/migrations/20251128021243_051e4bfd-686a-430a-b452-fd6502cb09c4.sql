-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  image_url TEXT,
  max_attendees INTEGER,
  is_upcoming BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create event registrations table
CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create donations table for tracking Paystack payments
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  donor_name TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'GHS',
  payment_reference TEXT UNIQUE NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  donation_type TEXT DEFAULT 'one-time',
  subscription_code TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Events are publicly readable
CREATE POLICY "Events are publicly viewable" 
ON public.events 
FOR SELECT 
USING (true);

-- Event registrations can be created by anyone
CREATE POLICY "Anyone can register for events" 
ON public.event_registrations 
FOR INSERT 
WITH CHECK (true);

-- Donations can be created by the webhook (using service role)
CREATE POLICY "Donations can be created via webhook" 
ON public.donations 
FOR INSERT 
WITH CHECK (true);

-- Donations can be updated via webhook
CREATE POLICY "Donations can be updated via webhook" 
ON public.donations 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for timestamp updates
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_donations_updated_at
BEFORE UPDATE ON public.donations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample upcoming events
INSERT INTO public.events (title, description, location, event_date, end_date, is_upcoming) VALUES
('Medical Outreach 2025', 'Free health screenings including blood pressure, dental, and eye tests for the community.', 'Kasoa Community Center, Ghana', '2025-02-15 09:00:00+00', '2025-02-15 17:00:00+00', true),
('Health Education Workshop', 'Learn about preventive healthcare, nutrition, and mental wellness from our medical professionals.', 'Accra Girls Senior High School', '2025-03-10 10:00:00+00', '2025-03-10 14:00:00+00', true),
('Blood Donation Drive', 'Join us in saving lives through blood donation. Free health check for all donors.', 'Tema General Hospital', '2025-04-05 08:00:00+00', '2025-04-05 16:00:00+00', true);