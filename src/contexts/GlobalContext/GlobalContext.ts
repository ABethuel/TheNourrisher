import { createContext } from 'react';

interface GlobalContextType {
  path: string;
  goToPath: (path: string) => void;
  goToExternalUrl: (url: string) => void;
  getPath: () => string;
  isMobile: boolean;
}

export const GlobalContext = createContext<GlobalContextType>(
  {} as GlobalContextType
);
