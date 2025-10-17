import type { CreateJobSchema } from '@apis/jobs/schemas/job.schema';
import { ArrowLeft, Briefcase, BriefcaseBusiness, Wallet } from 'lucide-react';

interface Props {
  formData: CreateJobSchema;
  onClick: () => void;
}

const JobPreview: React.FC<Props> = ({ onClick, formData }) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 px-4 py-6 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-8 rounded-2xl border-white/20 bg-white/80 p-6 shadow-xl backdrop-blur-sm'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <h1 className='text bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-lg font-bold text-transparent md:text-xl'>
                Job Preview
              </h1>
            </div>
            <button
              onClick={onClick}
              className='group spacex-2 flex transform items-center gap-1 rounded-xl border border-gray-200 bg-white p-3 text-xs font-medium text-gray-600 shadow-lg shadow-gray-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:shadow-xl md:px-6 md:py-3 md:text-sm'
            >
              <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
              <span className='hidden sm:block'>Back to Edit</span>
            </button>
          </div>

          {/* Main content */}
          <div className=''>
            {/* Hero section */}
            <div className='relative mt-8 flex flex-col gap-5 border-b border-gray-100 bg-white px-0 pb-8 sm:gap-6 md:gap-8'>
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
                <div className='ml-2 flex flex-wrap gap-5 text-xl'>
                  {formData.skills &&
                    formData.skills.map((skill) => (
                      <span className='xs:text-xs rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-center font-semibold text-blue-700 sm:text-sm'>
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPreview;
