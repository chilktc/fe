'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/features/auth/model/use-login';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { useSessionStore } from '@/entities/session/model/store';

export function LoginForm() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const setAccessToken = useSessionStore((state) => state.setAccessToken);
  
  const { mutate: login, isPending: isLoading, error: loginError } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    login(
      { loginId: id, password },
      {
        onSuccess: (data) => {
          setAccessToken(data.token);
          router.push('/');
        },
      }
    );
  };
  
  const errorMessage = loginError instanceof Error ? loginError.message : 'Failed to login';

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
      
      {loginError && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded">
          {errorMessage}
        </div>
      )}

      <Input
        id="id"
        type="text"
        label="Id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="아이디"
        required
        disabled={isLoading}
      />
      
      <Input
        id="password"
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={isLoading}
      />

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full mb-2"
        onClick={() => router.push('/signup')}
        disabled={isLoading}
      >
        Sign Up
      </Button>

      <Button
        type="button"
        variant="secondary"
        className="w-full flex justify-center items-center gap-2"
        onClick={() => window.location.href = '/api/oauth/google'}
        disabled={isLoading}
      >
        {/* Google SVG Icon */}
        <svg className="h-4 w-4" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
        </svg>
        Google
      </Button>
    </form>
  );
}
