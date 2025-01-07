import { useAuthenticationStatus, useSignInEmailPassword, useSignUpEmailPassword } from '@nhost/react';
import { useState } from 'react';

export function useAuth() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const { signInEmailPassword, isLoading: isSigningIn, error: signInError } = useSignInEmailPassword();
  const { signUpEmailPassword, isLoading: isSigningUp, error: signUpError } = useSignUpEmailPassword();
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await signInEmailPassword(email, password);
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('An error occurred during sign in');
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await signUpEmailPassword(email, password);
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('An error occurred during sign up');
    }
  };

  return {
    isAuthenticated,
    isLoading: isLoading || isSigningIn || isSigningUp,
    error,
    signIn,
    signUp
  };
}