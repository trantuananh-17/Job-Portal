interface Props {
  name: string;
  className: string;
  onClick?: () => void;
}

const ButtonForm: React.FC<Props> = ({ name, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`group spacex-2 flex transform items-center gap-1 rounded-xl border border-gray-200 p-3 text-xs font-medium shadow-lg shadow-gray-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-r hover:shadow-xl md:px-6 md:py-3 md:text-sm ${className}`}
    >
      {name}
    </button>
  );
};

export default ButtonForm;
