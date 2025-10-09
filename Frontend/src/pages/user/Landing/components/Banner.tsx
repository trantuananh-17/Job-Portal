import { Search } from 'lucide-react';
import BUILDING from '@assets/images/ico_building.png';
import USERS from '@assets/images/ico_users.png';
import LOGO from '@assets/images/img_logo.png';
import { useForm } from 'react-hook-form';
import type { IJobSearch } from '@apis/jobs/interfaces/job.interface';
import { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '@hooks/useClickOutside';

interface Props {
  search: string;
  setSearch: (q: string) => void;
  data: string[];
  setSkipSearch: (value: boolean) => void;
}

const Banner: React.FC<Props> = ({ search, setSearch, data, setSkipSearch }) => {
  const { register, handleSubmit, watch, setValue } = useForm<IJobSearch>({ defaultValues: { search: search } });

  const [showData, setShowData] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  useClickOutside(containerRef, () => setShowData(false));

  // Change input
  const q = watch('search');

  useEffect(() => {
    setSearch(q);
  }, [q, setSearch]);

  // Show box data
  const handleFocus = () => {
    setShowData(true);
  };

  useEffect(() => {
    if (isSelecting) {
      setIsSelecting(false);
      return;
    } else if (q.trim().length > 1) {
      setShowData(true);
    } else {
      setShowData(false);
    }
  }, [q]);
  console.log(showData);

  return (
    <section className='bg-black/90 py-[120px] text-center text-white md:py-[160px] xl:py-[200px]'>
      <div className='container flex flex-col justify-center'>
        <h1 className='text-3xl leading-9 md:text-5xl lg:text-7xl'>Find Your Dream Job Today!</h1>
        <p className='mt-3 text-sm md:text-lg lg:text-xl'>
          Connecting Talent with Opportunity: Your Gateway to Career Success
        </p>
        {/* Form search */}
        <div ref={containerRef} className='mt-10 mb-20 flex justify-center'>
          <form className='relative flex max-w-4xl items-center justify-center rounded-2xl bg-white lg:max-w-7xl'>
            <input
              {...register('search')}
              type='text'
              placeholder='Enter Job Title'
              onFocus={handleFocus}
              autoComplete='off'
              className='flex-1 rounded-2xl p-5 text-gray-700 placeholder:leading-[19px] placeholder:text-black placeholder:opacity-50 focus:outline-none md:w-sm'
            />

            <div
              className={`absolute top-full left-0 z-50 mt-1 w-full rounded-lg bg-white text-gray-800 shadow-lg transition-all duration-150 ease-in-out ${showData ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}
            >
              {showData && data.length > 0 && (
                <div>
                  {data.map((item) => (
                    <button
                      key={item}
                      type='button'
                      onClick={() => {
                        setIsSelecting(true);
                        setSkipSearch(true);
                        setValue('search', item);
                        setShowData(false);
                      }}
                      className='block w-full rounded-2xl px-5 py-3 text-left hover:bg-gray-100'
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}

              {data.length === 0 && <p className='px-5 py-3 text-gray-400 italic'>Type something to search...</p>}
            </div>

            <button className='bg-primary flex cursor-pointer items-center justify-center gap-[10px] rounded-r-2xl p-5'>
              <Search /> <span className='xs:hidden text-[18px] leading-[22px] lg:block'>Search Job</span>
            </button>
          </form>
        </div>

        {/* Landing statistics */}
        <ul className='xs:flex-col xs:items-center flex gap-15 sm:flex-row md:justify-center'>
          <li className='flex items-center gap-3'>
            <div className='bg-primary rounded-full p-4'>
              <img src={LOGO} className='image h-7 w-7' />
            </div>
            <div className='flex flex-col gap-3 text-start'>
              <span className='text-xl leading-3.5 font-bold'>25.850</span>
              <span>Jobs</span>
            </div>
          </li>
          <li className='flex items-center gap-3'>
            <div className='bg-primary rounded-full p-4'>
              <img src={USERS} className='image h-7 w-7' />
            </div>
            <div className='flex flex-col gap-3 text-start'>
              <span className='text-xl leading-3.5 font-bold'>10,250</span>
              <span>candidates</span>
            </div>
          </li>
          <li className='flex items-center gap-3'>
            <div className='bg-primary rounded-full p-4'>
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
