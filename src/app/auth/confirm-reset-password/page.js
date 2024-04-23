import * as React from 'react';
import { config } from '@/config';
import { GuestGuard } from '@/components/auth/guest-guard';
import { Layout } from '@/components/auth/layout';
import { ConfirmResetPasswordForm } from '@/components/auth/confirm-reset-password-form';

export const metadata = { title: `Confirm reset password | Auth | ${config.site.name}` };

export default function Page() {
  return (
    <Layout>
      <GuestGuard>
        <ConfirmResetPasswordForm />
      </GuestGuard>
    </Layout>
  );
}
