import { StrictMode } from "react";

import { Init } from "src/types";
import { NetworkConfigurationProvider } from "src/context/network-configuration-provider";
import { AutoConnectProvider } from "src/context/auto-connect-provider";
import { WalletContextProvider } from "src/context/wallet-context-provider";
import { PreferredExplorerProvider } from "src/context/preferred-explorer";
import WalletPassthroughProvider from "src/context/wallet-passthrough-provider";
import { NotificationProvider } from "src/context/notification-provider";

export function RenderTwamm(props: Init) {
  return (
    <StrictMode>
      <NotificationProvider>
        <NetworkConfigurationProvider>
          <AutoConnectProvider>
            <WalletContextProvider endpoint={props.endpoint}>
              <PreferredExplorerProvider defaultExplorer={props.defaultExplorer}>
                <WalletPassthroughProvider>
                  <div></div>
                </WalletPassthroughProvider>
              </PreferredExplorerProvider>
            </WalletContextProvider>
          </AutoConnectProvider>
        </NetworkConfigurationProvider>
      </NotificationProvider>
    </StrictMode>
  );
}
