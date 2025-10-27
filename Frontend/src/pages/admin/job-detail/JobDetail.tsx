import type { IJobInfoByAdmin } from '@apis/jobs/interfaces/job.interface';
import { ArrowLeft, BriefcaseBusiness, Wallet } from 'lucide-react';

interface Props {
  job: IJobInfoByAdmin;
}

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

const JobDetail: React.FC<Props> = ({ job }) => {
  return (
    <div className='min-h-screen p-4 sm:p-6'>
      {' '}
      <div className='mx-auto max-w-4xl'>
        <div className='mb-8 rounded-2xl border-white/20 bg-white/80 p-6 shadow-xl backdrop-blur-sm'>
          <div className='flex items-center justify-between'>
            <button className='group spacex-2 flex transform items-center gap-1 rounded-xl border border-gray-200 bg-white p-3 text-xs font-medium text-gray-600 shadow-lg shadow-gray-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:shadow-xl md:px-6 md:py-3 md:text-sm'>
              <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
              <span className='hidden sm:block'>Back to Edit</span>
            </button>

            <div className='flex items-center space-x-3 rounded-xl p-2 transition-colors duration-200 hover:bg-gray-50'>
              {formData.company.avatarUrl ? (
                <img src={formData.company.avatarUrl} alt='avatar' className='h-10 w-10 rounded-xl object-cover' />
              ) : (
                <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600'>
                  <span className='text-sm font-semibold text-white'>
                    {formData.company.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className='hidden text-left md:block'>
                <p className='text-sm font-medium text-gray-800'>{formData.company.name}</p>
                <p className='text-xs'>{formData.postBy.email}</p>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className=''>
            {/* Hero section */}
            <div className='relative mt-8 flex flex-col gap-5 border-b border-gray-100 bg-white px-0 pb-8 sm:gap-6'>
              <div className='flex-1'>
                <h2 className='mb-2 text-lg leading-tight font-semibold text-gray-900 lg:text-xl'>{formData.title}</h2>

                <div className='flex flex-col gap-2 sm:flex-row sm:gap-5'>
                  <div className='ml-2 flex items-center gap-2 text-gray-600'>
                    <BriefcaseBusiness className='text-primary h-4 w-4' />
                    <span className='text-md md:text-lg'>{formData.jobRoleName}</span>
                  </div>

                  <div className='ml-2 flex items-center gap-2 text-gray-600'>
                    <Wallet className='text-primary h-4 w-4' />
                    <span className='text-md md:text-lg'>
                      {formData.minSalary}$ - {formData.maxSalary}${' '}
                    </span>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <h2 className='mb-2 text-lg leading-tight font-semibold text-gray-900 lg:text-xl'>Job Description</h2>
                <p className='ml-2 text-sm text-gray-600 md:text-lg'>{formData.description}</p>
              </div>

              <div className='flex flex-col gap-2'>
                <h2 className='mb-2 text-lg leading-tight font-semibold text-gray-900 lg:text-xl'>Job Requirements</h2>
                <ul className='ml-5 list-disc text-xl sm:ml-10'>
                  {formData.requirements &&
                    formData.requirements
                      .split('.')
                      .map((item) => <li className='ml-2 text-sm text-gray-600 md:text-lg'>{item}</li>)}
                </ul>
              </div>

              <div className='flex flex-col gap-2'>
                <h2 className='mb-2 text-lg leading-tight font-semibold text-gray-900 lg:text-xl'>Job Benefits</h2>
                <ul className='ml-5 list-disc text-xl sm:ml-10'>
                  {formData.benefits &&
                    formData.benefits
                      .split('.')
                      .map((item) => <li className='ml-2 text-sm text-gray-600 md:text-lg'>{item}</li>)}
                </ul>
              </div>

              <div className='flex flex-col gap-2'>
                <h2 className='mb-2 text-lg leading-tight font-semibold text-gray-900 lg:text-xl'>Job Skills</h2>
                <div className='ml-2 flex flex-wrap gap-3 text-xl'>
                  {formData.jobSkills &&
                    formData.jobSkills.map((item) => (
                      <span className='xs:text-xs rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-center font-semibold text-blue-700 sm:text-sm'>
                        {item.skill.name}
                      </span>
                    ))}
                </div>
              </div>

              <div className='flex-row justify-between text-sm sm:flex'>
                <p>Ngày tạo: {formData.createdAt.toISOString()}</p>
                <p>Sửa đổi: {formData.updatedAt.toISOString()}</p>
              </div>

              <div className='flex justify-end gap-5'>
                <button className='group spacex-2 flex transform items-center gap-1 rounded-xl border border-gray-200 bg-gray-300 p-3 text-xs font-medium text-gray-600 shadow-lg shadow-gray-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-600 hover:text-white hover:shadow-xl md:px-6 md:py-3 md:text-sm'>
                  Từ chối
                </button>
                <button className='group spacex-2 bg-primary flex transform items-center gap-1 rounded-xl border border-gray-200 p-3 text-xs font-medium text-white shadow-lg shadow-gray-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:shadow-xl md:px-6 md:py-3 md:text-sm'>
                  Duyệt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
