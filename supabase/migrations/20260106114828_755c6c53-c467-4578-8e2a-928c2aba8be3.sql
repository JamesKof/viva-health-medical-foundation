CREATE POLICY "Allow public select for admin dashboard"
  ON public.donations
  FOR SELECT
  USING (true);