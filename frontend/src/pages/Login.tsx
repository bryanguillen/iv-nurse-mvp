import { useState } from 'react';
import { toast } from 'sonner';

import { ContentContainer, Input, Button } from '@/components';
import { supabase } from '@/config/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendMagicLink = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${location.origin}/`,
        },
      });

      if (error) {
        toast.error(
          'Unable to send magic link. Please contact your representative via email and share this issue with them.'
        );
        return;
      }

      setSent(true);
    } catch (error) {
      toast.error(
        'An unexpected error occurred. Please contact your representative via email and share this issue with them.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <ContentContainer className="max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login with Magic Link</h1>
        {!sent && (
          <div className="space-y-4">
            <Input
              placeholder="Enter your email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              disabled={isLoading}
            />
            <Button
              onClick={sendMagicLink}
              disabled={isLoading || !email.trim()}
              className="w-full"
            >
              {isLoading ? 'Sending...' : 'Send Magic Link'}
            </Button>
          </div>
        )}
        {sent && <p>✅ Magic link sent to {email}! Check your email and spam.</p>}
      </ContentContainer>
    </div>
  );
}
