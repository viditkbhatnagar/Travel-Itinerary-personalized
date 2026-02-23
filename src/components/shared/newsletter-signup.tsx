'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { MetalButton } from '@/components/ui/metal-button';
import { cn } from '@/lib/utils';

interface NewsletterSignupProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function NewsletterSignup({ className, variant = 'light' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={cn('text-center py-4', className)}>
        <p className={cn('text-sm font-medium', variant === 'dark' ? 'text-white' : 'text-forest')}>
          Thanks for subscribing! Check your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex gap-2', className)}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className={cn(
          'flex-1 h-11 px-4 rounded-xl text-sm focus:outline-none focus:ring-2',
          variant === 'dark'
            ? 'bg-white/10 text-white placeholder:text-white/50 border border-white/20 focus:ring-white/30'
            : 'neu-input focus:ring-forest-300'
        )}
      />
      <MetalButton
        type="submit"
        variant={variant === 'dark' ? 'default' : 'primary'}
      >
        Subscribe
        <Send className="h-4 w-4 ml-1" />
      </MetalButton>
    </form>
  );
}
