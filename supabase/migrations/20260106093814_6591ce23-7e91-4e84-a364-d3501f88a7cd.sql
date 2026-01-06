-- Create payment_logs table for storing Hubtel API responses
CREATE TABLE public.payment_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  payment_reference TEXT NOT NULL,
  log_type TEXT NOT NULL,
  request_data JSONB,
  response_data JSONB,
  status_code INTEGER,
  error_message TEXT
);

-- Add indexes for faster lookups
CREATE INDEX idx_payment_logs_reference ON public.payment_logs(payment_reference);
CREATE INDEX idx_payment_logs_created_at ON public.payment_logs(created_at DESC);

-- Enable RLS
ALTER TABLE public.payment_logs ENABLE ROW LEVEL SECURITY;

-- Allow edge functions to insert logs
CREATE POLICY "Edge functions can insert logs"
  ON public.payment_logs
  FOR INSERT
  WITH CHECK (true);

-- Add hubtel_invoice_id to donations table
ALTER TABLE public.donations 
ADD COLUMN IF NOT EXISTS hubtel_invoice_id TEXT;