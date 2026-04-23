import { StatementStats, Transaction } from "@/shared/type/statement";

export function calculateStatementStats(result: Transaction[]): StatementStats {
  if (!result || !Array.isArray(result)) {
    return {
      income: 0,
      expense: 0,
      netResult: 0,
      count: 0,
    };
  }

  const stats = result.reduce(
    (acc, t) => {
      const val =
        typeof t.amount === "string" ? parseFloat(t.amount) : t.amount;

      if (!isNaN(val)) {
        if (val > 0) acc.income += val;
        else acc.expense += Math.abs(val);
      }
      return acc;
    },
    { income: 0, expense: 0 },
  );

  return {
    ...stats,
    netResult: stats.income - stats.expense,
    count: result.length,
  };
}

export function GetTopFiveByOutFlow({
  result,
}: {
  result: Transaction[];
}): Transaction[] {
  if (!result || !Array.isArray(result)) {
    return [];
  }

  return [...result]
    .filter((t) => t.amount < 0)
    .sort((a, b) => a.amount - b.amount)
    .slice(0, 5);
}
