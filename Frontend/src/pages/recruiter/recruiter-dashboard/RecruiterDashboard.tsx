import LoadingSpinner from '@components/common/LoadingSpinner';
import { Briefcase, CheckCircle2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatisticCard from './components/StatisticCard';
import Card from './components/ui/Card';
import JobDashboardCard from './components/JobDashboardCard';
import ApplicantDashboardCard from './components/ApplicantDashboardCard';
import { RECRUITER_DASHBOARD_ACTION } from '@utils/data';

interface Job {
  id: number;
  title: string;
  location: string;
  createdAt: string;
  isClosed: boolean;
}
const jobs: Job[] = [
  {
    id: 1,
    title: 'Backend Developer',
    location: 'New York',
    createdAt: '2025-07-23',
    isClosed: false
  },
  {
    id: 2,
    title: 'Frontend Developer',
    location: 'San Francisco',
    createdAt: '2025-06-10',
    isClosed: false
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    location: 'London',
    createdAt: '2025-05-15',
    isClosed: true
  }
];

interface Candidate {
  id: number;
  applicant: {
    name: string;
  };
  position: string;
  time: string;
}

const candidates: Candidate[] = [
  {
    id: 1,
    applicant: { name: 'Alice Johnson' },
    position: 'Frontend Developer',
    time: '2025-10-03 22:30'
  },
  {
    id: 2,
    applicant: { name: 'Brian Smith' },
    position: 'Backend Developer',
    time: '2025-07-22 15:45'
  },
  {
    id: 3,
    applicant: { name: 'Catherine Lee' },
    position: 'UI/UX Designer',
    time: '2025-07-21 09:10'
  }
];

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getDashboardOverView = async () => {};

  useEffect(() => {
    getDashboardOverView();
    return () => {};
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className='mx-auto max-w-7xl space-y-8 p-6'>
          {/* Dashboard statistics */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <StatisticCard title='Active Jobs' value={0} icon={Briefcase} color='blue' />
            <StatisticCard title='Total Applicants' value={0} icon={Users} color='green' />
            <StatisticCard title=' Approved' value={0} icon={CheckCircle2} color='blue' />
          </div>

          {/* Recent Activity */}
          <div className='grid grid-cols-1 gap-8 xl:grid-cols-2'>
            <Card
              className=''
              title='Recent Job Posts'
              subtitle='Your latest job postings'
              headerAction={
                <button
                  className='text-sm font-medium text-blue-600 hover:text-blue-700'
                  onClick={() => navigate('/recruiter/manage-jobs')}
                >
                  View all
                </button>
              }
            >
              <div className='space-y-3'>
                {jobs.slice(0, 3)?.map((job, index) => (
                  <JobDashboardCard job={job} key={index} />
                ))}
              </div>
            </Card>

            <Card
              className=''
              title='Recent Applicants'
              subtitle='Latest candidate applications'
              headerAction={
                <button
                  className='text-sm font-medium text-blue-600 hover:text-blue-700'
                  onClick={() => navigate('/recruiter/manage-jobs')}
                >
                  View all
                </button>
              }
            >
              <div className='space-y-3'>
                {candidates.slice(0, 3)?.map((data, index) => (
                  <ApplicantDashboardCard candidate={data} key={index} />
                ))}
              </div>
            </Card>
          </div>

          {/* Quick actions */}
          <Card className='' title='Quick Actions' subtitle='Common tasks to get you started'>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'>
              {RECRUITER_DASHBOARD_ACTION.map((action, index) => (
                <button
                  key={index}
                  className='flex items-center space-x-3 rounded-xl border border-gray-100 p-4 transition-all duration-200 hover:border-gray-200 hover:shadow-sm'
                  onClick={() => navigate(action.path)}
                >
                  <div className={`rounded-lg p-2 ${action.color}`}>
                    <action.icon className='' />
                  </div>
                  <span className='font-medium text-gray-900'>{action.title}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;
