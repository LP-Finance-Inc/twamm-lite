import type { ChangeEvent, MouseEvent } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { useState, useMemo, useCallback } from "react";

import SearchIcon from "src/icons/search-icon";
import useJupTokensByMint from "src/hooks/use-jup-tokens-by-mint";
import i18n from "src/i18n/en.json";
import CoinSelectList from "src/molecules/coin-select-list";
import Loading from "src/atoms/loading";

const populateTokenRecords = (data?: JupToken[]) => {
  if (!data) return {};

  const records: Record<string, TokenInfo> = {};
  data.forEach((token) => {
    try {
      records[token.symbol.toLowerCase()] = {
        ...token,
        image: token.logoURI,
      };
      // eslint-disable-next-line no-empty
    } catch (error) {}
  });

  return records;
};

export interface CoinSelectProps {
  onSelect: (arg0: TokenInfo) => void;
  tokens?: PublicKey[];
  publicKey: PublicKey | null;
  connection: Connection;
}

export default ({
  onSelect,
  tokens,
  publicKey,
  connection,
}: CoinSelectProps) => {
  const [search, setSearch] = useState<string>();

  const { data, isLoading } = useJupTokensByMint(tokens);

  const coinRecords = useMemo(() => populateTokenRecords(data), [data]);

  const onCoinSelect = useCallback(
    (_: MouseEvent, symbol: string) => {
      onSelect(coinRecords[symbol.toLowerCase()]);
    },
    [coinRecords, onSelect]
  );

  const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearch(value.toLowerCase());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div
        className="flex px-5 mt-4 w-[98%] rounded-xl bg-[#212128]"
        style={{ height: 56, maxHeight: 56 }}
      >
        <SearchIcon />
        <input
          type="text"
          autoComplete="off"
          value={search}
          className="w-full rounded-xl ml-4 truncate bg-[#212128] text-white/50 placeholder:text-white/20"
          placeholder={i18n.CoinSelectorSearch}
          onChange={onSearch}
        />
      </div>
      <CoinSelectList
        data={coinRecords}
        filterValue={search}
        onClick={onCoinSelect}
        publicKey={publicKey}
        connection={connection}
      />
    </>
  );
};
