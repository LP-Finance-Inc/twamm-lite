import useSWR from "swr";

import api from "src/api";

const swrKey = (params: {}) => ({
  key: "tokenPair",
  params,
});

const fetcher = (tokenPair: string) => async () => {
  const response = await fetch(tokenPair);
  const data = await response.json();
  return data;
};

export default (_: void, options = {}) => {
  const { tokenPair } = api;
  return useSWR(swrKey({}), fetcher(tokenPair), options);
};
