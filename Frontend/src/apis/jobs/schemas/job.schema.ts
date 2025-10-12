import { z } from 'zod';

export const createJobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  role: z.string().min(1, 'Please select job level'),
  minSalary: z.coerce.number().min(1, 'Min salary must be >= 0') as z.ZodNumber,
  maxSalary: z.coerce.number().min(1, 'Max salary must be >= 0').max(10000) as z.ZodNumber,
  benefits: z.string().min(10, 'Job benefits must be at least 10 characters'),
  requirements: z.string().min(10, 'Job requirememts must be at least 10 characters'),
  skills: z.array(z.string()).min(1, 'Please add at least one required skill')
});

export type CreateJobSchema = z.infer<typeof createJobSchema>;
