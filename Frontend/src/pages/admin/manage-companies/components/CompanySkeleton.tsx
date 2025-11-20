interface Props {}

const CompanySkeleton: React.FC<Props> = ({}) => {
  return (
    <tr className='animate-pulse border-b border-gray-200 odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800'>
      <td
        scope='row'
        className='text-md max-w-[350px] truncate overflow-hidden px-6 py-4 font-semibold whitespace-nowrap text-gray-900 dark:text-white'
      >
        <div className='flex items-center gap-3'>
          <div className='h-10 w-10 rounded-full bg-gray-200 sm:h-12 sm:w-12' />
          <div className='flex flex-col gap-2'>
            <div className='h-4 w-40 rounded bg-gray-200' />
            <div className='flex items-center gap-2'>
              <div className='h-3 w-3 rounded bg-gray-300' />
              <div className='h-3 w-28 rounded bg-gray-100' />
            </div>
          </div>
        </div>
      </td>

      <td
        scope='row'
        className='text-md max-w-[180px] truncate overflow-hidden px-6 py-4 font-semibold whitespace-nowrap text-gray-900 dark:text-white'
      >
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <div className='h-4 w-4 rounded bg-gray-300' />
            <div className='h-4 w-32 rounded bg-gray-200' />
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-3 w-3 rounded bg-gray-300' />
            <div className='h-3 w-36 rounded bg-gray-100' />
          </div>
        </div>
      </td>

      <td className='px-6 py-4'>
        <div className='h-4 w-20 rounded bg-gray-200' />
      </td>

      <td className='px-6 py-4'>
        <div className='h-6 w-20 rounded-full bg-gray-200' />
      </td>

      <td className='px-6 py-4'>
        <div className='flex gap-3'>
          <div className='h-5 w-5 rounded bg-gray-200' />
          <div className='h-5 w-5 rounded bg-gray-200' />
        </div>
      </td>
    </tr>
  );
};

export default CompanySkeleton;
