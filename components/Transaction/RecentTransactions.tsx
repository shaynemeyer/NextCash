import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getRecentTransactions } from "@/data/queries/getRecentTransactions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import numeral from "numeral";
import { Badge } from "../ui/badge";
import { format } from "date-fns";

async function RecentTransactions() {
  const recentTransactions = await getRecentTransactions();

  console.log({ recentTransactions });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Recent Transactions</span>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/dashboard/transactions">View All</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/transactions/new">Create New</Link>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!recentTransactions?.length && (
          <p className="text-center py-10 text-lg text-muted-foreground">
            There are no recent transactions
          </p>
        )}
        {!!recentTransactions?.length && (
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions?.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {format(transaction.transactionDate, "do MMM yyyy")}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="capitalize">
                    <Badge
                      className={
                        transaction.transactionType === "income"
                          ? "bg-lime-500"
                          : "bg-orange-500"
                      }
                    >
                      {transaction.transactionType}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    ${numeral(transaction.amount).format("0,0[.]00")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
export default RecentTransactions;
