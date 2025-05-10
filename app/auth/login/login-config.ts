import { CustomFormField } from "@/components/ui/form-field";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .email("Podaj poprawny adres e-mail")
    .nonempty("Pole jest wymagane"),
  password: z
    .string()
    .min(6, "Hasło musi mieć co najmniej 6 znaków")
    .nonempty("Pole jest wymagane"),
});

export const getLoginFields = (
  form: UseFormReturn<z.infer<typeof loginFormSchema>>,
): CustomFormField[] => {
  return [
    {
      name: "email",
      label: "E-mail",
      placeholder: "twój@email.com",
      control: form.control,
    },
    {
      name: "password",
      label: "Hasło",
      placeholder: "******",
      type: "password",
      control: form.control,
    },
  ];
};
