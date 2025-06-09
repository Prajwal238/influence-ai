
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormData {
  name: string;
  businessEmail: string;
  businessName: string;
  review: string;
}

interface WaitlistFormFieldsProps {
  formData: FormData;
  errors: Partial<FormData>;
  onInputChange: (field: keyof FormData, value: string) => void;
}

export const WaitlistFormFields = ({ formData, errors, onInputChange }: WaitlistFormFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onInputChange("name", e.target.value)}
          placeholder="Your full name"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessEmail">Business Email</Label>
        <Input
          id="businessEmail"
          type="email"
          value={formData.businessEmail}
          onChange={(e) => onInputChange("businessEmail", e.target.value)}
          placeholder="your@company.com"
          className={errors.businessEmail ? "border-red-500" : ""}
        />
        {errors.businessEmail && (
          <p className="text-sm text-red-600">{errors.businessEmail}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessName">Business Name</Label>
        <Input
          id="businessName"
          value={formData.businessName}
          onChange={(e) => onInputChange("businessName", e.target.value)}
          placeholder="Your company/startup/brand"
          className={errors.businessName ? "border-red-500" : ""}
        />
        {errors.businessName && (
          <p className="text-sm text-red-600">{errors.businessName}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="review">Your Two Cents 💬 (optional)</Label>
        <Textarea
          id="review"
          value={formData.review}
          onChange={(e) => onInputChange("review", e.target.value)}
          placeholder="Share your thoughts, what excites you, or what you'd love to see."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};
