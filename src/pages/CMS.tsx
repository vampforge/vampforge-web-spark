import CMSLogin from '@/components/cms/CMSLogin';
import CMSDashboard from '@/components/cms/CMSDashboard';
import { useCMSData } from '@/hooks/useCMSData';

const CMS = () => {
  const { isAuthenticated, authenticate } = useCMSData();

  if (isAuthenticated) {
    return <CMSDashboard />;
  }

  return <CMSLogin onLogin={authenticate} />;
};

export default CMS;