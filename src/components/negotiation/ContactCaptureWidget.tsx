
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Mic } from "lucide-react";

const ContactCaptureWidget = () => {
  const [status, setStatus] = useState<'awaiting' | 'captured'>('awaiting');
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '' });

  const getStatusBadge = () => {
    if (status === 'captured') {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200 rounded-full px-3 py-1">
          Captured: {contactInfo.email || contactInfo.phone}
        </Badge>
      );
    }
    return (
      <Badge className="bg-gray-100 text-gray-800 border-gray-200 rounded-full px-3 py-1">
        Awaiting reply
      </Badge>
    );
  };

  const handleContactSubmit = () => {
    if (contactInfo.email || contactInfo.phone) {
      setStatus('captured');
    }
  };

  return (
    <Card className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-2xl">
      <CardHeader className="border-b border-[#F2F2F7] pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-[#1D1D1F] font-['SF_Pro_Display']">
            Contact Capture
          </CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Action Buttons */}
        <div className="flex space-x-3 mb-6">
          <Button 
            variant="outline" 
            className="flex-1 border-[#E0E0E0] text-[#1D1D1F] hover:bg-[#F2F2F7] rounded-full py-2 font-['SF_Pro_Text']"
          >
            <Mail className="h-4 w-4 mr-2" />
            Draft Email
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-[#E0E0E0] text-[#1D1D1F] hover:bg-[#F2F2F7] rounded-full py-2 font-['SF_Pro_Text']"
          >
            <Mic className="h-4 w-4 mr-2" />
            Leave Voice Note
          </Button>
        </div>

        {/* Manual Override Form */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-[#6E6E73] font-['SF_Pro_Text']">
            Manual Override
          </h3>
          <div className="flex space-x-3">
            <Input
              placeholder="Email address"
              value={contactInfo.email}
              onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
              className="flex-1 rounded-lg border-[#E0E0E0] focus:border-[#0071E3] focus:ring-[#0071E3]"
            />
            <Input
              placeholder="Phone number"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
              className="flex-1 rounded-lg border-[#E0E0E0] focus:border-[#0071E3] focus:ring-[#0071E3]"
            />
          </div>
          <Button 
            onClick={handleContactSubmit}
            disabled={!contactInfo.email && !contactInfo.phone}
            className="w-full bg-[#0071E3] hover:bg-[#005BB5] text-white rounded-full py-2 font-['SF_Pro_Text'] disabled:opacity-50"
          >
            Save Contact Info
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCaptureWidget;
