import ButtonForm from '@components/common/ButtonForm';
import { getJobByAdmin, updateStatusJobApi } from '@apis/jobs/job.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, BriefcaseBusiness, Wallet } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import type { JobStatus } from '@apis/jobs/interfaces/job.interface';
import { toast } from 'react-toastify';
import axios from 'axios';

interface Props {}

export const formData = {
  id: 1,
  title: 'Fullstack Developer',
  description: 'Phụ trách phát triển toàn bộ hệ thống web từ frontend đến backend, đảm bảo hiệu năng và bảo mật',
  jobRoleName: 'Fullstack Engineer',
  minSalary: 20000000,
  maxSalary: 35000000,
  benefits: 'Làm việc hybrid linh hoạt. Bảo hiểm sức khỏe cao cấp. Du lịch công ty hằng năm. Thưởng hiệu suất cuối năm',
  requirements:
    'Thành thạo JavaScript và TypeScript. Có kinh nghiệm với ReactJS và Nodejs. Hiểu rõ RESTful API. Biết Docker hoặc Kubernetes là lợi thế',
  createdAt: new Date('2024-10-01'),
  updatedAt: new Date('2024-10-15'),
  jobSkills: [
    { skill: { name: 'ReactJS' } },
    { skill: { name: 'Node.js' } },
    { skill: { name: 'TypeScript' } },
    { skill: { name: 'Docker' } }
  ],
  company: {
    id: 101,
    name: 'TechNova Solutions',
    avatarUrl: ''
  },
  postBy: {
    id: 501,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@technova.vn'
  }
};

