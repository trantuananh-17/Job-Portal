import { Crown, User, Briefcase, XCircle, CheckCircle2, Clock, Ban } from 'lucide-react';

interface Props {
  status: string;
}

const colorTag = [
  {
    key: 'PENDING',
    icon: Clock,
    label: 'Đang chờ',
    className: 'bg-orange-100 text-orange-700 border border-orange-300'
  },
  {
    key: 'ACTIVE',
    icon: CheckCircle2,
    label: 'Hoạt động',
    className: 'bg-green-100 border border-green-300 text-green-700'
  },
  {
    key: 'REJECT',
    icon: XCircle,
    label: 'Từ chối',
    className: 'bg-red-100 text-red-600 border border-red-300'
  },
  {
    key: 'INACTIVE',
    icon: Ban,
    label: 'Bị khóa',
    className: 'bg-gray-200 border border-gray-300 text-gray-700'
  }
];

const TagStatus: React.FC<Props> = ({ status }) => {
  const tag = colorTag.find((c) => c.key === status);

  if (!tag) return null;

  const Icon = tag.icon;

  return (
    <span
      className={`inline-flex items-start justify-center gap-1 rounded-md px-3 py-1 text-xs font-medium ${tag.className} whitespace-nowrap`}
    >
      {Icon && <Icon className='h-4 w-4' />}
      {tag.label}
    </span>
  );
};

export default TagStatus;
