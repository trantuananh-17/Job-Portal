interface Props {
  type: 'submit' | 'button';
  clasName: string;
  name: string;
  onClick: () => void;
}

const ButtonForm: React.FC<Props> = ({ type, clasName, onClick, name }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`xs:w-full rounded-lg px-6 py-4 text-white transition sm:w-fit ${clasName}`}
    >
      {name}
    </button>
  );
};

export default ButtonForm;
