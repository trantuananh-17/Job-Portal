interface Props {
  title: string;
  subtitle: string;
}

const TitleHeader: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className='mb-4 sm:mb-0'>
      <h1 className='text-xl font-semibold text-gray-900 md:text-2xl'>{title}</h1>
      <p className='mt-1 text-sm text-gray-600'>{subtitle}</p>
    </div>
  );
};

export default TitleHeader;
