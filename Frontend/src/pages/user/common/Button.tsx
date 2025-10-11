interface Props {
  full: boolean;
  name: string;
  onClick?: () => void;
  className: string;
}

const Button: React.FC<Props> = ({ name, full, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className={`self-start rounded-lg px-5 py-3.5 font-semibold text-white ${full ? 'w-full md:w-auto' : ''} ${className}`}
    >
      {name}
    </button>
  );
};

export default Button;
