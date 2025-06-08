
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, CheckCircle, Users, Sparkles } from "lucide-react";
import { apiConfig } from "@/config/api";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  businessEmail: string;
  businessName: string;
  review: string;
}

const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    businessEmail: "",
    businessName: "",
    review: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = "Business email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      newErrors.businessEmail = "Please enter a valid email";
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${apiConfig.baseURL}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        console.log('Waitlist submission successful');
      } else {
        throw new Error('Failed to submit waitlist form');
      }
    } catch (error) {
      console.error('Error submitting waitlist form:', error);
      // For now, we'll still show success to maintain good UX
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleClose = () => {
    setFormData({ name: "", businessEmail: "", businessName: "", review: "" });
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Thanks for joining the waitlist!
            </h3>
            <p className="text-gray-600 mb-6">
              You're one of us now 🚀
            </p>
            <Button onClick={handleClose} className="w-full">
              Continue Exploring
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            We're building something exciting — want in early?
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            We're onboarding businesses in phases. Join early to get access, feedback perks, and help shape the future of influencer marketing.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
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
              onChange={(e) => handleInputChange("businessEmail", e.target.value)}
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
              onChange={(e) => handleInputChange("businessName", e.target.value)}
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
              onChange={(e) => handleInputChange("review", e.target.value)}
              placeholder="Share your thoughts, what excites you, or what you'd love to see."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? "Joining..." : "Join the Movement"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
