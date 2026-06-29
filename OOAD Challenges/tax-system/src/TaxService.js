import { TAXES } from "./taxes";

export class TaxService {
  static calculate({ product, state, year, price }) {
    const tax = TAXES?.[state]?.[year]?.[product];

    if (tax === undefined)
      throw new Error("Tax rule not found.");

    return {
      taxRate: tax,
      taxValue: price * tax,
      total: price + price * tax,
    };
  };
};