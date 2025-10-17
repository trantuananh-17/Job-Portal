import { getProfileCompany } from '@apis/companies/company.api';
import type { ICompanyResponse, INewCompanyData } from '@apis/companies/interfaces/company.interface';
import { createContext, useContext, useEffect, useState } from 'react';

type CompanyContextType = {
  company: ICompanyResponse | null;
  checkProfileCompany: () => Promise<void>;
  updateProfileCompany: (updateCompanyData: INewCompanyData) => Promise<void>;
};
const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const useRecruiterAuth = () => {
  const ctx = useContext(CompanyContext);
  if (!ctx) throw new Error('useRecruiterAuth must be used within an AuthProvider');
  return ctx;
};

interface Props {
  children: React.ReactNode;
}

export const RecruiterAuthProvider: React.FC<Props> = ({ children }) => {
  const [company, setCompany] = useState<ICompanyResponse | null>(null);

  const checkProfileCompany = async () => {
    try {
      const res = await getProfileCompany();

      setCompany(res.data.data);
    } catch (error) {
      setCompany(null);
    }
  };

  const updateProfileCompany = async (updateCompanyData: INewCompanyData) => {
    const newCompanyData = { ...company, ...updateCompanyData };
    setCompany(newCompanyData);
  };

  useEffect(() => {
    checkProfileCompany();
  }, []);

  const value: CompanyContextType = {
    company,
    checkProfileCompany,
    updateProfileCompany
  };

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
};
