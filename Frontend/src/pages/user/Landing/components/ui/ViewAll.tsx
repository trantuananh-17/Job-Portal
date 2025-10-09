interface Props {
  name: string;
  block: boolean;
}

const ViewAll: React.FC<Props> = ({ name, block }) => {
  return (
    <>
      <div
        className={`text-primary cursor-pointer text-2xl font-semibold underline ${block ? 'hidden lg:block' : 'block text-center lg:hidden'}`}
      >
        {name}
      </div>
    </>
  );
};

export default ViewAll;
