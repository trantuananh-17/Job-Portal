import type { IJobCreate } from '@apis/jobs/interfaces/job.interface';
import { createJobSchema, type CreateJobSchema } from '@apis/jobs/schemas/job.schema';
import { useRecruiterAuth } from '@context/RecruiterContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { FORM_TAB, JOB_LEVEL_ITEM } from '@utils/data';
import { Briefcase, CircleDollarSign, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ButtonForm from './components/ButtonForm';
import InputAreaField from './components/InputAreaField';
import InputField from './components/InputField';
import SelectField from './components/SelectField';
import TagSkill from './components/TagSkill';

const SKILL_LIST = ['ReactJS', 'TypeScript', 'NodeJS', 'NestJS', 'NextJS', 'TailwindCSS'];

const JOB_INFO_FIELDS: (keyof CreateJobSchema)[] = [
  'title',
  'location',
  'description',
  'role',
  'minSalary',
  'maxSalary'
];

const REQUIREMENT_FIELDS: (keyof CreateJobSchema)[] = ['requirements', 'skills'];

const PostJob = () => {
  const [activeTab, setActiveTab] = useState('job-info');
  const { company } = useRecruiterAuth();

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
    getValues,
    setError
  } = useForm<CreateJobSchema>({
    resolver: zodResolver(createJobSchema),
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      location: '',
      description: '',
      role: '',
      minSalary: 0,
      maxSalary: 0,
      benefits: '',
      requirements: '',
      skills: []
    }
  });

  const handleTabClick = async (nextTab: string) => {
    if (activeTab === 'job-info') {
      const isValid = await trigger(JOB_INFO_FIELDS);
      if (!isValid) return;
    }

    if (activeTab === 'requirement') {
      const isValid = await trigger(REQUIREMENT_FIELDS);
      if (!isValid) return;
    }
    setActiveTab(nextTab);
  };

  const handleNext = async () => {
    const min = getValues('minSalary');
    const max = getValues('maxSalary');
    if (activeTab === 'job-info' && Number(min) > Number(max)) {
      setError('minSalary', { message: 'Min salary cannot be greater than max salary' });
      return;
    }

    const isValid = await trigger(activeTab === 'job-info' ? JOB_INFO_FIELDS : REQUIREMENT_FIELDS);

    if (isValid) {
      if (activeTab === 'job-info') setActiveTab('requirement');
      else if (activeTab === 'requirement') setActiveTab('benefit');
    }
  };

  const onSubmit = (data: IJobCreate) => {
    try {
      const payload = {
        companyId: company?.id,
        ...data
      };
      console.log('Form data:', payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow'>
      {/*Tabs Header*/}
      <div className='mb-6 flex border-b border-gray-200'>
        {FORM_TAB.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            // onClick={() => setActiveTab(tab.id)}
            className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/*Form Content */}
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {/* Tab Info */}
        {activeTab === 'job-info' && (
          <>
            <div className='space-y-4'>
              {/* Title */}
              <Controller
                name='title'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='Job Title'
                    placeholder='e.g., Senior Frontend Developer'
                    icon={Briefcase}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.title?.message as string}
                    type='text'
                  />
                )}
              />

              {/* Location */}
              <Controller
                name='location'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='Location'
                    placeholder='e.g., 132/12, Nguyên Xá, Hà Nội'
                    icon={MapPin}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.location?.message as string}
                    type='text'
                  />
                )}
              />

              {/* Description */}
              <Controller
                name='description'
                control={control}
                render={({ field }) => (
                  <InputAreaField
                    label='Job Description'
                    icon={MapPin}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.description?.message as string}
                    row={6}
                    placeholder='Description the role and responsibilities...'
                    helperText='Include key responsibilities, day-to-day tasks, and what makes this role exciting.'
                  />
                )}
              />

              {/* Level || Role*/}
              <Controller
                name='role'
                control={control}
                render={({ field }) => (
                  <SelectField
                    menu={JOB_LEVEL_ITEM}
                    onChange={field.onChange}
                    value={field.value}
                    error={errors.role?.message as string}
                  />
                )}
              />

              <div className='grid grid-cols-2 gap-5 sm:grid-cols-2'>
                {/* Min salary */}
                <div className=''>
                  <Controller
                    name='minSalary'
                    control={control}
                    render={({ field }) => (
                      <InputField
                        label='Min Salary'
                        placeholder='e.g., 100'
                        icon={CircleDollarSign}
                        value={field.value as number}
                        onChange={field.onChange}
                        error={errors.minSalary?.message as string}
                        type='number'
                      />
                    )}
                  />
                </div>

                {/* Max salary */}
                <div className=''>
                  <Controller
                    name='maxSalary'
                    control={control}
                    render={({ field }) => (
                      <InputField
                        label='Max Salary'
                        placeholder='e.g., 10000'
                        icon={CircleDollarSign}
                        value={field.value as number}
                        onChange={field.onChange}
                        error={errors.maxSalary?.message as string}
                        type='number'
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className='text-end'>
              <ButtonForm
                name='Next Page'
                onClick={() => handleNext()}
                clasName='bg-blue-600 hover:bg-blue-700'
                type='button'
              />
            </div>
          </>
        )}

        {/* Tab requirement */}
        {activeTab === 'requirement' && (
          <div className='space-y-4'>
            {/* Skills Section */}
            <Controller
              name='skills'
              control={control}
              render={({ field }) => {
                const availableSkills = SKILL_LIST.filter((skill) => !field.value.includes(skill));

                const handleAddSkill = (skill: string) => {
                  if (skill && !field.value.includes(skill)) {
                    field.onChange([...field.value, skill]);
                  }
                };

                const handleRemoveSkill = (skill: string) => {
                  field.onChange(field.value.filter((s: string) => s !== skill));
                };

                return (
                  <div>
                    <SelectField value='' menu={availableSkills} onChange={(skill) => handleAddSkill(skill)} />

                    <div className='mt-3 flex flex-wrap gap-2'>
                      {field.value.map((skill: string) => (
                        <TagSkill skill={skill} key={skill} onClick={handleRemoveSkill} />
                      ))}
                    </div>

                    {errors.skills && <p className='mt-1 text-sm text-red-500'>{errors.skills.message as string}</p>}
                  </div>
                );
              }}
            />

            {/* Requirements section */}
            <Controller
              name='requirements'
              control={control}
              render={({ field }) => (
                <InputAreaField
                  label='Job Requirements'
                  icon={MapPin}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.description?.message as string}
                  row={6}
                  placeholder='e.g., Qualifications, experience, required skills...'
                  helperText='Include required skills, experience level, education, and any preferred qualifications. Separate each requirement with a period. (e.g., Proficient in ReactJS. 3+ years of experience. Bachelor’s degree in Computer Science.).'
                />
              )}
            />

            {/* Benefits section */}
            <Controller
              name='benefits'
              control={control}
              render={({ field }) => (
                <InputAreaField
                  label='Job Benefits'
                  icon={MapPin}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.description?.message as string}
                  row={6}
                  placeholder='e.g., Salary, bonuses, welfare policies, career advancement opportunities...'
                  helperText='Include Salary, bonuses, welfare policies, career advancement opportunities. Separate each benefit with a period. (e.g., Competitive salary. Annual bonus. Health insurance. Promotion opportunities.)'
                />
              )}
            />

            <div className='xs:flex-col-reverse flex justify-between gap-3 md:flex-row'>
              <ButtonForm
                name='Return To Page'
                onClick={() => setActiveTab('job-info')}
                clasName='bg-gray-600 hover:bg-gray-700'
                type='button'
              />
              <ButtonForm
                name='Create Job'
                onClick={() => handleSubmit(onSubmit)}
                clasName='bg-blue-600 hover:bg-blue-700'
                type='submit'
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default PostJob;
