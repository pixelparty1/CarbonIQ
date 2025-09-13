import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ReceiptDownloadButtonProps {
  transactionData: any;
  onDownload: (transactionData: any) => void;
}

export function ReceiptDownloadButton({ transactionData, onDownload }: ReceiptDownloadButtonProps) {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-1 mt-2 bg-green-100 hover:bg-green-200 text-green-800 border-green-300"
      onClick={() => onDownload(transactionData)}
    >
      <Download className="w-4 h-4" />
      <span>Download Receipt</span>
    </Button>
  );
}
