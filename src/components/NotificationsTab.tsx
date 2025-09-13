import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bell, Download } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ReceiptDownloadButton } from './ReceiptDownloadButton';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  transactionData?: any;
}

export function NotificationsTab() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // This would typically load notifications from a database
    // For now, we'll just simulate having some notifications
    const loadNotifications = async () => {
      try {
        // In a real implementation, you would fetch from the database
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) return;
        
        // You could implement a real notifications table in your database
        // For now we'll just simulate notifications
        // In a real app, you'd fetch actual notifications from the database
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    };
    
    loadNotifications();
  }, []);
  
  const handleDownloadReceipt = async (transactionData: any) => {
    try {
      // Dynamic import to avoid issues during initial page load
      const pdfModule = await import('@/lib/pdf-generator');
      pdfModule.downloadTransactionReceipt(transactionData);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // This is a sample notification that might be displayed in the tab
  const sampleNotification = {
    id: 'sample-1',
    type: 'transaction',
    title: 'Carbon Offset Verification',
    message: 'Your carbon offset request has been received. We will contact you shortly for verification.',
    timestamp: new Date().toISOString(),
    read: false,
    transactionData: {
      id: `TR-${Date.now()}`,
      project_name: "Plant Trees",
      credits_amount: 1,
      quantity: 50,
      method: "Plant Trees",
      status: "Pending Verification",
      date: new Date().toISOString(),
      impact: "50 trees will absorb approximately 3.00 tons of CO2 over 10 years"
    }
  };
  
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {(notifications.length > 0 || true) && (
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        )}
      </Button>
      
      {isOpen && (
        <Card className="absolute right-0 mt-2 w-80 p-4 z-50 bg-white shadow-lg rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Notifications</h3>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
          
          <div className="space-y-2">
            {/* We'll show our sample notification to demonstrate the receipt download */}
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium">{sampleNotification.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{sampleNotification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(sampleNotification.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              
              {sampleNotification.transactionData && (
                <ReceiptDownloadButton 
                  transactionData={sampleNotification.transactionData}
                  onDownload={handleDownloadReceipt}
                />
              )}
            </div>
            
            {/* We would map through actual notifications here */}
            {notifications.map((notification) => (
              <div key={notification.id} className="p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium">{notification.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                {notification.transactionData && (
                  <ReceiptDownloadButton 
                    transactionData={notification.transactionData}
                    onDownload={handleDownloadReceipt}
                  />
                )}
              </div>
            ))}
            
            {notifications.length === 0 && !sampleNotification && (
              <p className="text-sm text-gray-500 py-2">No notifications yet.</p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
