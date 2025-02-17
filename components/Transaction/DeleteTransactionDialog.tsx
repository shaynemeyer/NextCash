"use client";

import { Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { deleteTransaction } from "@/app/actions/transactions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function DeleteTransactionDialog({
  transactionId,
  transactionDate,
}: {
  transactionId: number;
  transactionDate: string;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteConfirm = async () => {
    const result = await deleteTransaction(transactionId);

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
      description: "Transaction deleted!",
      variant: "success",
    });

    const [year, month] = transactionDate.split("-");

    router.push(`/dashboard/transactions?month=${month}&year=${year}`);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This transaction will be permanently
            deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDeleteConfirm} variant="destructive">
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default DeleteTransactionDialog;
