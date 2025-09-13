import { createClient } from '@supabase/supabase-js'

// Use hardcoded values as fallback if environment variables are not available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://crbmzqqqokkpircxwwhn.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyYm16cXFxb2trcGlyY3h3d2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0ODM4MDMsImV4cCI6MjA3MzA1OTgwM30.C3KjyEx9novczGUYRy3fEkLlIj61L1EB072LR9JRTMs";

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase environment variables are missing from .env file. Using hardcoded fallback values instead.');
}

// Verify that the API key is in the correct format
if (!supabaseKey || typeof supabaseKey !== 'string' || supabaseKey.trim() === '') {
  console.error('ERROR: Invalid Supabase API key format. Authentication will fail.');
} else {
  console.log('Initializing Supabase client with URL:', supabaseUrl);
  console.log('API key appears valid (length):', supabaseKey.length > 30 ? 'Yes' : 'No');
}

// Create client with better options for reliability and debugging
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    // Explicitly set storage mechanism
    storage: {
      getItem: (key) => {
        const item = localStorage.getItem(key);
        console.log(`Auth storage: Retrieved key ${key}`, item ? "Found" : "Not found");
        return item;
      },
      setItem: (key, value) => {
        console.log(`Auth storage: Setting key ${key}`);
        localStorage.setItem(key, value);
      },
      removeItem: (key) => {
        console.log(`Auth storage: Removing key ${key}`);
        localStorage.removeItem(key);
      }
    }
  },
  global: {
    headers: {
      'x-application-name': 'CarbonIQ',
      // Always include the API key in the headers
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    },
    fetch: (...args) => {
      // Use a more reliable fetch with timeout and logging
      const [resource, config] = args;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.error('Supabase request timeout after 30 seconds:', resource);
        controller.abort();
      }, 30000); // 30 second timeout
      
      const startTime = Date.now();
      console.log(`Supabase request to: ${resource instanceof Request ? resource.url : resource}`);
      
      // Ensure API key is included in every request
      const headers = {
        ...config?.headers,
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Cache-Control': 'no-cache, no-store'
      };
      
      return fetch(resource, {
        ...config,
        signal: controller.signal,
        headers
      })
      .then(response => {
        const elapsed = Date.now() - startTime;
        if (!response.ok) {
          console.error(`Supabase request failed: ${response.status} ${response.statusText} (${elapsed}ms)`, resource);
        } else {
          console.log(`Supabase request succeeded: ${response.status} (${elapsed}ms)`);
        }
        return response;
      })
      .catch(err => {
        console.error('Supabase request error:', err, resource);
        throw err;
      })
      .finally(() => clearTimeout(timeoutId));
    }
  },
  // Add direct client options
  db: {
    schema: 'public'
  }
});

// Helper function to diagnose Supabase authentication issues
export const checkSupabaseAuth = async () => {
  try {
    console.log('Testing Supabase authentication setup...');
    
    // Check if API key is properly set
    console.log('API Key:', supabaseKey ? 'Set' : 'Missing');
    
    // Try a simple authentication call
    const { data, error } = await supabase.auth.getSession();
    
    console.log('Auth Check Result:', error ? 'Failed' : 'Success');
    console.log('Session:', data?.session ? 'Active' : 'None');
    
    if (error) {
      console.error('Auth Error Details:', error);
      return {
        success: false,
        error: error.message,
        details: {
          apiKeySet: !!supabaseKey,
          errorCode: error.status,
          errorMessage: error.message
        }
      };
    }
    
    return {
      success: true,
      session: data.session ? 'Active' : 'None',
      details: {
        apiKeySet: !!supabaseKey,
      }
    };
  } catch (err: any) {
    console.error('Unexpected error during auth check:', err);
    return {
      success: false,
      error: err.message,
      details: {
        apiKeySet: !!supabaseKey,
        exception: err.toString()
      }
    };
  }
};
