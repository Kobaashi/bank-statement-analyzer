import { z } from "zod";

export const TransactionSchema = z.object({
  date: z.string().min(1, "Date requirement"),
  counterparty: z.string().min(1, "Counterparty requirement"),
  description: z.string().min(1, "Description requirement"),
  amount: z.preprocess((val) => Number(val), z.number()),
});

export type Transaction = z.infer<typeof TransactionSchema>;

export interface ParseResult {
  valid: Transaction[];
  errors: { row: number; message: string }[];
}

export interface StatementStats {
  income: number;
  expense: number;
  netResult: number;
  count: number;
}
