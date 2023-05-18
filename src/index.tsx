import { StrictMode } from "react";

import { Init } from "src/types";
import { NetworkConfigurationProvider } from "src/context/network-configuration-provider";
import { AutoConnectProvider } from "src/context/auto-connect-provider";
import { WalletContextProvider } from "src/context/wallet-context-provider";
import WalletPassthroughProvider from "src/context/wallet-passthrough-provider";
import { NotificationProvider } from "src/context/notification-provider";
import * as SolanaCtx from "src/context/solana-connection-context";

export function RenderTwamm(props: Init) {
  return (
    <StrictMode>
      <NotificationProvider>
        <NetworkConfigurationProvider>
          <AutoConnectProvider>
            <SolanaCtx.Provider endpoint={props.endpoint}>
              <WalletContextProvider endpoint={props.endpoint}>
                <WalletPassthroughProvider>
                  <div></div>
                </WalletPassthroughProvider>
              </WalletContextProvider>
            </SolanaCtx.Provider>
          </AutoConnectProvider>
        </NetworkConfigurationProvider>
      </NotificationProvider>
    </StrictMode>
  );
}
