import type { TokenPair } from "@twamm/types";

export type PairConfig = Pick<TokenPair["configA"], "decimals" | "mint">;
