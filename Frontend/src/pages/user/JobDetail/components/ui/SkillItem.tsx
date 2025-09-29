interface Props {
  name: string;
}

const SkillItem: React.FC<Props> = ({ name }) => {
  return (
    <div>
      <p className='text-primary bg-secondary rounded-xl px-4 py-3'>{name}</p>
    </div>
  );
};

export default SkillItem;
