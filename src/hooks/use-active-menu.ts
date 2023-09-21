import { useLocation } from 'react-router-dom';

export const useActiveMenu = () => {
  const router = useLocation();
  const path = router.pathname;

  const checkActive = (link: string) => {
    return path === link || path.includes(link);
  };

  return { checkActive };
};
