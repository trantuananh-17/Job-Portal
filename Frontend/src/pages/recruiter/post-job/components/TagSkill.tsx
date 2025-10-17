interface Props {
  skill: string;
  onClick: (skill: string) => void;
}

const TagSkill: React.FC<Props> = ({ skill, onClick }) => {
  return (
    <div key={skill} className='flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700'>
      <span>{skill}</span>
      <button type='button' onClick={() => onClick(skill)} className='text-blue-700 hover:text-red-500'>
        ✕
      </button>
    </div>
  );
};

export default TagSkill;
