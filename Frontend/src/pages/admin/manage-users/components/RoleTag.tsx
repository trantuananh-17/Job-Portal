import { Crown, User, Briefcase } from 'lucide-react';

interface Props {
  role: string;
}

const colorTag = [
  {
    key: 'ADMIN',
    icon: Crown,
    label: 'Admin',
    className: 'bg-red-100 border border-red-300 text-red-700'
  },
  {
    key: 'RECRUITER',
    icon: Briefcase,
    label: 'Recruiter',
    className: 'bg-orange-100 text-orange-700 border border-orange-300'
  },
  {
    key: 'CANDIDATE',
    icon: User,
    label: 'Candidate',
    className: 'bg-blue-100 text-blue-600 border border-blue-300'
  }
];

const RoleTag: React.FC<Props> = ({ role }) => {
  const tag = colorTag.find((c) => c.key === role);

  if (!tag) return null;

  const Icon = tag.icon;

  return (
    <span
      className={`inline-flex items-start justify-center gap-1 rounded-md px-3 py-1 text-xs font-medium ${tag.className}`}
    >
      {Icon && <Icon className='h-4 w-4' />}
      {tag.label}
    </span>
  );
};

export default RoleTag;
