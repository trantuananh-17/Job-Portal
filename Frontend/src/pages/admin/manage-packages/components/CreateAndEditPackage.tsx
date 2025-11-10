import type { ICreateAndUpdatePackage, IPackage } from '@apis/packages/interfaces/package.interface';
import { Box, Button, FormControlLabel, Modal, Switch, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

interface Props {
  isEdit: boolean;
  defaultValues: IPackage | null;
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (data: ICreateAndUpdatePackage) => void;
}

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

const CreateAndEditPackage: React.FC<Props> = ({ open, onSubmit, isLoading, isEdit, defaultValues, onClose }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: defaultValues || {
      label: '',
      jobPostLimit: 0,
      isActive: true,
      price: 0
    }
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  const handleFormSubmit = (formData: ICreateAndUpdatePackage) => {
    onSubmit(formData);
    onClose();
    reset();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='create-edit-package-modal'
      aria-describedby='create-edit-package-description'
    >
      <Box sx={style}>
        <h2 className='mb-4 text-xl font-semibold text-gray-800'>
          {isEdit ? 'Chỉnh sửa gói dịch vụ' : 'Tạo mới gói dịch vụ'}
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-5'>
          {/* Tên gói dịch vụ */}
          <Controller
            name='label'
            control={control}
            rules={{ required: 'Vui lòng nhập tên gói!' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Tên gói'
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {/* Giá */}
          <Controller
            name='price'
            control={control}
            rules={{ required: 'Vui lòng nhập giá!' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Giá'
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {/* Số bài đăng */}
          <Controller
            name='jobPostLimit'
            control={control}
            rules={{ required: 'Vui lòng nhập số bài đăng!' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Số bài đăng'
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {/* Trạng thái */}
          <div className='grid grid-cols-1 sm:grid-cols-2'>
            <Controller
              name='isActive'
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Switch {...field} checked={field.value} color='primary' />}
                  label={field.value ? 'Hoạt động' : 'Tạm dừng'}
                />
              )}
            />
          </div>

          {/* Nút hành động */}
          <div className='mt-4 flex flex-col-reverse justify-end gap-3 sm:flex-row'>
            <Button onClick={handleClose}>Hủy</Button>
            {isEdit ? (
              <Button type='submit' variant='contained' disabled={isLoading}>
                {isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
              </Button>
            ) : (
              <Button type='submit' variant='contained' disabled={isLoading}>
                {isLoading ? 'Đang tạo...' : 'Tạo mới'}
              </Button>
            )}
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateAndEditPackage;
