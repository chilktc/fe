'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignup } from '@/features/auth/model/use-signup';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

export function SignupForm() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  
  const { mutate: signup, isPending: isLoading, error: signupError } = useSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    signup(
      { loginId: id, password },
      {
        onSuccess: () => {
          alert('Signup successful! Please log in.');
          router.push('/login');
        },
      }
    );
  };
  
  const errorMessage = signupError instanceof Error ? signupError.message : 'Failed to signup';

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign Up</h2>
      
      {signupError && (
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
        {isLoading ? 'Signing up...' : 'Sign Up'}
      </Button>

      <div className="mt-4 text-center">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push('/login')}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Already have an account? Log in
        </Button>
      </div>
    </form>
  );
}
