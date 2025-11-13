interface Props {}

const JobsSkeleton: React.FC<Props> = ({}) => {
  return (
    <tr className='border-b border-gray-200 odd:bg-white even:bg-gray-50'>
      <td className='px-6 py-4'>
        <div className='h-4 w-32 animate-pulse rounded bg-gray-200'></div>
      </td>
      <td className='px-6 py-4'>
        <div className='h-4 w-24 animate-pulse rounded bg-gray-200'></div>
      </td>
      <td className='px-6 py-4'>
        <div className='h-4 w-20 animate-pulse rounded bg-gray-200'></div>
      </td>
      <td className='px-6 py-4'>
        <div className='mb-2 h-4 w-24 animate-pulse rounded bg-gray-200'></div>
        <div className='h-4 w-28 animate-pulse rounded bg-gray-200'></div>
      </td>

      <td className='px-6 py-4'>
        <div className='h-5 w-24 animate-pulse rounded-full bg-gray-200'></div>
      </td>
      <td className='px-6 py-4'>
        <div className='flex gap-2'>
          <div className='h-5 w-5 animate-pulse rounded bg-gray-200'></div>
          <div className='h-5 w-5 animate-pulse rounded bg-gray-200'></div>
        </div>
      </td>
    </tr>
  );
};

export default JobsSkeleton;
