import Button from '../../common/Button';
import CareerInfoItem from './ui/CareerInfoItem';

const CAREER = '/images/img_career.webp';

const Career = () => {
  return (
    <section className='container flex flex-col gap-[86px] pt-10 pb-30 lg:pt-15'>
      <div className='flex flex-col items-center gap-8 sm:flex-row sm:gap-15 lg:gap-[86px]'>
        <div className='bg-prmary bg-primary-light overflow-hidden rounded-[20px] lg:max-h-[520px] lg:max-w-[550px]'>
          <img src={CAREER} loading='lazy' alt='image career' className='image' />
        </div>

        <div className='flex flex-col gap-5 lg:gap-15'>
          <div className='flex flex-col gap-5 lg:gap-10 lg:pr-30'>
            <h2 className='text-2xl font-bold md:text-3xl lg:text-[50px] lg:leading-12'>
              Good Life Begins With A Good Company
            </h2>
            <p className='text-xs lg:leading-6'>
              Join a creative and challenging work environment where you’ll have unlimited growth potential. With a
              talented team and major global partners, we’re always looking for exceptional individuals to contribute to
              our collective success.
            </p>
          </div>

          <div className='flex gap-6'>
            <Button name='Search Job' full={true} className='bg-primary' />
            <div className={`text-primary hidden cursor-pointer text-2xl font-semibold underline lg:inline`}>
              Learn More!
            </div>
          </div>
        </div>
      </div>

      <div className='grid gap-10 md:grid-cols-3 lg:gap-[100px] 2xl:gap-[189px]'>
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
