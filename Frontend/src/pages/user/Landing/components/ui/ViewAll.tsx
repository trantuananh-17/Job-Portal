interface Props {
  name: string;
}

const ViewAll: React.FC<Props> = ({ name }) => {
  return <div className='text-primary cursor-pointer text-2xl font-semibold underline'>{name}</div>;
};

export default ViewAll;
