import { Props } from "@/shared/props/type";

export function GetTopFiveByOutFlow({ result }: Props) {
  if (!result || !Array.isArray(result)) return [];

  const filtered = result.filter((res: any) => {
    const amountStr = res.amount || res.Amount;
    const name = res.counterparty || res.Counterparty;

    const amount = parseFloat(amountStr);

    return name && !isNaN(amount) && amount < 0;
  });

  return filtered
    .sort((a: any, b: any) => {
      const amtA = parseFloat(a.amount || a.Amount);
      const amtB = parseFloat(b.amount || b.Amount);
      return amtA - amtB;
    })
    .slice(0, 5);
}
