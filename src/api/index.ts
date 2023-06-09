const TWAMM_ENDPOINT = process.env.NEXT_PUBLIC_TWAMM_ENDPOINT;

const api = {
   tokenList: "https://raw.githubusercontent.com/LP-Finance-Inc/token-list/main/token-list.json",
   tokenPair: TWAMM_ENDPOINT + "/global/tokenPair"
}

export default api;

