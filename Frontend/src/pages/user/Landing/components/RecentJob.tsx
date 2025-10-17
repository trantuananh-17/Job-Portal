import type { IJobByCandidateResponse } from '@apis/jobs/interfaces/job.interface';
import EmptyState from '@components/common/EmptyState';
import ErrorState from '@components/common/ErrorState';
import JobCardSkeleton from '@components/common/JobCardSkeleton';
import { Inbox } from 'lucide-react';
import JobItem from '../../common/JobItem';
import ViewAll from './ui/ViewAll';

interface Props {
  jobs: IJobByCandidateResponse[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const RecentJob: React.FC<Props> = ({ jobs, isLoading, isSuccess, isError }) => {
  return (
    <section className=''>
      <div className='container flex flex-col gap-14 py-15'>
        <div className='flex items-end justify-center lg:justify-between'>
          <div className='flex flex-col gap-6 lg:gap-10'>
            <h2 className='text-center text-3xl font-bold capitalize lg:text-[50px] lg:leading-9'>
              recent jobs available
            </h2>
            <p className='text-center leading-5 lg:text-left'>
              Discover new career opportunities tailored to your skills and ambitions.
            </p>
          </div>
          <ViewAll name='View All' block={true} />
        </div>
        <div>
          {isLoading && (
            <ul className='flex flex-col gap-5'>
              {Array.from({ length: 6 }).map((_, idx) => (
                <JobCardSkeleton key={idx} />
              ))}
            </ul>
          )}

          {isError && <ErrorState title='Đã xảy ra lỗi' description='Không thể kết nối tới server.' icon={Inbox} />}

          {isSuccess && jobs.length > 0 && (
            <ul className='flex flex-col gap-5'>
              {jobs.map((job) => (
                <JobItem job={job} key={job.id} />
              ))}
            </ul>
          )}

          {isSuccess && jobs.length === 0 && !isLoading && (
            <EmptyState
              title='Không có việc làm gần đây'
              description='Hiện tại chưa có việc làm nào để hiển thị.'
              icon={Inbox}
            />
          )}
        </div>
        <ViewAll name='View All' block={false} />
      </div>
    </section>
  );
};

export default RecentJob;
