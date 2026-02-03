'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/features/auth/model/use-login';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { useSessionStore } from '@/entities/session/model/store';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setAccessToken = useSessionStore((state) => state.setAccessToken);
  
  const { mutate: login, isPending: isLoading, error: loginError } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    login(
      { email, password },
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
        id="email"
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="name@example.com"
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
    </form>
  );
}
