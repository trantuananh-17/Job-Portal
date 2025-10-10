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

const ADDRESS_LOCATION = [
  'Hà Nội',
  'Hà Giang',
  'Cao Bằng',
  'Bắc Kạn',
  'Tuyên Quang',
  'Lào Cai',
  'Điện Biên',
  'Lai Châu',
  'Sơn La',
  'Yên Bái',
  'Hoà Bình',
  'Thái Nguyên',
  'Lạng Sơn',
  'Quảng Ninh',
  'Bắc Giang',
  'Phú Thọ',
  'Vĩnh Phúc',
  'Bắc Ninh',
  'Hải Dương',
  'Hải Phòng',
  'Hưng Yên',
  'Thái Bình',
  'Hà Nam',
  'Nam Định',
  'Ninh Bình',
  'Thanh Hóa',
  'Nghệ An',
  'Hà Tĩnh',
  'Quảng Bình',
  'Quảng Trị',
  'Thừa Thiên Huế',
  'Đà Nẵng',
  'Quảng Nam',
  'Quảng Ngãi',
  'Bình Định',
  'Phú Yên',
  'Khánh Hòa',
  'Ninh Thuận',
  'Bình Thuận',
  'Kon Tum',
  'Gia Lai',
  'Đắk Lắk',
  'Đắk Nông',
  'Lâm Đồng',
  'Bình Phước',
  'Tây Ninh',
  'Bình Dương',
  'Đồng Nai',
  'Bà Rịa - Vũng Tàu',
  'Hồ Chí Minh',
  'Long An',
  'Tiền Giang',
  'Bến Tre',
  'Trà Vinh',
  'Vĩnh Long',
  'Đồng Tháp',
  'An Giang',
  'Kiên Giang',
  'Cần Thơ',
  'Hậu Giang',
  'Sóc Trăng',
  'Bạc Liêu',
  'Cà Mau'
];

export { NAVIGATION_MENU, RECRUITER_DASHBOARD_ACTION, ADDRESS_LOCATION };
