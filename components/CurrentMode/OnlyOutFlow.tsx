import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Props } from "@/shared/type/type";

export default function OutFlow({ result }: Props) {
  return (
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
            .filter((res: any) => res.amount < 0)
            .map((res: any, index: any) => (
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
