interface Props {
  isActive?: boolean;
  isVerified?: boolean;
}

const colorActiveTag = [
  {
    key: true,
    label: 'Hoạt động',
    className: 'bg-green-100 border border-green-200 text-green-500'
  },
  {
    key: false,
    label: 'Bị khóa',
    className: 'bg-red-100 text-red-400 border border-red-200'
  }
];

const colorVerifiedTag = [
  {
    key: false,
    label: 'Chưa xác minh',
    className: 'bg-orange-100 border border-orange-200 text-orange-400'
  },
  {
    key: true,
    label: 'Đã xác minh',
    className: 'bg-blue-100 text-blue-400 border border-blue-200'
  }
];

const Tag: React.FC<Props> = ({ isActive, isVerified }) => {
  const tagActive = colorActiveTag.find((c) => c.key === isActive);
  const tagVerified = colorVerifiedTag.find((c) => c.key === isVerified);

  return (
    <div className='flex flex-col items-start gap-2'>
      {tagActive && (
        <span
          className={`inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-medium ${tagActive.className}`}
        >
          {tagActive.label}
        </span>
      )}

      {tagVerified && (
        <span
          className={`inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-medium ${tagVerified.className}`}
        >
          {tagVerified.label}
        </span>
      )}
    </div>
  );
};

export default Tag;
