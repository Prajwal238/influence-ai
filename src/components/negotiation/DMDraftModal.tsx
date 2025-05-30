
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Bot, RefreshCw } from "lucide-react";

interface DMDraftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DMDraftModal = ({ isOpen, onClose }: DMDraftModalProps) => {
  const [draftMessage, setDraftMessage] = useState("");
  const [suggestedTemplate, setSuggestedTemplate] = useState(
    "That sounds reasonable! We'd need the content by next Friday. Can we also add usage rights for 6 months for an additional $100?"
  );

  const handleUseSuggestion = () => {
    setDraftMessage(suggestedTemplate);
  };

  const handleSend = () => {
    // Simulate sending the message
    console.log("Sending DM:", draftMessage);
    onClose();
  };

  const handleRegenerateTemplate = () => {
    // Simulate API call to regenerate template
    const alternatives = [
      "That sounds reasonable! We'd need the content by next Friday. Can we also add usage rights for 6 months for an additional $100?",
      "Perfect! $500 works for us. We'd need delivery by Friday. Could we also include a few extra story frames?",
      "Great rate! We can move forward with $500. Timeline would be next Friday. Any chance for extended usage rights?"
    ];
    const randomTemplate = alternatives[Math.floor(Math.random() * alternatives.length)];
    setSuggestedTemplate(randomTemplate);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] p-0 rounded-2xl">
        <DialogHeader className="p-6 border-b border-[#F2F2F7]">
          <DialogTitle className="text-xl font-semibold text-[#1D1D1F] font-['SF_Pro_Display']">
            Draft & Send DM
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 p-6 space-y-6">
          {/* AI Suggestion */}
          <Card className="bg-[#F2F2F7] border-0 p-4">
            <div className="flex items-start space-x-3">
              <Bot className="h-5 w-5 text-[#0071E3] mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium text-[#1D1D1F] font-['SF_Pro_Text'] mb-2">
                  AI Suggested Response:
                </div>
                <p className="text-sm text-[#1D1D1F] font-['SF_Pro_Text'] mb-3">
                  {suggestedTemplate}
                </p>
                <div className="flex space-x-2">
                  <Button
                    onClick={handleUseSuggestion}
                    size="sm"
                    className="bg-[#0071E3] hover:bg-[#005BB5] text-white rounded-full text-xs"
                  >
                    Use This
                  </Button>
                  <Button
                    onClick={handleRegenerateTemplate}
                    size="sm"
                    variant="outline"
                    className="border-[#E0E0E0] text-[#6E6E73] hover:bg-white rounded-full text-xs"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Regenerate
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Draft Message */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[#1D1D1F] font-['SF_Pro_Text']">
              Your Message:
            </label>
            <Textarea
              value={draftMessage}
              onChange={(e) => setDraftMessage(e.target.value)}
              placeholder="Type your message here..."
              className="min-h-[120px] rounded-lg border-[#E0E0E0] focus:border-[#0071E3] resize-none font-['SF_Pro_Text']"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-[#F2F2F7]">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-[#E0E0E0] text-[#6E6E73] hover:bg-[#F2F2F7] rounded-full font-['SF_Pro_Text']"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={!draftMessage.trim()}
              className="bg-[#0071E3] hover:bg-[#005BB5] text-white rounded-full font-['SF_Pro_Text'] disabled:opacity-50"
            >
              <Send className="h-4 w-4 mr-2" />
              Send DM
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DMDraftModal;
