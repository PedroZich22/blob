"use client";

import { RegisterProvider } from "./multi-step-register-config";
import { RegisterForm } from "./register-form";

export function RegisterWizard() {
  return (
    <RegisterProvider>
      <RegisterForm />
    </RegisterProvider>
  );
}
