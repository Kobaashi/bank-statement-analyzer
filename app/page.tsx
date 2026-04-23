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

export default function Home() {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState([] as any[]);
  const [top, setTop] = useState<boolean>(false);
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
    <div className="flex flex-col w-full min-h-screen max-w-4xl space-y-8 items-center justify-center mx-auto p-4">
      <DropzoneField onFileChange={handleFileChange} />
      <ButtonGroup>
        <Button
          onClick={() => setMode(CurrentMode.All)}
          className="cursor-pointer"
        >
          All
        </Button>

        <Button
          onClick={() => setMode(CurrentMode.Inflow)}
          className="cursor-pointer"
        >
          Only Inflow
        </Button>

        <Button
          onClick={() => setMode(CurrentMode.Outflow)}
          className="cursor-pointer"
        >
          Only Outflow
        </Button>

        <Button
          onClick={() => setMode(CurrentMode.Top_Five)}
          className="cursor-pointer"
        >
          View top 5 by outflow
        </Button>
      </ButtonGroup>
      {!isProcessing && mode === CurrentMode.All && <All result={result} />}
      {!isProcessing && mode === CurrentMode.Inflow && (
        <InFlow result={result} />
      )}
      {!isProcessing && mode === CurrentMode.Outflow && (
        <OutFlow result={result} />
      )}
      {mode === CurrentMode.Top_Five && <TopFive result={result} />}
    </div>
  );
}
