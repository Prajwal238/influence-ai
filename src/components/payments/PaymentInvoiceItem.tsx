
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertTriangle, DollarSign, CreditCard } from "lucide-react";

interface Invoice {
  id: string;
  influencer: string;
  handle: string;
  amount: string;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
  paidDate?: string;
  milestone: string;
}

interface PaymentInvoiceItemProps {
  invoice: Invoice;
}

const PaymentInvoiceItem = ({ invoice }: PaymentInvoiceItemProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "overdue": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <DollarSign className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="border border-gray-100 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          {getStatusIcon(invoice.status)}
          <div>
            <h4 className="font-medium text-gray-900">{invoice.influencer}</h4>
            <p className="text-sm text-gray-600">{invoice.handle}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-lg text-gray-900">{invoice.amount}</p>
          <Badge className={getStatusColor(invoice.status)}>
            {invoice.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div>
          <span className="text-gray-600">Invoice ID</span>
          <p className="font-medium">{invoice.id}</p>
        </div>
        <div>
          <span className="text-gray-600">Due Date</span>
          <p className="font-medium">{invoice.dueDate}</p>
        </div>
        <div>
          <span className="text-gray-600">Milestone</span>
          <p className="font-medium">{invoice.milestone}</p>
        </div>
      </div>

      {invoice.paidDate && (
        <div className="bg-green-50 border border-green-200 rounded p-2 mb-3">
          <p className="text-sm text-green-800">
            Paid on {invoice.paidDate}
          </p>
        </div>
      )}

      <div className="flex space-x-2">
        <Button variant="outline" size="sm">
          View Details
        </Button>
        {invoice.status === "pending" && (
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <CreditCard className="h-4 w-4 mr-1" />
            Pay Now
          </Button>
        )}
        {invoice.status === "overdue" && (
          <Button size="sm" variant="destructive">
            <AlertTriangle className="h-4 w-4 mr-1" />
            Pay Overdue
          </Button>
        )}
      </div>
    </div>
  );
};

export default PaymentInvoiceItem;
