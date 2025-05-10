"use client";

import {
  getCompanyFields,
  getPersonalFields,
  registerFormSchema,
} from "./register-config";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/axios";
import { AuthApiResponse } from "@/types/response";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { CircleX } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Register() {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      street: "",
      city: "",
      postalCode: "",
      country: "",
      nip: "",
      headquarters: "",
      regon: "",
      acceptTerms: false,
    },
  });

  const [activeTab, setActiveTab] = useState("personal");
  const [errorTitle, setErrorTitle] = useState<string | null>(null);

  const handleSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    try {
      const { data, status } = await api.post<AuthApiResponse>(
        "/register",
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
      if (apiError?.resultDescription.includes(","))
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid h-9 w-full grid-cols-2 gap-3 bg-transparent">
            <TabsTrigger
              value="personal"
              className="cursor-pointer text-[#393637] dark:text-white dark:border dark:border-[#393637] data-[state=active]:bg-[#393637] data-[state=active]:text-white dark:data-[state=active]:bg-[#393637]"
            >
              Osobowe
            </TabsTrigger>
            <TabsTrigger
              value="company"
              className="cursor-pointer text-[#393637] dark:text-white dark:border dark:border-[#393637] data-[state=active]:bg-[#393637] data-[state=active]:text-white dark:data-[state=active]:bg-[#393637]"
            >
              Firma
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-3 pt-3">
            {getPersonalFields(form).map(
              ({ name, label, placeholder, type }) => (
                <CustomFormField
                  key={name}
                  control={form.control}
                  name={name}
                  label={label}
                  renderField={(field) => (
                    <Input
                      type={type || "text"}
                      placeholder={placeholder}
                      {...field}
                    />
                  )}
                />
              ),
            )}

            <Button
              type="button"
              className="mt-2 h-9 w-full bg-[#393637] text-white hover:bg-[#4a4748]"
              onClick={() => setActiveTab("company")}
            >
              Dalej
            </Button>
          </TabsContent>

          <TabsContent value="company" className="space-y-6 pt-3">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {getCompanyFields(form).map(({ name, label, placeholder }) => (
                <CustomFormField
                  key={name}
                  control={form.control}
                  name={name}
                  label={label}
                  renderField={(field) => (
                    <Input placeholder={placeholder} {...field} />
                  )}
                />
              ))}
            </div>

            <CustomFormField
              control={form.control}
              name="acceptTerms"
              label=""
              renderField={(field) => (
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    ref={field.ref}
                  />
                  <span
                    className="flex gap-1 cursor-pointer"
                    onClick={() => field.onChange(!field.value)}
                  >
                    Akceptuję
                    <Link
                      href="/regulamin"
                      className="underline hover:text-blue-500"
                    >
                      regulamin
                    </Link>
                  </span>
                </div>
              )}
            />

            <div className="flex w-full space-x-2 pt-2">
              <Button
                type="button"
                variant="outline"
                className="h-9 border-gray-300 hover:bg-gray-50 dark:border-[#39363715] dark:hover:bg-[#393637] dark:hover:text-white"
                onClick={() => setActiveTab("personal")}
              >
                Wstecz
              </Button>
              <Button
                type="submit"
                className="h-9 flex-1 border-gray-300 dark:border-[#39363715] dark:text-[#393637] dark:hover:bg-[#393637] dark:hover:text-white"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Tworzenie konta..."
                  : "Rejestruj"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}
