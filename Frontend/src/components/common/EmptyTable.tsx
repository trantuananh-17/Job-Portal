import { Search } from 'lucide-react';

interface Props {
  name: string;
}

const EmptyTable: React.FC<Props> = ({ name }) => {
  return (
    <div className='py-12 text-center'>
      <div className='m,b-4 mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100'>
        <Search className='h-10 w-10 text-gray-400' />
      </div>
      <h3 className='mb-2 text-lg font-medium text-gray-900'>No {name} found</h3>
      <p className='sm:text-md text-sm text-gray-500'>Try adjusting your search or filter criteria.</p>
    </div>
  );
};

export default EmptyTable;
