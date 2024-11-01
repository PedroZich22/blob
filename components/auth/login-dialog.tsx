"use client";

import { Dialog } from "@/components/ui/dialog";
import { SignInCard } from "./sign-in-card";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export function LoginDialog({ open, onClose }: LoginDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Entre para interagir</h2>
        <SignInCard />
      </div>
    </Dialog>
  );
} 