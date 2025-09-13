-- Create bills table
CREATE TABLE IF NOT EXISTS public.bills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  bill_type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  date DATE NOT NULL,
  carbon_footprint NUMERIC NOT NULL,
  credits_required INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Optional fields
  offset_status TEXT DEFAULT 'pending', -- 'pending', 'partially_offset', 'fully_offset'
  offset_credits INTEGER DEFAULT 0, -- Number of credits used to offset this bill
  notes TEXT
);

-- Create storage bucket for bills
INSERT INTO storage.buckets (id, name, public) 
VALUES ('bills', 'bills', false)
ON CONFLICT (id) DO NOTHING;

-- Set up Row Level Security (RLS)
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own bills
CREATE POLICY "Users can view their own bills" ON public.bills
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own bills
CREATE POLICY "Users can insert their own bills" ON public.bills
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own bills
CREATE POLICY "Users can update their own bills" ON public.bills
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own bills
CREATE POLICY "Users can delete their own bills" ON public.bills
  FOR DELETE USING (auth.uid() = user_id);

-- Storage RLS policies
CREATE POLICY "Users can upload bills" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (
    bucket_id = 'bills' AND
    (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can view their own bills" ON storage.objects
  FOR SELECT TO authenticated USING (
    bucket_id = 'bills' AND
    (storage.foldername(name))[1] = auth.uid()::text
);
