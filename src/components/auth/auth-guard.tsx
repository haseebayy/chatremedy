'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';
import * as io from 'socket.io-client';



import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';





export const isBrowser = typeof window !== 'undefined';

export interface AuthGuardProps {
  children: React.ReactNode;
}

// Create a socket connection to your server with authentication token

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, error, isLoading, setState, getAllUser } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (error) {
      setIsChecking(false);
      return;
    }

    if (!user) {
      logger.debug('[AuthGuard]: User is not logged in, redirecting to sign in');
      router.replace(paths.auth.signIn);
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [user, error, isLoading]);
  React.useEffect(() => {
    const socket = io.connect(process.env.NEXT_PUBLIC_SOCKET_API_HOST || 'http://localhost:8080', {
      extraHeaders: {
        'ngrok-skip-browser-warning': 'true',
      },
      auth: {
        token: localStorage.getItem('custom-auth-token'),
      },
    });

    socket.on('connect', () => {
      console.log('Socket connect');
    });

    socket.on('userUpdate', (AllActiveUsers) => {
      getAllUser();
      setState((prev: any) => ({ ...prev, AllActiveUsers }));
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  if (isChecking) {
    return null;
  }

  if (error) {
    return <Alert color="error">{error}</Alert>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}