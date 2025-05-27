'use client';

import { ReactNode, createContext, useContext } from 'react';

const createHookedContext = <T,>(fn: () => T) => {
  type HookReturnType = ReturnType<typeof fn>;

  const Context = createContext({} as HookReturnType);

  const ContextProvider = ({ children }: { children: ReactNode }) => {
    return <Context.Provider value={fn()}>{children}</Context.Provider>;
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const useHook = () => useContext(Context);

  return [useHook, ContextProvider] as const;
};

export default createHookedContext;