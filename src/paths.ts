export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    employee: '/dashboard/employee',
    admins: '/dashboard/admins',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
    updatePassword: '/dashboard/update-password',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
