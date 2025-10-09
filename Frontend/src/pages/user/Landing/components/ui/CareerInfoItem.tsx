interface Props {
  total: string;
  title: string;
  content: string;
}
const CareerInfoItem: React.FC<Props> = ({ total, title, content }) => {
  return (
    <div className='flex flex-col gap-4 xl:gap-6'>
      <h2 className='text-primary text-center text-[40px] font-bold md:text-start'>{total}</h2>
      <p className='text-center text-2xl font-bold md:text-start'>{title}</p>
      <p className='text-center leading-6 md:text-start'>{content}</p>
    </div>
  );
};

export default CareerInfoItem;
