import BANNER from '@assets/images/img_better.png';
import Button from './ui/Button';

const BetterFuture = () => {
  return (
    <section className='relative container mt-10 mb-15 lg:mt-15'>
      <div className='flex flex-col overflow-hidden rounded-[20px] bg-black md:relative'>
        {/* Background Image */}
        <img
          src={BANNER}
          alt='Banner image'
          className='h-full object-cover md:absolute md:left-[10%] lg:left-[20%] xl:left-[35%] 2xl:left-[40%]'
        />

        <div className='md:absolute md:inset-0 md:bg-black/40'></div>

        <div className='lg z-10 flex max-w-xl flex-col items-center justify-center gap-6 px-[40px] py-[40px] text-white md:relative md:max-w-lg lg:max-w-xl lg:items-start'>
          <h2 className='text-center text-2xl font-bold md:text-start md:text-4xl lg:text-[50px] lg:leading-[1.2]'>
            Create A Better Future For Yourself
          </h2>
          <p className='max-w-[450px] text-center text-sm opacity-80 md:text-left md:text-base'>
            Your future begins today! Search for the career opportunities that match your skills and take the first step
            towards a brighter tomorrow.
          </p>
          <Button name='Search Job' full={true} />
        </div>
      </div>
    </section>
  );
};

export default BetterFuture;
