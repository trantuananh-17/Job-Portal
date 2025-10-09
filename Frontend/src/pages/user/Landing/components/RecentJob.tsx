import JobItem from './ui/JobItem';
import ViewAll from './ui/ViewAll';

const RecentJob = () => {
  return (
    <section className=''>
      <div className='container flex flex-col gap-14 py-15'>
        <div className='flex items-end justify-center lg:justify-between'>
          <div className='flex flex-col gap-6 lg:gap-10'>
            <h2 className='text-center text-3xl font-bold capitalize lg:text-[50px] lg:leading-9'>
              recent jobs available
            </h2>
            <p className='text-center leading-5 lg:text-left'>
              Discover new career opportunities tailored to your skills and ambitions.
            </p>
          </div>
          <ViewAll name='View All' block={true} />
        </div>
        <div>
          <ul className='flex flex-col gap-5'>
            <JobItem />
            <JobItem />
            <JobItem />
            <JobItem />
            <JobItem />
            <JobItem />
          </ul>
        </div>
        <ViewAll name='View All' block={false} />
      </div>
    </section>
  );
};

export default RecentJob;
