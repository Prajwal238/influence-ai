
import CampaignLayout from "@/components/layout/CampaignLayout";
import { useInfluencerData } from "@/hooks/useInfluencerData";
import { useMemo } from "react";
import PaymentInvoicesList from "@/components/payments/PaymentInvoicesList";
import PaymentMilestones from "@/components/payments/PaymentMilestones";
import WalletSummary from "@/components/payments/WalletSummary";
import PaymentStats from "@/components/payments/PaymentStats";
import PaymentMethods from "@/components/payments/PaymentMethods";
import PaymentProtection from "@/components/payments/PaymentProtection";

const Payments = () => {
  const { campaignInfluencers, loading } = useInfluencerData();

  // Generate invoices from campaign influencers
  const invoices = useMemo(() => {
    if (!campaignInfluencers || campaignInfluencers.length === 0) return [];

    return campaignInfluencers.map((influencer, index) => {
      const statuses = ["paid", "pending", "overdue"] as const;
      const status = statuses[index % 3];
      
      // Calculate amount based on follower count
      const totalFollowers = parseInt(influencer.totalFollowers.replace(/[^\d]/g, '')) || 1000;
      const baseRate = Math.max(200, Math.min(1000, totalFollowers / 1000));
      const amount = `$${Math.round(baseRate)}`;

      // Generate invoice data
      return {
        id: `INV-${String(index + 1).padStart(3, '0')}`,
        influencer: influencer.name,
        handle: influencer.platforms[0]?.handle || `@${influencer.name.toLowerCase().replace(' ', '')}`,
        amount,
        status,
        dueDate: "Aug 20, 2024",
        paidDate: status === "paid" ? "Aug 10, 2024" : undefined,
        milestone: "Content Delivered"
      };
    });
  }, [campaignInfluencers]);

  const paymentMilestones = [
    { name: "Contract Signed", completed: true },
    { name: "Content Created", completed: true },
    { name: "Content Approved", completed: true },
    { name: "Content Published", completed: false },
    { name: "Payment Released", completed: false },
  ];

  // Calculate payment stats from actual invoices
  const paymentStats = useMemo(() => {
    const totalPaid = invoices
      .filter(inv => inv.status === "paid")
      .reduce((sum, inv) => sum + parseInt(inv.amount.replace(/[^\d]/g, '')), 0);
    
    const totalPending = invoices
      .filter(inv => inv.status === "pending")
      .reduce((sum, inv) => sum + parseInt(inv.amount.replace(/[^\d]/g, '')), 0);
    
    const totalOverdue = invoices
      .filter(inv => inv.status === "overdue")
      .reduce((sum, inv) => sum + parseInt(inv.amount.replace(/[^\d]/g, '')), 0);

    const totalCampaignValue = totalPaid + totalPending + totalOverdue;

    return {
      totalPaid,
      totalPending,
      totalOverdue,
      totalCampaignValue
    };
  }, [invoices]);

  if (loading) {
    return (
      <CampaignLayout>
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading payment data...</p>
        </div>
      </CampaignLayout>
    );
  }

  if (invoices.length === 0) {
    return (
      <CampaignLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-gray-500 mb-4">No influencers found in this campaign</p>
            <p className="text-sm text-gray-400">Add influencers to the campaign to generate payment invoices</p>
          </div>
        </div>
      </CampaignLayout>
    );
  }

  return (
    <CampaignLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payments List */}
        <div className="lg:col-span-2 space-y-6">
          <PaymentInvoicesList invoices={invoices} />
          <PaymentMilestones milestones={paymentMilestones} />
        </div>

        {/* Wallet Summary & Actions */}
        <div className="space-y-6">
          <WalletSummary 
            availableBalance={Math.max(2450, paymentStats.totalPending + 1000)}
            pendingPayments={paymentStats.totalPending}
          />
          <PaymentStats {...paymentStats} />
          <PaymentMethods />
          <PaymentProtection />
        </div>
      </div>
    </CampaignLayout>
  );
};

export default Payments;
