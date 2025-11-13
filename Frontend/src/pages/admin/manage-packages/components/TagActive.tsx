interface Props {
  isActive?: boolean;
}

const colorActiveTag = [
  {
    key: true,
    label: 'Hoạt động',
    className: 'bg-green-100 border border-green-200 text-green-500'
  },
  {
    key: false,
    label: 'Tạm dừng',
    className: 'bg-red-100 text-red-400 border border-red-200'
  }
];

const TagActive: React.FC<Props> = ({ isActive }) => {
  const tagActive = colorActiveTag.find((c) => c.key === isActive);

  return (
    <div className='flex flex-col items-start gap-2'>
      {tagActive && (
        <span
          className={`inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-medium ${tagActive.className}`}
        >
          {tagActive.label}
        </span>
      )}
    </div>
  );
};

export default TagActive;
