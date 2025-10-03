"use client";

import StoreProvider from "@/state/redux";
import { Authenticator } from "@aws-amplify/ui-react";
import Auth from "./(auth)/authProvider";
import { SocketProvider } from "@/contexts/SocketContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <Authenticator.Provider>
        <Auth>
          <SocketProvider>
            {children}
          </SocketProvider>
        </Auth>
      </Authenticator.Provider>
    </StoreProvider>
  );
}
export default Providers;