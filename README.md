# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/faa4d18c-2d64-41d8-89c2-2b649b55d0bb

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/faa4d18c-2d64-41d8-89c2-2b649b55d0bb) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Three.js (for 3D visualizations)
- Framer Motion (for animations)
- Supabase (for backend services)

## Features

- **Dashboard** - Track carbon emissions and credits
- **Offset Marketplace** - Purchase carbon offsets with credits
- **Bill Upload** - Upload utility bills to calculate carbon footprint
- **Leaderboard** - See how companies compare in carbon reduction
- **3D Visualizations** - Interactive charts and global carbon data

## Supabase Setup

### Tables Required

1. **users** - Created automatically by Supabase Auth
   - Add a `credits` column (integer, default: 0)

2. **offset_credits** - For tracking carbon credit transactions
   ```sql
   CREATE TABLE public.offset_credits (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID NOT NULL REFERENCES auth.users(id),
     method TEXT NOT NULL,
     credits INTEGER NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- Enable RLS
   ALTER TABLE public.offset_credits ENABLE ROW LEVEL SECURITY;
   
   -- Create policies
   CREATE POLICY "Users can view their own credits" 
     ON public.offset_credits FOR SELECT 
     USING (auth.uid() = user_id);
     
   CREATE POLICY "Users can insert their own credits" 
     ON public.offset_credits FOR INSERT 
     WITH CHECK (auth.uid() = user_id);
   ```

3. **bills** - For uploaded bills and carbon calculations
   ```sql
   CREATE TABLE public.bills (
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
     offset_status TEXT DEFAULT 'pending',
     offset_credits INTEGER DEFAULT 0,
     notes TEXT
   );
   
   -- Enable RLS
   ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;
   
   -- Create policies
   CREATE POLICY "Users can view their own bills" 
     ON public.bills FOR SELECT 
     USING (auth.uid() = user_id);
     
   CREATE POLICY "Users can insert their own bills" 
     ON public.bills FOR INSERT 
     WITH CHECK (auth.uid() = user_id);
   ```

4. **Create storage bucket for bills**
   ```sql
   INSERT INTO storage.buckets (id, name, public) 
   VALUES ('bills', 'bills', false)
   ON CONFLICT (id) DO NOTHING;
   
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
   ```

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/faa4d18c-2d64-41d8-89c2-2b649b55d0bb) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
