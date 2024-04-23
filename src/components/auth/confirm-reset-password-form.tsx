'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';



import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';



import { isBrowser } from './auth-guard';


function parseQueryString(queryString: string): { [key: string]: string } {
  const queryParams: { [key: string]: string } = {};
  const queryStringWithoutQuestionMark = queryString.slice(1); // Remove the '?' from the query string
  const params = queryStringWithoutQuestionMark.split('&');

  params.forEach((param) => {
    const [key, value] = param.split('=');
    queryParams[key] = decodeURIComponent(value);
  });

  return queryParams;
}



const schema = zod
  .object({
    password: zod.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: zod.string().min(6, { message: 'Confirmation password must be at least 6 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type Values = zod.infer<typeof schema>;

const defaultValues = { password: '', confirmPassword: '' } as Values;

export function ConfirmResetPasswordForm(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  // const router = useRouter()
  const router = useRouter()
  const { checkSession } = useUser();
  const { token } = isBrowser && parseQueryString(window.location.search) || {};

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.confirmResetPassword(values, token);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }


       // Refresh the auth state
      await checkSession?.();

      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      router.refresh();
    },
    [setError]
  );

  return (
    <Stack spacing={4}>
      <Typography variant="h5">Set New Password</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput {...field} label="Password" type="password" />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormControl error={Boolean(errors.confirmPassword)}>
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput {...field} label="Confirm Password" type="password" />
                {errors.confirmPassword ? <FormHelperText>{errors.confirmPassword.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}

          <Button disabled={isPending} type="submit" variant="contained">
            Update Password
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}