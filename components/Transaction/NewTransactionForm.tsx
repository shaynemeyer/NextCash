"use client";

import { Category } from "@/types/Category";
import { z } from "zod";
import TransactionForm, { transactionFormSchema } from "./TransactionForm";
import { createTransaction } from "@/app/actions/transactions";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function NewTransactionForm({ categories }: { categories: Array<Category> }) {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await createTransaction({
      amount: data.amount,
      transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
      categoryId: data.categoryId,
      description: data.description,
    });

    if (result.error) {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Transaction created successfully!",
      variant: "success",
    });

    router.push(
      `/dashboard/transactions?month=${
        data.transactionDate.getMonth() + 1
      }&year=${data.transactionDate.getFullYear()}`
    );
  };
  return <TransactionForm categories={categories} onSubmit={handleSubmit} />;
}
export default NewTransactionForm;
