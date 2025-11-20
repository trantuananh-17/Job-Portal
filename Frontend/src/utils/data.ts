import { Briefcase, Building2, FileText, LayoutDashboard, Package, Plus, User, Users, Users2 } from 'lucide-react';

const NAVIGATION_MENU = [
  { id: 'recruiter/recruiter-dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'recruiter/post-job', name: 'Post Job', icon: Plus },
  { id: 'recruiter/manage-jobs', name: 'Manage Jobs', icon: LayoutDashboard },
  { id: 'recruiter/manage-company-profile', name: 'Company Profile ', icon: Building2 },
  { id: 'recruiter/manage-package', name: 'Package', icon: Package },
  { id: 'recruiter/candidates', name: 'Candidate', icon: User }
];

const ADMIN_NAVIGATION_MENU = [
  { id: 'admin/admin-dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'admin/manage-jobs', name: 'Quản lý công việc', icon: Briefcase },
  { id: 'admin/manage-companies', name: 'Quản lý công ty ', icon: Building2 },
  { id: 'admin/manage-users', name: 'Quản lý người dùng ', icon: Users2 },
  { id: 'admin/manage-packages', name: 'Quản lý dịch vụ', icon: Package },
  { id: 'admin/manage-orders', name: 'Quản lý đơn hàng', icon: FileText }
];

const RECRUITER_DASHBOARD_ACTION = [
  {
    title: 'Post New Job',
    icon: Plus,
    color: 'bg-blue-50 text-blue-700',
    path: '/recruiter/post-job'
  },
  {
    title: 'Review Applications',
    icon: Users,
    color: 'bg-green-50 text-green-700',
    path: '/recruiter/manage-jobs'
  },
  {
    title: 'Company Settings',
    icon: Building2,
    color: 'bg-orange-100 text-orange-700',
    path: '/recruiter/compnay-profile'
  }
];

const FORM_TAB = [
  { id: 'job-info', label: 'Thông tin công việc' },
  { id: 'requirement', label: 'Yêu cầu' }
];

const JOB_LEVEL_ITEM = ['Internship', 'Fresher', 'Junior', 'Mid-level', 'Senior', 'Tech Lead'];

const STATUS_FILTER = [
  { key: 'all', label: 'All Status' },
  { key: 'pending', label: 'Pending' },
  { key: 'active', label: 'Active' },
  { key: 'expired', label: 'Expired' },
  { key: 'rejected', label: 'Rejected' }
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

const ROLE_FILTER = [
  { key: 'all', label: 'Tất cả vai trò' },
  { key: 'recruiter', label: 'Nhà tuyển dụng' },
  { key: 'candidate', label: 'Ứng viên' }
];

const ACTIVE_FILTER = [
  { key: 'all', label: 'Tất cả trạng thái' },
  { key: 'true', label: 'Đang hoạt động' },
  { key: 'false', label: 'Ngừng hoạt động' }
];

const VERIFIED_FILTER = [
  { key: 'all', label: 'Tất cả xác minh' },
  { key: 'true', label: 'Đã xác minh' },
  { key: 'false', label: 'Chưa xác minh' }
];

const ORDER_STATUS_FILTER = [
  { key: 'all', label: 'Tất cả trạng thái' },
  { key: 'pending', label: 'Chờ thanh toán' },
  { key: 'success', label: 'Thành công' },
  { key: 'failed', label: 'Thất bại' }
];

const SORT_ORDER = [
  { key: 'asc', label: 'Sắp xếp tăng dần' },
  { key: 'desc', label: 'Sắp xếp giảm dần' }
];

const ORDER_DATE_FILTER = [
  { key: 'all', label: 'Tất cả thời gian' },
  { key: '3d', label: '3 ngày gần đây' },
  { key: '7d', label: '7 ngày gần đây' },
  { key: '14d', label: '14 ngày gần đây' },
  { key: '30d', label: '30 ngày gần đây' }
];

export {
  ACTIVE_FILTER,
  ADDRESS_LOCATION,
  ADMIN_NAVIGATION_MENU,
  FORM_TAB,
  JOB_LEVEL_ITEM,
  NAVIGATION_MENU,
  ORDER_DATE_FILTER,
  ORDER_STATUS_FILTER,
  RECRUITER_DASHBOARD_ACTION,
  ROLE_FILTER,
  SORT_ORDER,
  STATUS_FILTER,
  VERIFIED_FILTER
};
