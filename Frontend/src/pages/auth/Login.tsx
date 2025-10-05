import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AlertCircle, CheckCircle, Eye, EyeOff, Loader, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import type { IUserLogin } from '@apis/auth/interfaces/user.interface';
import { loginSchema } from '@apis/auth/schemas/auth.schema';
import { getCurrentUserApi, loginApi } from '@apis/auth/auth.api';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUserLogin>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: IUserLogin) => {
    try {
      setLoading(true);
      setErrorMsg(null);

      const response = await loginApi(data);

      if (response.data.data) {
        const userData = await getCurrentUserApi();

        login(userData.data);

        setSuccess(true);
        setTimeout(() => {
          switch (userData?.data?.role) {
            case 'ADMIN':
              navigate('/admin');
              break;
            case 'RECRUITER':
              navigate('/recruiter');
              break;
            default:
              navigate('/');
          }
        }, 2000);
      }
    } catch (error: any) {
      setErrorMsg(error.response.data.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
        <motion.div
          className='w-full max-w-md rounded-md bg-white p-8 text-center shadow-lg'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <CheckCircle className='mx-auto mb-4 h-16 w-16 text-green-600' />
          <h2 className='mb-2 text-2xl font-bold text-gray-900'>Welcome Back!</h2>
          <p className='mb-4 text-gray-600'>You have been successfully logged in.</p>
          <div className='mx-auto h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent'></div>
          <p className='mt-2 text-sm text-gray-500'>Redirecting to website...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='w-full max-w-md rounded-xl bg-white p-8 shadow-lg'
      >
        <div className='mb-8 text-center'>
          <h2 className='mb-2 text-2xl font-bold text-gray-900'>Welcome Back</h2>
          <p className='text-gray-600'>Sign in to your JobPortal account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {/* Email */}
          <div className=''>
            <label htmlFor='' className='mb-2 block text-sm font-medium text-gray-700'>
              Email Address
            </label>
            <div className='relative'>
              <Mail className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400' />
              <input
                {...register('email')}
                placeholder='email'
                className={`w-full rounded-lg border py-3 pr-4 pl-10 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
            </div>
            {errors.email && (
              <p className='mt-1 flex items-center text-sm text-red-500'>
                <AlertCircle className='mr-1 h-4 w-4' />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className=''>
            <label htmlFor='' className='mb-2 block text-sm font-medium text-gray-700'>
              Password
            </label>
            <div className='relative'>
              <Lock className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400' />
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder='Enter your password'
                className={`w-full rounded-lg border py-3 pr-12 pl-10 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 transform text-gray-400 hover:text-gray-700'
              >
                {showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
              </button>
            </div>
            {errors.password && (
              <p className='mt-1 flex items-center text-sm text-red-500'>
                <AlertCircle className='mr-1 h-4 w-4' />
                {errors.password.message}
              </p>
            )}
          </div>

          {errorMsg && (
            <div className='rounded-lg border-red-200 bg-red-50 p-3'>
              <p className='flex items-center text-sm text-red-700'>
                <AlertCircle className='mr-2 h-4 w-4' />
                {errorMsg}
              </p>
            </div>
          )}

          {/* Button submit */}
          <button
            type='submit'
            disabled={loading}
            className='relative flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 py-4 font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <div className={`${loading ? 'opacity-100' : 'opacity-0'} absolute flex items-center`}>
              <Loader className='mr-2 h-4 w-4 animate-spin' />
              <span>Signing In...</span>
            </div>
            <span className={`${loading ? 'opacity-0' : 'opacity-100'}`}>Sign In</span>
          </button>

          {/* Sign up link */}
          <div className='text-center'>
            <p className='text-gray-600'>
              Don't have an account?{' '}
              <Link to={'/signup'} className='text-blue-600'>
                Create one here
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
