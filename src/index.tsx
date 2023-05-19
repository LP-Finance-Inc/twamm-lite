import { SWRConfig } from "swr";
import { StrictMode } from "react";

import { Init } from "src/types";
import { NetworkConfigurationProvider } from "src/contexts/network-configuration-provider";
import { AutoConnectProvider } from "src/contexts/auto-connect-provider";
import { WalletContextProvider } from "src/contexts/wallet-context-provider";
import WalletPassthroughProvider from "src/contexts/wallet-passthrough-provider";
import { NotificationProvider } from "src/contexts/notification-provider";
import * as SolanaCtx from "src/contexts/solana-connection-context";
import { CoingeckoApiProvider } from "src/contexts/coingecko-api-context";
import { Provider as JupiterV4ApiProvider } from "src/contexts/jupiter-v4-api-context";
import { Provider as TxProvider } from "src/contexts/transaction-runner-context";
import TwammApp from "src/organisms/twamm-app";
import swrConfig from "./swr-options";

export function RenderTwamm(props: Init) {
  return (
    <StrictMode>
      <NotificationProvider>
        <CoingeckoApiProvider>
          <JupiterV4ApiProvider>
            <NetworkConfigurationProvider>
              <AutoConnectProvider>
                <SolanaCtx.Provider endpoint={props.endpoint}>
                  <WalletContextProvider endpoint={props.endpoint}>
                    <WalletPassthroughProvider>
                      <SWRConfig value={swrConfig}>
                        <TxProvider>
                          <TwammApp {...props} />
                        </TxProvider>
                      </SWRConfig>
                    </WalletPassthroughProvider>
                  </WalletContextProvider>
                </SolanaCtx.Provider>
              </AutoConnectProvider>
            </NetworkConfigurationProvider>
          </JupiterV4ApiProvider>
        </CoingeckoApiProvider>
      </NotificationProvider>
    </StrictMode>
  );
}
