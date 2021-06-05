import axios from "axios";
import { BadRequestError } from "../../errors/bad-request-error";

interface ConvertType {
  from_currency: string;
  amount: number;
  to_currency: string;
}

const currencyConverter = async (opts: ConvertType) => {
  // perform some actions(conversions
  try {
    const url = "https://pro-api.coinmarketcap.com/v1/tools/price-conversion";

    const headers = {
      "X-CMC_PRO_API_KEY": process.env.COINBASE_API_KEY!,
    };

    const qs = {
      amount: opts.amount,
      symbol: opts.from_currency,
      convert: opts.to_currency,
    };

    const { data } = await axios.get(url, { params: qs, headers: headers });

    return {
      amount: data.data.quote[opts.to_currency].price,
      currency: opts.to_currency,
    };
  } catch (error) {
    throw new BadRequestError(`An error occurred`);
  }
};

export { currencyConverter };
