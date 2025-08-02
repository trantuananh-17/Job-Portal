import CAREER from '@assets/images/img_career.png';
import Button from './ui/Button';
import ViewAll from './ui/ViewAll';
import CareerInfoItem from './ui/CareerInfoItem';

const Career = () => {
  return (
    <section className='container flex flex-col gap-[86px] pt-15 pb-30'>
      <div className='flex items-center gap-[86px]'>
        <div className='bg-prmary bg-primary-light max-h-[520px] max-w-[550px] overflow-hidden rounded-[20px]'>
          <img src={CAREER} alt='image career' className='image' />
        </div>
        <div className='flex flex-col gap-15'>
          <div className='flex flex-col gap-10 pr-30'>
            <h2 className='text-[50px] leading-12 font-bold'>Good Life Begins With A Good Company</h2>
            <p className='leading-6'>
              Join a creative and challenging work environment where you’ll have unlimited growth potential. With a
              talented team and major global partners, we’re always looking for exceptional individuals to contribute to
              our collective success.
            </p>
          </div>

          <div className='flex gap-6'>
            <Button name='Search Job' />
            <ViewAll name='Learn more' />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-[189px]'>
        <CareerInfoItem
          total='12k+'
          title='Clients worldwide'
          content='With over 12,000 clients across the globe, we connect professionals and companies to build a future filled with growth and opportunity'
        />
        <CareerInfoItem
          total='20k+'
          title='Active resume'
          content='Join over 20,000 active resumes on our platform, all ready to match with exciting job opportunities tailored to their skills'
        />
        <CareerInfoItem
          total='18k+'
          title='Compnies'
          content='Our network includes over 18,000 companies actively seeking skilled professionals. Let us help you find your perfect match'
        />
      </div>
    </section>
  );
};

export default Career;
