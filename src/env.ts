import type { Idl } from "@project-serum/anchor";

import idlJson from "../idl.json";

export const idl = idlJson as Idl;

export const ankrClusterApiUrl = "https://rpc.ankr.com/solana";

export const ClusterApiUrl = process.env.NEXT_PUBLIC_CLUSTER_API_URL || "";

export const programId: string = "TWAPzC9xaeBpgDNF26z5VAcmxBowVz5uqmTx47LkWUy";

export const feeAccount: string = process.env.NEXT_PUBLIC_FEE_ACCOUNT || "";

export const feeBps: string = process.env.NEXT_PUBLIC_FEE_BPS || "0";

export const platformFeeAccount: string = "";

export const JUPITER_CONFIG_URI = "https://quote-api.jup.ag";

export const JUPITER_PRICE_ENDPOINT_V4 = "https://price.jup.ag/v4/price";

export const NEXT_PUBLIC_ENABLE_TX_SIMUL: string = "0";
