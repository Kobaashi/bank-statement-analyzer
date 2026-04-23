"use client";

import { DropzoneField } from "@/components/DropField";
import { CurrentMode } from "@/shared/enum/CurrentMode";
import { useState } from "react";
import Papa from "papaparse";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import All from "@/components/CurrentMode/All";
import InFlow from "@/components/CurrentMode/OnlyInflow";
import OutFlow from "@/components/CurrentMode/OnlyOutFlow";
import { TopFive } from "@/components/TopFive";
import { Input } from "@/components/ui/input";
import { SummaryCards } from "@/components/SummaryCard";
import { Transaction, TransactionSchema } from "@/shared/type/statement";

export default function Home() {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [mode, setMode] = useState<CurrentMode>(CurrentMode.All);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setIsProcessing(true);
      setErrors([]);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const validTransactions: Transaction[] = [];
          const errorLogs: string[] = [];

          results.data.forEach((row: any, index: number) => {
            const validation = TransactionSchema.safeParse(row);
            if (validation.success) {
              validTransactions.push(validation.data);
            } else {
              errorLogs.push(
                `Рядок ${index + 1}: ${validation.error.issues[0].message}`,
              );
            }
          });

          setResult(validTransactions);
          setErrors(errorLogs);
          setIsProcessing(false);
        },
      });
    }
  };

  const filteredData = result.filter((item) => {
    const name = (item.counterparty || "").toLowerCase();
    const desc = (item.description || "").toLowerCase();
    const search = searchQuery.toLowerCase();
    return name.includes(search) || desc.includes(search);
  });

  return (
    <div className="flex flex-col w-full min-h-screen max-w-4xl space-y-8 items-center py-10 mx-auto p-4">
      <DropzoneField onFileChange={handleFileChange} />

      {errors.length > 0 && (
        <div className="w-full p-4 border border-amber-200 bg-amber-50 rounded-lg text-amber-800 text-sm">
          <strong>Missing string: {errors.length}</strong>. Reason: {errors[0]}{" "}
          {errors.length > 1 && "etc..."}
        </div>
      )}

      {result.length > 0 && (
        <>
          <SummaryCards result={result} />

          <div className="flex flex-col md:flex-row gap-4 w-full justify-between items-center">
            <ButtonGroup>
              <Button
                variant={mode === CurrentMode.All ? "default" : "outline"}
                onClick={() => setMode(CurrentMode.All)}
              >
                All
              </Button>
              <Button
                variant={mode === CurrentMode.Inflow ? "default" : "outline"}
                onClick={() => setMode(CurrentMode.Inflow)}
              >
                Inflow
              </Button>
              <Button
                variant={mode === CurrentMode.Outflow ? "default" : "outline"}
                onClick={() => setMode(CurrentMode.Outflow)}
              >
                Outflow
              </Button>
              <Button
                variant={mode === CurrentMode.Top_Five ? "default" : "outline"}
                onClick={() => setMode(CurrentMode.Top_Five)}
              >
                Top 5 Expenses
              </Button>
            </ButtonGroup>

            <Input
              className="max-w-xs"
              placeholder="Search counterparty or desc..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="w-full">
            {!isProcessing && mode === CurrentMode.All && (
              <All result={filteredData} />
            )}
            {!isProcessing && mode === CurrentMode.Inflow && (
              <InFlow result={filteredData} />
            )}
            {!isProcessing && mode === CurrentMode.Outflow && (
              <OutFlow result={filteredData} />
            )}
            {mode === CurrentMode.Top_Five && <TopFive result={result} />}
          </div>
        </>
      )}
    </div>
  );
}
