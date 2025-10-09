import { Building2, LayoutDashboard, Package, Plus, User, Users } from 'lucide-react';

const NAVIGATION_MENU = [
  { id: 'recruiter/recruiter-dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'recruiter/post-job', name: 'Post Job', icon: Plus },
  { id: 'recruiter/manage-jobs', name: 'Manage Jobs', icon: LayoutDashboard },
  { id: 'recruiter/manage-company-profile', name: 'Company Profile ', icon: Building2 },
  { id: 'recruiter/manage-package', name: 'Package', icon: Package },
  { id: 'recruiter/candidates', name: 'Candidate', icon: User }
];

const RECRUITER_DASHBOARD_ACTION = [
  {
    title: 'Post New Job',
    icon: Plus,
    color: 'bg-blue-50 text-blue-700',
    path: '/recuiter/post-job'
  },
  {
    title: 'Review Applications',
    icon: Users,
    color: 'bg-green-50 text-green-700',
    path: '/recuiter/manage-jobs'
  },
  {
    title: 'Company Settings',
    icon: Building2,
    color: 'bg-orange-100 text-orange-700',
    path: '/recuiter/compnay-profile'
  }
];
export { NAVIGATION_MENU, RECRUITER_DASHBOARD_ACTION };
