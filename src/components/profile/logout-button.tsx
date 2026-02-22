'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLogout}
      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
    >
      <LogOut className="h-4 w-4 mr-1.5" />
      Logout
    </Button>
  );
}
