"use client";

import { type Category } from "@/types/Category";
import TransactionForm, { transactionFormSchema } from "./TransactionForm";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { updateTransaction } from "@/app/actions/transactions";
import { format } from "date-fns";

function EditTransactionForm({
  categories,
  transaction,
}: {
  categories: Array<Category>;
  transaction: {
    id: number;
    amount: string;
    categoryId: number;
    description: string;
    transactionDate: string;
  };
}) {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await updateTransaction({
      id: transaction.id,
      amount: data.amount,
      description: data.description,
      categoryId: data.categoryId,
      transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
    });

    if (result?.error) {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Transaction updated!",
      variant: "success",
    });

    router.push(
      `/dashboard/transactions?month=${
        data.transactionDate.getMonth() + 1
      }&year=${data.transactionDate.getFullYear()}`
    );
  };

  return (
    <TransactionForm
      categories={categories}
      onSubmit={handleSubmit}
      defaultValues={{
        amount: Number(transaction.amount),
        categoryId: transaction.categoryId,
        description: transaction.description,
        transactionDate: new Date(transaction.transactionDate),
        transactionType:
          categories.find((category) => category.id === transaction.categoryId)
            ?.type ?? "income",
      }}
    />
  );
}
export default EditTransactionForm;
