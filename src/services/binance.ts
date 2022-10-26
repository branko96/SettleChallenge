import axios from 'axios';

export const getSymbolRates = async (symbol: string) => {
  return axios.get(
    'https://api.binance.com/api/v3/ticker/price?symbol=' + symbol,
  );
};
