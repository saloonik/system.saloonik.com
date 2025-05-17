"use client";

import { loginFormSchema, getLoginFields } from "./login-config";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import { AuthApiResponse } from "@/types/response";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { CircleX } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Login() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [errorTitle, setErrorTitle] = useState<string | null>(null);

  const handleSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      const { data, status } = await api.post<AuthApiResponse>(
        "/Auth/login",
        values,
      );
      if (status === 200) {
        Cookies.set("token", data.token, { expires: 7 });
        Cookies.set("refreshToken", data.refreshToken);
        // Redirect to the dashboard or home page
      }
    } catch (err) {
      const errorResponse = (err as any)?.response;
      const apiError: AuthApiResponse = errorResponse?.data;
      setErrorTitle(apiError?.resultTitle);
      form.setError("root", {
        message: apiError?.resultDescription,
      });
    }
  };

  const getFormattedErrorMessage = (error: string | undefined) => {
    return error?.includes(",")
      ? error.split(",").map((error) => <div key={error}>{error}</div>)
      : error;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {form.formState.errors.root && (
          <Alert variant="destructive" className="mb-4">
            <CircleX color="red" />
            <AlertTitle>{errorTitle}</AlertTitle>
            <AlertDescription>
              {getFormattedErrorMessage(form.formState.errors.root.message)}
            </AlertDescription>
          </Alert>
        )}

        {getLoginFields(form).map(
          ({ name, control, label, placeholder, type }) => (
            <CustomFormField
              key={name}
              control={control}
              name={name}
              label={label}
              renderField={(field) => (
                <Input type={type} placeholder={placeholder} {...field} />
              )}
            />
          ),
        )}

        <Button
          type="submit"
          className="h-9 w-full border-gray-300 text-white dark:border-[#39363715] dark:text-[#393637] dark:hover:bg-[#393637] dark:hover:text-white"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Logowanie..." : "Zaloguj się"}
        </Button>
      </form>
    </Form>
  );
}
