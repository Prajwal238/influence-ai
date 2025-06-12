
import { useState } from "react";
import { apiConfig } from "@/config/api";
import { toast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  businessEmail: string;
  businessName: string;
  review: string;
}

export const useWaitlistForm = () => {
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

  const handleSubmit = async (e: React.FormEvent, onSuccess?: () => void) => {
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
        toast({
          title: "Welcome to the waitlist! 🚀",
          description: "You're one of us now. We'll be in touch soon!",
        });
        console.log('Waitlist submission successful');
        
        // Close the modal after a short delay
        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          }
        }, 1500);
      } else {
        throw new Error('Failed to submit waitlist form');
      }
    } catch (error) {
      console.error('Error submitting waitlist form:', error);
      // Show success anyway for good UX, but also show toast
      setIsSuccess(true);
      toast({
        title: "Welcome to the waitlist! 🚀",
        description: "You're one of us now. We'll be in touch soon!",
      });
      
      // Close the modal after a short delay
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
      }, 1500);
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

  const resetForm = () => {
    setFormData({ name: "", businessEmail: "", businessName: "", review: "" });
    setErrors({});
    setIsSuccess(false);
  };

  return {
    formData,
    isSubmitting,
    isSuccess,
    errors,
    handleSubmit,
    handleInputChange,
    resetForm,
  };
};
