import type { Idl } from "@project-serum/anchor";
import idlJson from "../idl.json";

export const idl = idlJson as Idl;

export const ankrClusterApiUrl = "https://rpc.ankr.com/solana";

export const ClusterApiUrl = process.env.NEXT_PUBLIC_CLUSTER_API_URL || ""; // dynamic

export const programId: string | undefined =
  process.env.NEXT_PUBLIC_PROGRAM_ADDRESS;

export const feeAccount: string = process.env.NEXT_PUBLIC_FEE_ACCOUNT || ""; // dynamic

export const feeBps: string = process.env.NEXT_PUBLIC_FEE_BPS || "0"; // dynamic

export const platformFeeAccount: string =
  process.env.NEXT_PUBLIC_PLATFORM_FEE_ACCOUNT || ""; // dynamic

export const JUPITER_CONFIG_URI = "https://quote-api.jup.ag";

export const JUPITER_PRICE_ENDPOINT_V4 = "https://price.jup.ag/v4/price";

export const NEXT_PUBLIC_ENABLE_TX_SIMUL =
  process.env.NEXT_PUBLIC_ENABLE_TX_SIMUL || "";

export const NEXT_PUBLIC_SUPPORTED_TOKEN =
  process.env.NEXT_PUBLIC_SUPPORTED_TOKEN || ""; // dynamic

export const STARRED_COINS =
  process.env.NEXT_PUBLIC_STARRED_COINS?.split(",") || [];
