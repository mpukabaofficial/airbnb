import axios from "axios";
import { ReactElement, createContext, useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
};
type UserContextValue = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  ready: boolean;
};

type UserContextProviderProps = {
  children: ReactElement | ReactElement[];
};

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
  ready: false,
});

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
