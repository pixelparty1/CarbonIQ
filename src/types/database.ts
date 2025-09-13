export interface ListedCredit {
  id: string;
  company_name: string;
  project_name: string;
  project_description?: string;
  location?: string;
  total_credits: number;
  remaining_credits: number;
  price_per_credit: number;
  listing_date: string;
  expiration_date?: string;
  status: 'active' | 'expired' | 'sold';
  image_url?: string;
  seller_address?: string;
  royalty_address?: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  buyer_id: string;
  project_id: string;
  credits_amount: number;
  price_per_credit: number;
  total_amount: number;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  tx_hash?: string;
}
