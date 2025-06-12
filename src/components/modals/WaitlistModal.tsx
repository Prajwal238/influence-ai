
import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { WaitlistForm } from "./WaitlistForm";
import { WaitlistSuccessView } from "./WaitlistSuccessView";
import { useWaitlistForm } from "./hooks/useWaitlistForm";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  const { isSuccess, resetForm } = useWaitlistForm();

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSuccess = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {isSuccess ? (
          <WaitlistSuccessView onClose={handleClose} />
        ) : (
          <WaitlistForm onClose={handleClose} onSuccess={handleSuccess} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
