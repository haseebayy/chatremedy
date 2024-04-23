import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';





export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'employee', title: 'Counsellor', href: paths.dashboard.employee, icon: 'users' },
  // { key: 'admins', title: 'Admins', href: paths.dashboard.admins, icon: 'users' },
  { key: 'update', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  // { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];