import { useEffect } from "react";
import { OrderSide } from "@twamm/types/lib";
import M, { Extra } from "easy-maybe/lib";

// import { Provider as TIFProvider } from "src/contexts/tif-context";
import useAddressPairs from "src/hooks/use-address-pairs";
import useJupTokensByMint from "src/hooks/use-jup-tokens-by-mint";
import useTokenExchange, { action as A } from "src/hooks/use-token-exchange";

export type TradeStruct = {
  amount: number;
  pair: AddressPair;
  type: OrderSide;
};

export default function TokenExchange(props: { onTradeChange: (arg0: TradeStruct) => void; trade: TradeStruct }) {
  const tokenPairs = useAddressPairs();
  const tokenPair = useJupTokensByMint(props.trade.pair);
  const [state, dispatch] = useTokenExchange();

  console.log("tokenPairs", tokenPairs);

  useEffect(() => {
    M.andMap(([pairs, pair, type]) => {
      dispatch(A.init({ pairs, pair, type }));
    }, Extra.combine3([M.of(tokenPairs.data), M.of(tokenPair.data), M.of(props.trade.type)]));
    return () => {};
  }, [dispatch, props.trade, tokenPairs.data, tokenPair.data]);

  return <div>home</div>;
}
