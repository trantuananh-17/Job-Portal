interface Props {
  total: string;
  title: string;
  content: string;
}
const CareerInfoItem: React.FC<Props> = ({ total, title, content }) => {
  return (
    <div className='flex flex-col gap-[29px]'>
      <h2 className='text-primary text-[40px] font-bold'>{total}</h2>
      <p className='text-2xl font-bold'>{title}</p>
      <p className='leading-6'>{content}</p>
    </div>
  );
};

export default CareerInfoItem;
