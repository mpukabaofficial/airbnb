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
};

type UserContextProviderProps = {
  children: ReactElement | ReactElement[];
};

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
});

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (!user) {
      axios.get("/profile");
    }
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
