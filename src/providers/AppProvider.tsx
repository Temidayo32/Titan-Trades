"use client"
import { useAppStore } from "../stores/AppContext";

const AppStateProvider = ({children} : {children: React.ReactNode}) => {
    // const cart = useAppStore((state) => state.cart);
    // const user = useAppStore((state) => state.user);

    return (
        <>
          {children}
        </>
      );
}

export default AppStateProvider;