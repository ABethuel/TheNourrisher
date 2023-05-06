import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { GlobalContext } from './GlobalContext';

interface Props {
  children: React.ReactNode;
}

export const GlobalState: FC<Props> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();
  const path = router.pathname;

  useEffect(() => {
    if (/Android|iPhone/i.test(navigator.userAgent)) {
      setIsMobile(true);
    } else setIsMobile(false);
  }, []);

  const goToPath = (path: string) => {
    router.push(path);
  };

  const goToExternalUrl = (url: string) => {
    window.location.replace(url);
  };

  const getPath = (): string => {
    return router.pathname;
  };

  return (
    <GlobalContext.Provider
      value={{ path, goToPath, goToExternalUrl, getPath, isMobile }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