const JobDetail: React.FC<Props> = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['getJobByAdmin'],
    queryFn: () => getJobByAdmin(Number(id)),
    select: (res) => res.data.data,
    enabled: !!id,
    staleTime: 1000 * 60 * 60
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ status, jobId }: { status: JobStatus; jobId: number }) => updateStatusJobApi(jobId, status),

    onSuccess: (res) => {
      toast.success(res.data.message || 'Cập nhật trạng thái thành công!');

      queryClient.invalidateQueries({ queryKey: ['getJobsByAdmin'], exact: false });
      queryClient.invalidateQueries({ queryKey: ['getJobByAdmin'] });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Đã xảy ra lỗi!');
      } else {
        toast.error('Lỗi không xác định!');
      }
    }
  });

  return (
    <div className='min-h-screen p-4 sm:p-6'>
      {data && (
        <div className='mx-auto max-w-4xl'>
          <div className='mb-8 rounded-2xl border-white/20 bg-white/80 p-6 shadow-xl backdrop-blur-sm'>
            <div className='flex items-center justify-between'>
              <button
                onClick={() => navigate('/admin/manage-jobs')}
                className='group spacex-2 flex transform items-center gap-1 rounded-xl border border-gray-200 bg-white p-3 text-xs font-medium text-gray-600 shadow-lg shadow-gray-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:shadow-xl md:px-6 md:py-3 md:text-sm'
              >
                <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
                <span className='hidden sm:block'>Back to Edit</span>
              </button>

              <div className='flex items-center space-x-3 rounded-xl p-2 transition-colors duration-200 hover:bg-gray-50'>
                {data.company.avatarUrl ? (
                  <img src={data.company.avatarUrl} alt='avatar' className='h-10 w-10 rounded-xl object-cover' />
                ) : (
                  <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600'>
                    <span className='text-sm font-semibold text-white'>
                      {data.company.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className='hidden text-left md:block'>
                  <p className='text-sm font-medium text-gray-800'>{data.company.name}</p>
                  <p className='text-xs'>{data.postBy.email}</p>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className=''>
              {/* Hero section */}
              <div className='relative mt-8 flex flex-col gap-3 border-b border-gray-100 bg-white px-0 pb-8 sm:gap-4'>
                <div className='flex-1'>
                  <h2 className='mb-2 text-lg leading-tight font-semibold text-gray-900 lg:text-xl'>{data.title}</h2>

                  <div className='flex flex-col gap-2 sm:flex-row sm:gap-5'>
                    <div className='ml-2 flex items-center gap-2 text-gray-600'>
                      <BriefcaseBusiness className='text-primary h-4 w-4' />
                      <span className='text-md md:text-lg'>{data.jobRoleName}</span>
                    </div>

                    <div className='ml-2 flex items-center gap-2 text-gray-600'>
                      <Wallet className='text-primary h-4 w-4' />
                      <span className='text-md md:text-lg'>
                        {data.minSalary}$ - {data.maxSalary}${' '}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  <h2 className='text-lg leading-tight font-semibold text-gray-900 lg:text-xl'>Job Description</h2>
                  <p className='ml-2 text-sm text-gray-600 md:text-lg'>{data.description}</p>
                </div>

                <div className='flex flex-col gap-2'>
                  <h2 className='text-lg leading-tight font-semibold text-gray-900 lg:text-xl'>Job Requirements</h2>
                  <ul className='ml-5 list-disc text-xl sm:ml-10'>
                    {data.requirements &&
                      data.requirements
                        .split('.')
                        .map((s: string) => s.trim())
                        .filter((s: string) => s.length)
                        .map((item: string, index: number) => (
                          <li key={index} className='ml-2 text-sm text-gray-600 md:text-lg'>
                            {item}
                          </li>
                        ))}
                  </ul>
                </div>

                <div className='flex flex-col gap-2'>
                  <h2 className='text-lg leading-tight font-semibold text-gray-900 lg:text-xl'>Job Benefits</h2>
                  <ul className='ml-5 list-disc text-xl sm:ml-10'>
                    {data.benefits &&
                      data.benefits
                        .split('.')
                        .map((s: string) => s.trim())
                        .filter((s: string) => s.length)
                        .map((item: string, index: number) => (
                          <li key={index} className='ml-2 text-sm text-gray-600 md:text-lg'>
                            {item}
                          </li>
                        ))}
                  </ul>
                </div>

                {data.jobSkills.length > 0 && (
                  <div className='flex flex-col gap-2'>
                    <h2 className='text-lg leading-tight font-semibold text-gray-900 lg:text-xl'>Job Skills</h2>
                    <div className='ml-2 flex flex-wrap gap-3 text-xl'>
                      {data.jobSkills &&
                        data.jobSkills.map((item: { skill: { name: string } }, index: number) => (
                          <span
                            key={index}
                            className='xs:text-xs rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-center font-semibold text-blue-700 sm:text-sm'
                          >
                            {item.skill.name}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                <div className='flex-row justify-between text-sm sm:flex'>
                  <p>Ngày tạo: {data.createdAt}</p>
                  <p>Sửa đổi: {data.updatedAt}</p>
                </div>

                <div className='flex justify-end gap-5'>
                  {data.status === 'PENDING' && (
                    <>
                      <ButtonForm
                        name='Từ chối'
                        className='bg-gray-300 text-gray-600 hover:from-gray-500 hover:to-gray-600 hover:text-white'
                        onClick={() => mutation.mutate({ status: 'REJECTED' as unknown as JobStatus, jobId: +data.id })}
                      />
                      <ButtonForm
                        name='Duyệt'
                        className='bg-primary text-white hover:from-blue-500 hover:to-blue-600 hover:text-white'
                        onClick={() => mutation.mutate({ status: 'ACTIVE' as unknown as JobStatus, jobId: +data.id })}
                      />
                    </>
                  )}

                  {data.status === 'REJECTED' && (
                    <ButtonForm
                      name='Duyệt'
                      className='bg-primary text-white hover:from-blue-500 hover:to-blue-600 hover:text-white'
                      onClick={() => mutation.mutate({ status: 'ACTIVE' as unknown as JobStatus, jobId: +data.id })}
                    />
                  )}

                  {data.isDeleted === true && (
                    <ButtonForm
                      name='Khôi phục'
                      className='bg-primary text-white hover:from-blue-500 hover:to-blue-600 hover:text-white'
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
