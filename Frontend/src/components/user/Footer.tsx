import LOGO from '../../assets/images/img_logo.png';
import { companyMenuItems, jobCategoriesItem } from '../../constant/menuItem';

const Footer = () => {
  return (
    <footer className='flex flex-col items-center bg-black pt-20 pb-15 text-white'>
      <div className='container'>
        <div className='flex justify-between gap-20'>
          <div className='flex flex-col gap-5'>
            <div className='flex items-center gap-2.5'>
              <img className='image h-8 w-8' src={LOGO} />
              <p className='text-[20px] font-semibold'>Jobs</p>
            </div>
            <p className='max-w-[383px] leading-5 break-words'>
              Explore exciting job opportunities designed to help you grow both professionally and personally. We
              connect you with roles that match your skills, passions, and career goals.
            </p>
          </div>

          <div className=''>
            <p className='text-[20px] font-semibold'>Company</p>
            <nav className='mt-6'>
              <ul className='flex flex-col gap-4 text-start'>
                {companyMenuItems.map((item) => (
                  <li
                    className={`relative inline-block w-fit cursor-pointer after:absolute after:bottom-[-5px] after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 after:bg-gray-300 after:transition-all after:duration-300 hover:after:-scale-x-100`}
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <p className='text-[20px] font-semibold'>Job Categories</p>
            <nav className='mt-6'>
              <ul className='flex flex-col gap-4 text-start'>
                {jobCategoriesItem.map((item) => (
                  <li
                    className={
                      'relative inline-block w-fit cursor-pointer after:absolute after:bottom-[-5px] after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 after:bg-gray-300 after:transition-all after:duration-300 hover:after:-scale-x-100'
                    }
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className='flex max-w-[306px] flex-col gap-4 break-words'>
            <p className='text-[20px] font-semibold'>Job Newsletter</p>
            <p className='text-[14px] leading-4 break-words opacity-80'>
              Join our newsletter to receive exclusive updates, news, and special offers directly to your email.
            </p>
            <input
              type='text'
              placeholder='Email Address'
              className='border-[rgba(255, 255, 255, 0.60)] placeholder:text[14px] rounded-xl border px-5 py-3 placeholder:leading-[10px]'
            />
            <button type='submit' className='cursor-pointer rounded-xl bg-[#309689] px-10 py-4'>
              Subscribe now
            </button>
          </div>
        </div>

        <div className='flex items-center justify-between pt-15'>
          <p className='opacity-60'> ©Copyright Job Portal 2025.</p>
          <div className='flex gap-5'>
            <p className='cursor-pointer underline'>Privacy Policy</p>
            <p className='cursor-pointer underline'>Term & Conditions</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
