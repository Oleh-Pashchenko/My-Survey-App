import { usePathname, useRouter } from 'next/navigation';
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface UserContextType {
  userData: any;
  setUserData: Dispatch<SetStateAction<any>>;
}

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<any>(null);
  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    if (!userData) {
      router.push('/');
    }
  }, [userData, router, pathname]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
};
