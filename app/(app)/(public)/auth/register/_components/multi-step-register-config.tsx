import { z } from "zod";

import type {
  Form,
  UseMultiStepFormTypeOptions,
} from "@/types/multi-step-form";
import type { SubmitHandler } from "react-hook-form";
import { RegisterStepAccount } from "./register-steps/step-account";
import { RegisterStepInterests } from "./register-steps/step-interests";
import { RegisterStepProfile } from "./register-steps/step-profile";

import { buildMultiStepForm } from "@/lib/multi-step-form";
import { RegisterSchema } from "@/lib/schemas";
import { AVATAR_COLORS, AVATAR_ICONS } from "@/constants/avatar-options";
import { register } from "@/actions/register";

export type RegisterFormType = z.infer<typeof RegisterSchema>;

export const initialFormData: RegisterFormType = {
  email: "",
  username: "",
  password: "",
  colorId: AVATAR_COLORS[0].id,
  iconId: AVATAR_ICONS[0].id,
  interests: [],
};

const saveFormData: SubmitHandler<RegisterFormType> = async (values) => {
  console.log(values);
  //register(values);
};

export const forms: Form<RegisterFormType>[] = [
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
    description: "Personalize seu perfil para deixar com a sua cara!",
    form: RegisterStepProfile,
    fields: ["colorId", "iconId"],
  },
  {
    id: 3,
    title: "Interesses",
    description: "O que gostaria de ver sobre?",
    form: RegisterStepInterests,
    fields: ["interests"],
  },
];

const initialFormOptions: UseMultiStepFormTypeOptions<RegisterFormType> = {
  schema: RegisterSchema,
  currentStep: 0,
  setCurrentStep: (value) => {},
  forms,
  saveFormData,
};

export const {
  FormContext: RegisterFormContext,
  FormProvider: RegisterProvider,
} = buildMultiStepForm(initialFormOptions, RegisterSchema, initialFormData);
