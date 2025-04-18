import { createContext, useMemo, useState } from "react";

interface ContextValue {
  lastSelectedProductId: { id: string };
  setLastSelectedProductId: React.Dispatch<
    React.SetStateAction<{ id: string }>
  >;
}

type Props = {
  children: React.ReactNode;
};

const MainContext = createContext<ContextValue | null>(null);
const MainProvider = ({ children }: Props) => {
  const [lastSelectedProductId, setLastSelectedProductId] = useState({
    id: "p1",
  });

  const contextValue = useMemo(
    () => ({
      lastSelectedProductId,
      setLastSelectedProductId,
    }),
    [lastSelectedProductId, setLastSelectedProductId]
  );

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};

export { MainContext, MainProvider };
