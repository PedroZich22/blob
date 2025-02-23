import type { UseMultiStepFormTypeOptions } from "@/types/multi-step-form";
import { type Context, useCallback, useContext } from "react";
import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import type { z } from "zod";

/**
 * Custom hook for managing a multi-step form.
 *
 * @template T - The type of the multi-step form options.
 * @param {Context<T>} context - The React context containing the form state and methods.
 * @returns {Object} An object containing methods and properties for managing the multi-step form.
 * @throws {Error} If the form is not defined in the context.
 */
// biome-ignore lint: must be any as it is a any object
function useMultiStepForm<T extends UseMultiStepFormTypeOptions<any>>(
  context: Context<T>
) {
  const { forms, schema, currentStep, setCurrentStep, form, saveFormData } =
    useContext(context);
  if (form === undefined) throw new Error("A react-hook-form must be defined");

  const steps = forms.length;

  /**
   * Advances to the next step if not already at the last step.
   */
  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps - 1));
  };

  /**
   * Goes back to the previous step if not already at the first step.
   */
  const previousStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  /**
   * Goes to a specific step.
   *
   * @param {number} index - The index of the step to go to.
   */
  const goToStep = (index: number) => {
    setCurrentStep(Math.max(0, Math.min(index, steps - 1)));
  };

  /**
   * Checks if the current step is the first step.
   *
   * @returns {boolean} True if the current step is the first step, false otherwise.
   */
  const isFirstStep = currentStep === 0;

  /**
   * Checks if the current step is the last step.
   *
   * @returns {boolean} True if the current step is the last step, false otherwise.
   */
  const isLastStep = currentStep === steps - 1;

  /**
   * Get the current step title.
   *
   * @returns {string} The current step title.
   */
  const currentStepTitle = forms[currentStep].title;

  /**
   * Get the current step description.
   *
   * @returns {string} The current step description.
   */
  const currentStepDescription = forms[currentStep].description;

  /**
   * Handles form submission.
   *
   * @param {z.infer<typeof schema>} values - The form values.
   */
  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (values) => {
    if (isLastStep) await saveFormData(values);
    else nextStep();
  };

  /**
   * Handles form submission errors by checking if there are errors
   * in the current step's fields and navigating to the next step if there are none.
   *
   * @template T - The type of the form field values.
   *
   * @param {SubmitErrorHandler<z.infer<typeof schema>>} errors - The form submission errors.
   *
   * @returns {void}
   */
  const onErrors: SubmitErrorHandler<z.infer<typeof schema>> = (errors) => {
    const stepFields = forms[currentStep].fields.flat();
    const errorFields = new Set(Object.keys(errors).flat());
    let hasStepErrors = false;
    for (const field of stepFields) {
      if (errorFields.has(field as string)) hasStepErrors = true;
    }

    if (!hasStepErrors) {
      form?.clearErrors();
      nextStep();
    }
  };

  /**
   * Create a string array of titles
   *
   * @returns {string[]} string array of titles
   */
  const titles = forms.map((form) => form.title);

  const CurrentForm: React.FC = useCallback(() => {
    const Step = forms[currentStep].form;
    return <Step />;
  }, [forms, currentStep]);

  return {
    form,
    currentStep,
    steps,
    nextStep,
    previousStep,
    goToStep,
    isFirstStep,
    isLastStep,
    titles,
    currentStepTitle,
    currentStepDescription,
    CurrentForm,
    onSubmit,
    onErrors,
  };
}

export { useMultiStepForm };
