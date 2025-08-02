import BANNER from '@assets/images/img_better.png';
import Button from './ui/Button';

const BetterFuture = () => {
  return (
    <section className='container mt-15 mb-15'>
      <div className='flex rounded-[20px] bg-black'>
        <div className='flex w-[calc(100%/2)] flex-col items-start gap-[62px]'>
          <div className='flex flex-col gap-10 pt-[85px] pb-16 pl-[65px]'>
            <h2 className='text-[50px] leading-12 font-bold text-white'>Create A Better Future For Yourself</h2>
            <p className='leading-4 text-white'>
              Your future begins today! Search for the career opportunities that match your skills and take the first
              step towards a brighter tomorrow
            </p>
            <Button name='Search Job' />
          </div>
        </div>
        <div>
          <img src={BANNER} alt='Banner image' className='image h-full w-full' />
        </div>
      </div>
    </section>
  );
};

export default BetterFuture;
