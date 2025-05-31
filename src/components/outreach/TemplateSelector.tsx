
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

const TemplateSelector = ({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Message Template
      </label>
      <Select value={selectedTemplate} onValueChange={onTemplateChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a message template" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="first-reach">First Reach Out</SelectItem>
          <SelectItem value="follow-up">Follow Up</SelectItem>
          <SelectItem value="collaboration">Collaboration Proposal</SelectItem>
          <SelectItem value="thank-you">Thank You Message</SelectItem>
          <SelectItem value="custom">Custom Message</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TemplateSelector;
