import { Search } from 'lucide-react';
import BUILDING from '@assets/images/ico_building.png';
import USERS from '@assets/images/ico_users.png';
import LOGO from '@assets/images/img_logo.png';

const Banner = () => {
  return (
    <section className='bg-black py-18 text-center text-white'>
      <div className='container flex flex-col justify-center'>
        <h1 className='text-[70px] leading-[70px]'>Find Your Dream Job Today!</h1>
        <p className='mt-3 text-[18px] leading-[22px]'>
          Connecting Talent with Opportunity: Your Gateway to Career Success
        </p>

        <div className='mt-10 mb-20 flex justify-center'>
          <form className='flex w-[40%] items-center justify-center rounded-2xl bg-white'>
            <input
              type='text'
              placeholder='Enter Job Title, Company, or Skill'
              className='flex-1 p-5 placeholder:leading-[19px] placeholder:text-black placeholder:opacity-50'
            />

            <button className='flex items-center justify-center gap-[10px] rounded-r-2xl bg-[#309689] p-5'>
              <Search /> <span className='text-[18px] leading-[22px]'>Search Job</span>
            </button>
          </form>
        </div>

        <ul className='flex justify-center gap-15'>
          <li className='flex items-center gap-3'>
            <div className='rounded-full bg-[#309689] p-4'>
              <img src={LOGO} className='image h-7 w-7' />
            </div>
            <div className='flex flex-col gap-3 text-start'>
              <span className='text-xl leading-3.5 font-bold'>25.850</span>
              <span>Jobs</span>
            </div>
          </li>
          <li className='flex items-center gap-3'>
            <div className='rounded-full bg-[#309689] p-4'>
              <img src={USERS} className='image h-7 w-7' />
            </div>
            <div className='flex flex-col gap-3 text-start'>
              <span className='text-xl leading-3.5 font-bold'>10,250</span>
              <span>candidates</span>
            </div>
          </li>
          <li className='flex items-center gap-3'>
            <div className='rounded-full bg-[#309689] p-4'>
              <img src={BUILDING} className='image h-7 w-7' />
            </div>
            <div className='flex flex-col gap-3 text-start'>
              <span className='text-xl leading-3.5 font-bold'>18,400</span>
              <span>Companies</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Banner;
