interface Props {}

const TableRowSkeleton: React.FC<Props> = ({}) => {
  return (
    <tr className='animate-pulse border-b border-gray-200 odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800'>
      <th scope='row' className='text-md px-6 py-4 font-semibold whitespace-nowrap text-gray-900 dark:text-white'>
        <div className='h-4 w-32 rounded bg-gray-200 dark:bg-gray-700'></div>
      </th>

      <td className='px-6 py-4'>
        <div className='h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700'></div>
      </td>

      <td className='px-6 py-4'>
        <div className='h-4 w-16 rounded bg-gray-200 dark:bg-gray-700'></div>
      </td>

      <td className='px-6 py-4'>
        <div className='h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700'></div>
      </td>

      <td className='flex gap-2 px-6 py-4'>
        <div className='h-5 w-5 rounded bg-gray-200 dark:bg-gray-700'></div>
        <div className='h-5 w-5 rounded bg-gray-200 dark:bg-gray-700'></div>
      </td>
    </tr>
  );
};

export default TableRowSkeleton;
