import CampaignLayout from "@/components/layout/CampaignLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, CreditCard, CheckCircle, Clock, AlertTriangle, Wallet } from "lucide-react";
import { useInfluencerData } from "@/hooks/useInfluencerData";
import { useMemo } from "react";

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
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Payment Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="border border-gray-100 rounded-lg p-4">
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
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Milestones */}
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Payment Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMilestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.completed 
                        ? "bg-green-100 text-green-600" 
                        : "bg-gray-100 text-gray-400"
                    }`}>
                      {milestone.completed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${
                        milestone.completed ? "text-gray-900" : "text-gray-500"
                      }`}>
                        {milestone.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>3 of 5 completed</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wallet Summary & Actions */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Wallet className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg font-semibold text-blue-900">
                  Wallet Summary
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-blue-700">Available Balance</p>
                <p className="text-2xl font-semibold text-blue-900">
                  ${Math.max(2450, paymentStats.totalPending + 1000).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-blue-700">Pending Payments</p>
                <p className="text-xl font-medium text-blue-800">
                  ${paymentStats.totalPending.toLocaleString()}
                </p>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <CreditCard className="h-4 w-4 mr-2" />
                Add Funds
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Payment Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Paid</span>
                <span className="font-medium text-green-600">
                  ${paymentStats.totalPaid.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="font-medium text-yellow-600">
                  ${paymentStats.totalPending.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Overdue</span>
                <span className="font-medium text-red-600">
                  ${paymentStats.totalOverdue.toLocaleString()}
                </span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Campaign Value</span>
                <span className="font-medium">
                  ${paymentStats.totalCampaignValue.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-sm">•••• 4242</p>
                    <p className="text-xs text-gray-600">Expires 12/25</p>
                  </div>
                </div>
                <Badge variant="outline">Primary</Badge>
              </div>
              <Button variant="outline" className="w-full">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-yellow-900">
                Payment Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-800 text-sm mb-3">
                All payments are secured with escrow protection until content delivery is confirmed.
              </p>
              <Button variant="outline" size="sm" className="border-yellow-300 text-yellow-700">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </CampaignLayout>
  );
};

export default Payments;
