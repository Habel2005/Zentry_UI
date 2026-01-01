
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Logo } from '@/components/icons/logo';
import Image from 'next/image';
import { Eye, EyeOff, LoaderCircle, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!isSupabaseConfigured) {
      setError(
        'Supabase client is not initialized. Please check your environment variables.'
      );
      setLoading(false);
      return;
    }
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (!isSupabaseConfigured) {
    return (
        <div className="flex h-screen items-center justify-center bg-background p-4">
            <div className="w-full max-w-lg p-8 space-y-4 bg-card text-card-foreground rounded-lg shadow-lg">
                <Alert variant="destructive">
                    <h5 className="mb-1 font-medium leading-none tracking-tight">Configuration Error</h5>
                    <div className="text-sm [&_p]:leading-relaxed">
                        Your Supabase environment variables are missing or invalid. Please create or check your <code>.env.local</code> file and ensure that <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> are set correctly.
                        <div className="p-4 mt-4 rounded-md bg-muted text-sm font-mono">
                            <p>NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co</p>
                            <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key</p>
                        </div>
                    </div>
                </Alert>
            </div>
        </div>
    );
  }

  return (
    <div className="dark h-screen w-screen flex items-center justify-center bg-background">
      <Image
        src="https://picsum.photos/seed/loginbg/1920/1080"
        alt="Abstract background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-50"
        data-ai-hint="abstract fluid blue"
      />
      <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-card/60 backdrop-blur-lg border border-border/20 rounded-2xl shadow-2xl">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Logo className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Zentry Insights</h1>
          </div>
          <p className="text-muted-foreground">
            Welcome back. Please sign in to continue.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
              className="pl-10 h-12 bg-background/50 border-border/30 focus:bg-background"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
              className="pl-10 pr-10 h-12 bg-background/50 border-border/30 focus:bg-background"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
              disabled={loading}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={loading}>
            {loading ? (
              <>
                <LoaderCircle className="animate-spin mr-2" />
                <span>Signing In...</span>
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
