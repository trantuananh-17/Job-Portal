interface IJobFilters {
  minSalary?: number;
  maxSalary?: number;
  jobRoleName?: string | '';
  status?: string | '';
  isDeleted?: boolean;
}

export { IJobFilters };
