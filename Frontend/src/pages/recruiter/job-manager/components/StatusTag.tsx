interface Props {
  status: string;
}
const colorTag = [
  { key: 'ACTIVE', label: 'Active', className: 'bg-emerald-200 text-emerald-700 border border-emerald-200' },
  { key: 'PENDING', label: 'Pending', className: 'bg-amber-200 text-amber-700 border border-amber-200' },
  { key: 'EXPIRED', label: 'Expired', className: 'bg-gray-200 text-gray-600 border border-gray-200' },
  { key: 'REJECT', label: 'Reject', className: 'bg-rose-200 text-rose-700 border border-rose-200' }
];

const StatusTag: React.FC<Props> = ({ status }) => {
  return (
    <span
      className={`inline-flex min-w-[90px] items-center justify-center rounded-full px-2 py-2 text-xs font-medium ${
        colorTag.find((c) => c.key === status)?.className || 'bg-gray-300'
      }`}
    >
      {colorTag.find((c) => c.key === status)?.label || status}
    </span>
  );
};

export default StatusTag;
