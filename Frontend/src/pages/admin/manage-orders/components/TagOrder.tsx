import { Crown, User, Briefcase, XCircle, CheckCircle2, Clock } from 'lucide-react';

interface Props {
  status: string;
}

const colorTag = [
  {
    key: 'SUCCESS',
    icon: CheckCircle2,
    label: 'Thành công',
    className: 'bg-green-100 border border-green-300 text-green-700'
  },
  {
    key: 'PENDING',
    icon: Clock,
    label: 'Đang chờ',
    className: 'bg-orange-100 text-orange-700 border border-orange-300'
  },
  {
    key: 'FAILED',
    icon: XCircle,
    label: 'Đã hủy',
    className: 'bg-red-100 text-red-600 border border-red-300'
  }
];

const TagOrder: React.FC<Props> = ({ status }) => {
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

export default TagOrder;
