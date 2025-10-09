interface Props {
  className?: string;
}

const JobCardSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <li className='flex animate-pulse flex-col gap-7 rounded-[20px] bg-white p-10 shadow-md dark:bg-neutral-800'>
      {/* Phần trên: Thời gian + Bookmark */}
      <div className='flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
          <div className='h-6 w-24 rounded-xl bg-neutral-200 dark:bg-neutral-700' />
          <div className='h-6 w-6 rounded bg-neutral-200 dark:bg-neutral-700' />
        </div>

        {/* Logo + Tiêu đề + Tên công ty */}
        <div className='flex flex-col items-start gap-5 md:flex-row md:items-center'>
          <div className='h-10 w-10 rounded-xl bg-neutral-200 dark:bg-neutral-700' />

          <div className='flex w-full max-w-[250px] flex-col gap-2 md:max-w-none'>
            <div className='h-5 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700' />
            <div className='h-4 w-1/2 rounded bg-neutral-200 dark:bg-neutral-700' />
          </div>
        </div>
      </div>

      {/* Phần dưới: Chi tiết việc làm + Button */}
      <div className='text-primary flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between'>
        <ul className='flex w-full flex-col gap-6 md:flex-row'>
          <li className='flex items-center gap-3'>
            <div className='h-5 w-5 rounded bg-neutral-200 dark:bg-neutral-700' />
            <div className='h-4 w-20 rounded bg-neutral-200 dark:bg-neutral-700' />
          </li>
          <li className='flex items-center gap-3'>
            <div className='h-5 w-5 rounded bg-neutral-200 dark:bg-neutral-700' />
            <div className='h-4 w-24 rounded bg-neutral-200 dark:bg-neutral-700' />
          </li>
          <li className='flex items-center gap-3'>
            <div className='h-5 w-5 rounded bg-neutral-200 dark:bg-neutral-700' />
            <div className='h-4 w-28 rounded bg-neutral-200 dark:bg-neutral-700' />
          </li>
        </ul>

        {/* Nút */}
        <div className='h-10 w-32 rounded-lg bg-neutral-200 sm:self-end dark:bg-neutral-700' />
      </div>
    </li>
  );
};

export default JobCardSkeleton;
