"use client";

import { useState } from "react";
import { DropzoneField } from "@/components/DropField";
import Papa from "papaparse";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { cn } from "@/lib/utils";
import { ButtonGroup } from "./ui/button-group";
import { Button } from "./ui/button";

enum CurrentMode {
  All = "all",
  Inflow = "inflow",
  Outflow = "outflow",
}

export function AnalyzerContainer() {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState([] as any[]);
  const [mode, setMode] = useState<CurrentMode>(CurrentMode.All);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setIsProcessing(true);
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setResult(results.data);
          console.log("Parsed CSV data:", results.data);
          setIsProcessing(false);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
          setIsProcessing(false);
        },
      });
    }
  };

  return (
    <div className="w-full h-screen max-w-4xl mt-10 space-y-8">
      <DropzoneField onFileChange={handleFileChange} />
      <ButtonGroup>
        <Button
          onClick={() => setMode(CurrentMode.All)}
          className={cn("transition-colors cursor-pointer")}
        >
          All
        </Button>

        <Button
          onClick={() => setMode(CurrentMode.Inflow)}
          className={cn("transition-colors cursor-pointer")}
        >
          Only Inflow
        </Button>

        <Button
          onClick={() => setMode(CurrentMode.Outflow)}
          className={cn("transition-colors cursor-pointer")}
        >
          Only Outflow
        </Button>
      </ButtonGroup>
      {!isProcessing && mode === CurrentMode.All && (
        <div className="mt-6 border rounded-xl overflow-hidden">
          <Table>
            <TableCaption className="pb-4">
              Recent all transactions from your CSV
            </TableCaption>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[120px] px-4">Date</TableHead>
                <TableHead className="px-4">Counterparty</TableHead>
                <TableHead className="px-4">Description</TableHead>
                <TableHead className="text-right px-4">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.map((res, index) => (
                <TableRow key={index} className="hover:bg-muted/30">
                  <TableCell className="font-medium px-4 py-3">
                    {res.date}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {res.counterparty}
                  </TableCell>
                  <TableCell className="px-4 py-3">{res.description}</TableCell>
                  <TableCell
                    className={cn(
                      "text-right px-4 py-3 font-mono",
                      Number(res.amount) < 0
                        ? "text-red-500"
                        : "text-green-500",
                    )}
                  >
                    {res.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {!isProcessing && mode === CurrentMode.Inflow && (
        <div className="mt-6 border rounded-xl overflow-hidden">
          <Table>
            <TableCaption className="pb-4">
              Recent only inflow transactions from your CSV
            </TableCaption>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[120px] px-4">Date</TableHead>
                <TableHead className="px-4">Counterparty</TableHead>
                <TableHead className="px-4">Description</TableHead>
                <TableHead className="text-right px-4">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result
                .filter((res) => res.amount > 0)
                .map((res, index) => (
                  <TableRow key={index} className="hover:bg-muted/30">
                    <TableCell className="font-medium px-4 py-3">
                      {res.date}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {res.counterparty}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {res.description}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right px-4 py-3 font-mono",
                        Number(res.amount) < 0
                          ? "text-red-500"
                          : "text-green-500",
                      )}
                    >
                      {res.amount}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
      {!isProcessing && mode === CurrentMode.Outflow && (
        <div className="mt-6 border rounded-xl overflow-hidden">
          <Table>
            <TableCaption className="pb-4">
              Recent only outflow transactions from your CSV
            </TableCaption>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[120px] px-4">Date</TableHead>
                <TableHead className="px-4">Counterparty</TableHead>
                <TableHead className="px-4">Description</TableHead>
                <TableHead className="text-right px-4">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result
                .filter((res) => res.amount < 0)
                .map((res, index) => (
                  <TableRow key={index} className="hover:bg-muted/30">
                    <TableCell className="font-medium px-4 py-3">
                      {res.date}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {res.counterparty}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {res.description}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right px-4 py-3 font-mono",
                        Number(res.amount) < 0
                          ? "text-red-500"
                          : "text-green-500",
                      )}
                    >
                      {res.amount}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
