
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PaymentInvoiceItem from "./PaymentInvoiceItem";

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

interface PaymentInvoicesListProps {
  invoices: Invoice[];
}

const PaymentInvoicesList = ({ invoices }: PaymentInvoicesListProps) => {
  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Payment Invoices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <PaymentInvoiceItem key={invoice.id} invoice={invoice} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentInvoicesList;
