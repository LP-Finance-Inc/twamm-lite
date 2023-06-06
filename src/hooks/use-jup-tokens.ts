import type { Cluster } from "@solana/web3.js";
import { SplToken } from "@twamm/client.js/lib/spl-token";
import useSWR from "swr";
import { TOKEN_LIST_URL } from "@jup-ag/core";

import useBlockchain from "src/contexts/solana-connection-context";
import useTwammLiteParams from "src/contexts/twamm-lite-params-context";
import { tokenBRegistry } from "src/token-pair-registry";
import { TokenRegistry } from "src/types";

const swrKey = (params: {
  moniker: Cluster;
  supportedToken: TokenRegistry;
}) => ({
  key: "JupTokens",
  params,
});

const isSol = (t: JupToken) => SplToken.isNativeAddress(t.address);

const fetcher = async ({ params }: SWRParams<typeof swrKey>) => {
  const { moniker, supportedToken } = params;

  let ADDRESSES: string[];
  try {
    ADDRESSES = Array.from(
      new Set(Object.keys(supportedToken).concat(tokenBRegistry))
    );
  } catch (e) {
    ADDRESSES = ["EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"];
  }

  const hasProperAddress = (t: JupToken) => ADDRESSES.includes(t.address);

  const allTokens: Array<JupToken> = await (
    await fetch(TOKEN_LIST_URL[moniker])
  ).json();

  const neededTokens = allTokens
    .filter((t) => hasProperAddress(t) || isSol(t))
    .map(({ address, decimals, logoURI, name, symbol }) => ({
      address,
      decimals,
      logoURI,
      name,
      symbol,
    }));

  return neededTokens;
};

export default (_: void, options = {}) => {
  const { clusters } = useBlockchain();
  const { supportedToken } = useTwammLiteParams();

  const moniker = clusters[0].moniker as "mainnet-beta";

  return useSWR(swrKey({ moniker, supportedToken }), fetcher, options);
};
