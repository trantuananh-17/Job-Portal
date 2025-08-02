import JobItem from './ui/JobItem';
import ViewAll from './ui/ViewAll';

const RecentJob = () => {
  return (
    <section className=''>
      <div className='container flex flex-col gap-14 py-15'>
        <div className='flex items-end justify-between'>
          <div className='flex flex-col gap-10'>
            <h2 className='text-[50px] leading-9 font-bold capitalize'>recent jobs available</h2>
            <p>Discover new career opportunities tailored to your skills and ambitions.</p>
          </div>
          <ViewAll name='View All' />
        </div>
        <div>
          <ul>
            <JobItem />
            <JobItem />
            <JobItem />
            <JobItem />
            <JobItem />
            <JobItem />
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RecentJob;
