import { Loader } from 'lucide-react';

interface Props {
  type: 'submit' | 'button';
  clasName: string;
  name: string;
  isPending?: boolean;
  onClick: () => void;
}

const ButtonForm: React.FC<Props> = ({ type, clasName, onClick, name, isPending }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isPending}
      className={`xs:w-full rounded-lg px-6 py-4 text-white transition sm:w-fit ${clasName}`}
    >
      {type === 'submit' && isPending ? (
        <>
          <div className={`${isPending ? 'opacity-100' : 'opacity-0'} absolute flex items-center`}>
            <Loader className='mr-2 h-4 w-4 animate-spin' />
            <span>Send...</span>
          </div>
          <span className={`${isPending ? 'opacity-0' : 'opacity-100'}`}>{name}</span>
        </>
      ) : (
        <p>{name}</p>
      )}
    </button>
  );
};

export default ButtonForm;
