import { CustomFormField } from "@/components/ui/form-field";
import { validateNIP, validateREGON } from "@/lib/validation";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Imię i nazwisko musi mieć co najmniej 2 znaki")
      .max(50, "Imię i nazwisko może mieć maksymalnie 50 znaków")
      .nonempty("Pole jest wymagane"),
    email: z
      .string()
      .email("Podaj poprawny adres e-mail")
      .nonempty("Pole jest wymagane"),
    password: z
      .string()
      .min(6, "Hasło musi mieć co najmniej 6 znaków")
      .regex(/[a-z]/, "Hasło musi zawierać co najmniej jedną małą literę")
      .regex(/[A-Z]/, "Hasło musi zawierać co najmniej jedną dużą literę")
      .regex(/[0-9]/, "Hasło musi zawierać co najmniej jedną cyfrę")
      .regex(/[^a-zA-Z0-9]/, "Hasło musi zawierać co najmniej jeden symbol")
      .nonempty("Pole jest wymagane"),
    confirmPassword: z
      .string()
      .min(6, "Potwierdzenie hasła musi mieć co najmniej 6 znaków")
      .nonempty("Pole jest wymagane"),
    companyName: z
      .string()
      .min(2, "Nazwa firmy musi mieć co najmniej 2 znaki")
      .nonempty("Pole jest wymagane"),
    street: z
      .string()
      .min(2, "Ulica musi mieć co najmniej 2 znaki")
      .nonempty("Pole jest wymagane"),
    city: z
      .string()
      .min(2, "Miasto musi mieć co najmniej 2 znaki")
      .nonempty("Pole jest wymagane"),
    postalCode: z
      .string()
      .regex(/^[0-9]{2}-[0-9]{3}$/, "Kod pocztowy musi być w formacie 00-000")
      .nonempty("Pole jest wymagane"),
    country: z
      .string()
      .min(2, "Kraj musi mieć co najmniej 2 znaki")
      .nonempty("Pole jest wymagane"),
    companyNIP: z
      .string()
      .regex(
        /^PL?[0-9]{10}$|^[0-9]{10}$/,
        "NIP musi być w odpowiednim formacie",
      )
      .refine(validateNIP, {
        message: "NIP jest nieprawidłowy - suma kontrolna się nie zgadza",
      }),
    acceptTerms: z
      .boolean()
      .refine((val) => val === true, "Musisz zaakceptować regulamin"),
    headquarters: z
      .string()
      .min(2, "Siedziba musi mieć co najmniej 2 znaki")
      .nonempty("Pole jest wymagane"),
    regon: z
      .string()
      .regex(/^[0-9]{9}$/, "REGON musi składać się z 9 cyfr")
      .refine(validateREGON),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła muszą być takie same",
    path: ["confirmPassword"],
  });

export const getPersonalFields = (
  form: UseFormReturn<z.infer<typeof registerFormSchema>>,
): CustomFormField[] => {
  return [
    {
      name: "name",
      label: "Imię i nazwisko",
      placeholder: "Jan Kowalski",
      control: form.control,
    },
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
    {
      name: "confirmPassword",
      label: "Potwierdź hasło",
      placeholder: "******",
      type: "password",
      control: form.control,
    },
  ];
};

export const getCompanyFields = (
  form: UseFormReturn<z.infer<typeof registerFormSchema>>,
): CustomFormField[] => {
  return [
    {
      name: "companyName",
      label: "Nazwa firmy",
      placeholder: "Acme Sp. z o.o.",
      control: form.control,
    },
    {
      name: "companyNIP",
      label: "NIP",
      placeholder: "PL1234567890",
      control: form.control,
    },
    {
      name: "street",
      label: "Ulica",
      placeholder: "Przykładowa 1",
      control: form.control,
    },
    {
      name: "city",
      label: "Miasto",
      placeholder: "Warszawa",
      control: form.control,
    },
    {
      name: "postalCode",
      label: "Kod pocztowy",
      placeholder: "00-000",
      control: form.control,
    },
    {
      name: "country",
      label: "Kraj",
      placeholder: "Polska",
      control: form.control,
    },
    {
      name: "headquarters",
      label: "Siedziba",
      placeholder: "Warszawa",
      control: form.control,
    },
    {
      name: "regon",
      label: "REGON",
      placeholder: "123456789",
      control: form.control,
    },
  ];
};
