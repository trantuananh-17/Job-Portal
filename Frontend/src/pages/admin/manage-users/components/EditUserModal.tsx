import React from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import type { IUser } from '@apis/users/interfaces/user.interface';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isUpdating: boolean;
  defaultValues?: IUser | null;
}

// Style cho Box hiển thị giữa màn hình
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: {
    xs: 'translate(-50%, -65%)',
    md: 'translate(-50%, -50%)'
  },
  width: '90%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto'
};

const EditUserModal: React.FC<Props> = ({ open, onClose, onSubmit, defaultValues, isUpdating }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: defaultValues || {
      name: '',
      email: '',
      role: '',
      isVerified: false,
      isActive: true
    }
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='edit-user-modal'
      aria-describedby='edit-user-modal-description'
    >
      <Box sx={style}>
        <h2 className='mb-4 text-xl font-semibold text-gray-800'>Chỉnh sửa người dùng</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          {/* Họ và tên */}
          <Controller
            name='name'
            control={control}
            rules={{ required: 'Vui lòng nhập tên!' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Tên'
                fullWidth
                disabled
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {/* Email */}
          <Controller
            name='email'
            control={control}
            rules={{ required: 'Vui lòng nhập email!' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Email'
                fullWidth
                disabled
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {/* Vai trò */}
          <Controller
            name='role'
            control={control}
            rules={{ required: 'Vui lòng chọn vai trò!' }}
            render={({ field, fieldState }) => (
              <FormControl fullWidth error={!!fieldState.error}>
                <InputLabel>Vai trò</InputLabel>
                <Select
                  {...field}
                  label='Vai trò'
                  value={field.value || ''}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  <MenuItem value='CANDIDATE'>Ứng viên</MenuItem>
                  <MenuItem value='RECRUITER'>Nhà tuyển dụng</MenuItem>
                  <MenuItem value='ADMIN'>Quản trị viên</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          {/* Trạng thái */}
          <div className='grid grid-cols-1 sm:grid-cols-2'>
            <Controller
              name='isVerified'
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Switch {...field} checked={field.value} color='primary' />}
                  label={field.value ? 'Đã xác minh' : 'Chưa xác minh'}
                />
              )}
            />
            <Controller
              name='isActive'
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Switch {...field} checked={field.value} color='primary' />}
                  label={field.value ? 'Hoạt động' : 'Bị khóa'}
                />
              )}
            />
          </div>

          {/* Nút hành động */}
          <div className='mt-4 flex flex-col-reverse justify-end gap-3 sm:flex-row'>
            <Button onClick={handleClose}>Hủy</Button>
            <Button type='submit' variant='contained' disabled={isUpdating}>
              {isUpdating ? 'Đang cập nhật...' : 'Cập nhật'}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
