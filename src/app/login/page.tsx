
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Eye, EyeOff, LoaderCircle, Mail, Lock } from 'lucide-react';
import { Logo } from '@/components/icons/logo';

function BackgroundDoodle() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full text-gray-200/40 dark:text-gray-800/40 [mask-image:radial-gradient(farthest-side_at_50%_50%,_white,_transparent)]"
    >
      <defs>
        <pattern
          id="doodle"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <path
            d="M 5 5 V 35 H 35"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#doodle)"></rect>
    </svg>
  );
}


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
      setError('Supabase client is not configured. Please check your environment variables.');
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
      <div className="flex h-screen w-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <AlertTitle className="text-xl font-bold">Configuration Error</AlertTitle>
          </CardHeader>
          <CardContent>
            <AlertDescription>
              Supabase environment variables are missing or invalid. Please check your <code>.env.local</code> file.
              <div className="mt-4 rounded-md bg-muted p-4 font-mono text-sm">
                <p>NEXT_PUBLIC_SUPABASE_URL=...co</p>
                <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=...</p>
              </div>
            </AlertDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-background">
      {/* Left side: Image (visible on large screens) */}
      <div className="absolute left-0 top-0 hidden h-full w-1/2 lg:block">
        <Image
          src="/login/new2.png"
          alt="Abstract background image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right side: Login Form */}
      <div className="relative w-full lg:ml-[50%] lg:w-1/2">
        <div className="flex h-full items-center justify-center p-8">
          
          <BackgroundDoodle />

          <div className="relative z-10 mx-auto grid w-[380px] gap-6">
            <div className="grid gap-3 text-center">
               <div className="flex items-center justify-center gap-2 font-semibold">
                  <Logo className="h-7 w-7 text-primary" />
                  <span className="text-2xl">Zentry Insights</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
              <p className="text-balance text-muted-foreground">
                Enter your credentials to access your dashboard.
              </p>
            </div>
            <form onSubmit={handleLogin} className="grid gap-4">
              {error && (
                  <Alert variant="destructive">
                    <AlertTitle>Login Failed</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
              )}
              <div className="grid gap-2">
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
                          className="pl-10 h-11 text-base"
                      />
                  </div>
              </div>
              <div className="grid gap-2">
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
                        className="pl-10 pr-10 h-11 text-base"
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
              </div>
              <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
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
      </div>
    </div>
  );
}
