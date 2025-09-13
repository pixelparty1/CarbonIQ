import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileDown } from "lucide-react";
import { ReceiptDownloadButton } from "./ReceiptDownloadButton";

interface Transaction {
  id: string;
  projectName: string;
  credits: number;
  date: string;
  type: 'buy' | 'sell';
}

interface NotificationsDropdownProps {
  transactions: Transaction[];
}

export function NotificationsDropdown({ transactions }: NotificationsDropdownProps) {
  const handleDownloadReceipt = async (transaction: Transaction) => {
    try {
      // Format transaction data for the PDF generator
      const transactionData = {
        id: transaction.id,
        project_name: transaction.projectName,
        credits_amount: transaction.credits,
        quantity: transaction.credits, // Assuming 1:1 ratio
        method: transaction.type === 'buy' ? 'Purchase' : 'Sale',
        status: 'Completed',
        date: transaction.date,
        // Additional fields can be added if available in your transaction data
      };
      
      // Dynamically import the PDF generator to avoid issues during page load
      const pdfModule = await import('@/lib/pdf-generator');
      pdfModule.downloadTransactionReceipt(transactionData);
    } catch (error) {
      console.error('Error generating transaction receipt:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {transactions.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {transactions.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex flex-col space-y-2 p-2">
          <h3 className="font-semibold text-sm px-2 py-1">Transaction Receipts</h3>
          {transactions.length === 0 ? (
            <p className="text-sm text-gray-500 px-2">No transactions yet</p>
          ) : (
            transactions.map((transaction) => (
              <DropdownMenuItem
                key={transaction.id}
                className="flex items-start justify-between p-2 hover:bg-gray-100 rounded-md"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{transaction.projectName}</span>
                  <span className="text-sm text-gray-500">
                    {transaction.type === 'buy' ? 'Purchased' : 'Sold'} {transaction.credits} credits
                  </span>
                  <span className="text-xs text-gray-400">{transaction.date}</span>
                </div>
                <ReceiptDownloadButton
                  transactionData={{
                    id: transaction.id,
                    project_name: transaction.projectName,
                    credits_amount: transaction.credits,
                    quantity: transaction.credits,
                    method: transaction.type === 'buy' ? 'Purchase' : 'Sale',
                    status: 'Completed',
                    date: transaction.date
                  }}
                  onDownload={handleDownloadReceipt}
                />
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
