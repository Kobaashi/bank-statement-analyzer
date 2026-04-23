import { GetTopFiveByOutFlow } from "@/lib/statement";
import { Props } from "@/shared/type/type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { cn } from "@/lib/utils";
import { Transaction } from "@/shared/type/statement";

export function TopFive({ result }: Props) {
  const filteredData = GetTopFiveByOutFlow({ result });

  if (filteredData.length === 0) return null;

  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Counterparty</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((res: Transaction, index: number) => (
            <TableRow key={index} className="hover:bg-muted/30">
              <TableCell className="font-medium px-4 py-3">
                {res.date}
              </TableCell>
              <TableCell className="px-4 py-3">{res.counterparty}</TableCell>
              <TableCell className="px-4 py-3">{res.description}</TableCell>
              <TableCell
                className={cn(
                  "text-right px-4 py-3 font-mono",
                  Number(res.amount) < 0 ? "text-red-500" : "text-green-500",
                )}
              >
                {res.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
