import { useAuth } from '@context/AuthContext';
import Banner from './components/Banner';
import BetterFuture from './components/BetterFuture';
import Career from './components/Career';
import Carousel from './components/Carousel';
import RecentJob from './components/RecentJob';
import { useDebounce } from '@hooks/useDebounce';
import { useEffect, useRef, useState } from 'react';
import { searchJobCompletionApi } from '@apis/jobs/job.api';
import JobCardSkeleton from '@components/common/JobCardSkeleton';

const Landing = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [data, setData] = useState<string[]>([]);
  const [skipSearch, setSkipSearch] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (skipSearch) {
      setSkipSearch(false);
      return;
    }
    const fetchData = async () => {
      try {
        const res = await searchJobCompletionApi(debouncedSearch);
        setData(res?.data?.data ?? []);
      } catch (error) {
        console.error('Error fetching search completion:', error);
        setData([]);
      }
    };

    fetchData();
  }, [debouncedSearch]);
  useEffect(() => {
    console.log('Landing mounted');
    return () => console.log('Landing unmounted');
  }, []);

  return (
    <div>
      <Banner data={data} search={search} setSearch={setSearch} setSkipSearch={setSkipSearch} />
      <Carousel />
      <RecentJob />
      <BetterFuture />
      <Career />

      <div className='container flex flex-col gap-6'>
        {Array.from({ length: 4 }).map((_, index) => (
          <JobCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default Landing;
