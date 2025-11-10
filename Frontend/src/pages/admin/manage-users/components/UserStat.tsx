import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import { BriefcaseBusiness, MailCheck, User, Users } from 'lucide-react';
import React from 'react';

interface Props {
  totalUsers: number;
  candidateCount: number;
  recruiterCount: number;
  verifiedCount: number;
}

const UserStat: React.FC<Props> = ({ totalUsers, candidateCount, recruiterCount, verifiedCount }) => {
  const theme = useTheme();

  const stats = [
    {
      key: 'total',
      title: 'Tổng người dùng',
      value: totalUsers,
      icon: <Users size={20} color={theme.palette.primary.main} />,
      color: theme.palette.primary.main
    },
    {
      key: 'recruiter',
      title: 'Nhà tuyển dụng',
      value: recruiterCount,
      icon: <BriefcaseBusiness size={20} color='#f5222d' />,
      color: '#f5222d'
    },
    {
      key: 'candidate',
      title: 'Ứng viên',
      value: candidateCount,
      icon: <User size={20} color='#52c41a' />,
      color: '#52c41a'
    },
    {
      key: 'verified',
      title: 'Đã xác minh email',
      value: verifiedCount,
      icon: <MailCheck size={20} color='#722ed1' />,
      color: '#722ed1'
    }
  ];

  return (
    <div className='grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-4 md:gap-6'>
      {stats.map((item) => (
        <Card variant='outlined' sx={{ borderRadius: 3 }}>
          <CardContent>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  {item.title}
                </Typography>
                <Box display='flex' alignItems='center' gap={1}>
                  {item.icon}
                  <Typography variant='h5' fontWeight='extralight' sx={{ color: item.color }}>
                    {item.value.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserStat;
