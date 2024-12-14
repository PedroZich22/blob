import { z } from "zod";

import { AVATAR_COLORS, AVATAR_ICONS } from "@/constants/avatar-options";
import { buildMultiStepForm } from "@/lib/multi-step-form-builder";
import { RegisterSchema } from "@/lib/schemas";
import { register } from "@/actions/auth/register";
import { Form, UseMultiStepFormTypeOptions } from "@/types/multi-step-form";
import { RegisterStepAccount } from "./register-steps/step-account";
import { RegisterStepInterests } from "./register-steps/step-interests";
import { RegisterStepProfile } from "./register-steps/step-profile";

type RegisterFormType = z.infer<typeof RegisterSchema>;

const initialFormData: RegisterFormType = {
  email: "",
  username: "",
  password: "",
  name: "",
  avatar: {
    color: AVATAR_COLORS[0].id,
    icon: AVATAR_ICONS[0].id,
  },
  interests: [],
};

const forms: Form<RegisterFormType>[] = [
  {
    id: 1,
    title: "Conta",
    description: "Insira seus dados para começar.",
    form: RegisterStepAccount,
    fields: ["email", "username", "password"],
  },
  {
    id: 2,
    title: "Perfil",
    description: "Personalize seu avatar para deixar com a sua cara!",
    form: RegisterStepProfile,
    fields: ["avatar"],
  },
  {
    id: 3,
    title: "Interesses",
    description: "O que gostaria de ver?",
    form: RegisterStepInterests,
    fields: ["interests"],
  },
];

const initialFormOptions: UseMultiStepFormTypeOptions<RegisterFormType> = {
  schema: RegisterSchema,
  currentStep: 0,
  setCurrentStep: () => {},
  forms,
  saveFormData: register,
};

export const {
  FormContext: RegisterFormContext,
  FormProvider: RegisterProvider,
} = buildMultiStepForm(initialFormOptions, RegisterSchema, initialFormData);
