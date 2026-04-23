import { describe, it, expect } from "vitest";
import { GetTopFiveByOutFlow } from "../statement";
import { Transaction } from "@/shared/type/statement";

describe("GetTopFiveByOutFlow", () => {
  it("should filter expenses (negative values) and return the top 5 by magnitude", () => {
    const mockData: Transaction[] = [
      {
        date: "2025-01-01",
        description: "test",
        counterparty: "Vendor A",
        amount: -100,
      },
      {
        date: "2025-01-01",
        description: "test",
        counterparty: "Vendor B",
        amount: -500,
      },
      {
        date: "2025-01-01",
        description: "test",
        counterparty: "Vendor C",
        amount: 200,
      },
      {
        date: "2025-01-01",
        description: "test",
        counterparty: "Vendor D",
        amount: -1000,
      },
      {
        date: "2025-01-01",
        description: "test",
        counterparty: "Vendor E",
        amount: -50,
      },
      {
        date: "2025-01-01",
        description: "test",
        counterparty: "Vendor F",
        amount: -300,
      },
      {
        date: "2025-01-01",
        description: "test",
        counterparty: "Vendor G",
        amount: -2000,
      },
    ];

    const result = GetTopFiveByOutFlow({ result: mockData });

    expect(result).toHaveLength(5);

    expect(result[0].counterparty).toBe("Vendor G");
    expect(result[0].amount).toBe(-2000);

    const hasInflow = result.some((item) => item.amount > 0);
    expect(hasInflow).toBe(false);
  });

  it("should return an empty array if input data is invalid", () => {
    expect(GetTopFiveByOutFlow({ result: null as any })).toEqual([]);
    expect(GetTopFiveByOutFlow({ result: "not-an-array" as any })).toEqual([]);
  });

  it("should ignore entries with a positive amount (not an expense)", () => {
    const mockData: Transaction[] = [
      {
        date: "2025-01-01",
        description: "test",
        counterparty: "Valid Expense",
        amount: -100,
      },
      {
        date: "2025-01-01",
        description: "test",
        counterparty: "Inflow",
        amount: 100,
      },
    ];

    const result = GetTopFiveByOutFlow({ result: mockData });
    expect(result).toHaveLength(1);
    expect(result[0].counterparty).toBe("Valid Expense");
  });
});
