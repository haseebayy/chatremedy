'use client';

import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Card, CardContent } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { config } from '@/config';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';
import { AccountDetailsForm } from '@/components/dashboard/account/account-details-form';
import { AccountInfo } from '@/components/dashboard/account/account-info';
import EditUser from '@/components/dashboard/form/edit-user';

export default function Page(): React.JSX.Element {
  const { AllUsers } = useUser();
  const { slug } = useParams();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const user = AllUsers?.find(({ id }: any) => id === slug);

    setUser(user);
  }, [AllUsers]);

  return <>{user && <EditUser user={user} />}</>;
}
