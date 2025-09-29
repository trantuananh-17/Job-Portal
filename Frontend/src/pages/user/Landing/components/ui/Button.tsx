interface Props {
  name: string;
}

const Button: React.FC<Props> = ({ name }) => {
  return (
    <button type='button' className='bg-primary self-start rounded-lg px-5 py-3.5 font-semibold text-white'>
      {name}
    </button>
  );
};

export default Button;
