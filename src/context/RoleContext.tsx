import { createContext, useContext, useState, type ReactNode } from "react";

export type Role = "user" | "admin" | null;

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | null>(null);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>(null);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const useRole = useContext(RoleContext);
  if (!useRole) {
    throw new Error("useRole must be used inside RoleProvider");
  }
  return useRole;
};
