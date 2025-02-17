import DeleteTransactionDialog from "@/components/Transaction/DeleteTransactionDialog";
import EditTransactionForm from "@/components/Transaction/EditTransactionForm";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/data/queries/getCategories";
import { getTransaction } from "@/data/queries/getTransaction";

import { notFound } from "next/navigation";

async function TransactionEditPage({
  params,
}: {
  params: Promise<{ transactionId: string }>;
}) {
  const paramsValues = await params;
  const transactionId = Number(paramsValues.transactionId);

  if (isNaN(transactionId)) {
    notFound();
  }

  const categories = await getCategories();
  const transaction = await getTransaction(transactionId);

  if (!transaction) {
    notFound();
  }

  return (
    <Card className="mt-4 max-w-screen-md">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Edit Transaction</span>
          <DeleteTransactionDialog
            transactionId={transaction.id}
            transactionDate={transaction.transactionDate}
          />
        </CardTitle>
        <CardContent className="ml-[-1.5rem]">
          <EditTransactionForm
            categories={categories}
            transaction={transaction}
          />
        </CardContent>
      </CardHeader>
    </Card>
  );
}
export default TransactionEditPage;
