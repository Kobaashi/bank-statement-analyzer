"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { SummaryCardsProps } from "@/shared/interface/SummaryCard";

export function SummaryCards({ result }: SummaryCardsProps) {
  const stats = useMemo(() => {
    return result.reduce(
      (acc, item) => {
        const val =
          typeof item.amount === "string"
            ? parseFloat(item.amount)
            : item.amount;
        if (!isNaN(val)) {
          if (val > 0) {
            acc.income += val;
          } else {
            acc.expense += Math.abs(val);
          }
        }
        return acc;
      },
      { income: 0, expense: 0 },
    );
  }, [result]);

  const netResult = stats.income - stats.expense;

  if (result.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
      <Card title="General inflow" value={stats.income} type="income" />
      <Card title="General outflow" value={stats.expense} type="expense" />
      <Card title="Net income" value={netResult} type="net" />
      <Card title="Transactions" value={result.length} type="count" />
    </div>
  );
}

function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number;
  type: string;
}) {
  const isCount = type === "count";

  return (
    <div className="p-4 border rounded-xl bg-card shadow-sm flex flex-col space-y-1">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p
        className={cn(
          "text-2xl font-bold tracking-tight",
          type === "income" && "text-green-600",
          type === "expense" && "text-red-500",
          type === "net" && (value >= 0 ? "text-green-600" : "text-red-500"),
          isCount && "text-foreground",
        )}
      >
        {isCount
          ? value
          : `${value.toLocaleString(undefined, { minimumFractionDigits: 2 })} ₴`}
      </p>
    </div>
  );
}
