interface Props {
  name: string;
  full: boolean;
}

const Button: React.FC<Props> = ({ name, full }) => {
  return (
    <button
      type='button'
      className={`bg-primary self-start rounded-lg px-5 py-3.5 font-semibold text-white ${full ? 'w-full md:w-auto' : ''}`}
    >
      {name}
    </button>
  );
};

export default Button;
