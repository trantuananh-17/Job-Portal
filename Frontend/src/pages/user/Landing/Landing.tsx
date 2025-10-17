import { getJobsByCandidateApi, searchJobCompletionApi } from '@apis/jobs/job.api';
import JobCardSkeleton from '@components/common/JobCardSkeleton';
import { useAuth } from '@context/AuthContext';
import { useDebounce } from '@hooks/useDebounce';
import usePagination from '@hooks/usePagination';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Banner from './components/Banner';
import BetterFuture from './components/BetterFuture';
import Career from './components/Career';
import Carousel from './components/Carousel';
import RecentJob from './components/RecentJob';

const Landing = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<string[]>([]);
  const [skipSearch, setSkipSearch] = useState(false);

  const debouncedSearch = useDebounce(search, 500);
  const page = 1;
  const limit = 6;

  const {
    data: jobs,
    isLoading,
    isError,
    isSuccess
  } = useQuery({
    queryKey: ['jobsByCandidate'],
    queryFn: () => getJobsByCandidateApi(page, limit),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 60,
    select: (res) => res.data
  });

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

  return (
    <div>
      <Banner data={data} search={search} setSearch={setSearch} setSkipSearch={setSkipSearch} />
      <Carousel />
      <RecentJob jobs={jobs?.data ?? []} isSuccess={isSuccess} isError={isError} isLoading={isLoading} />
      <BetterFuture />
      <Career />
    </div>
  );
};

export default Landing;
