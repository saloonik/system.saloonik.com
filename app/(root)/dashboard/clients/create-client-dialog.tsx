"use client";

import { clientFields } from "./clients-form-config";
import { DialogCreate } from "@/components/ui/dialog-create";
import { TableSingleOperation } from "@/components/ui/table/table-utils";
import { api } from "@/lib/axios";
import { Client } from "@/types/response";
import { UserPlus2 } from "lucide-react";
import { useState } from "react";
import * as z from "zod";

const clientSchema = z.object({
  firstName: z.string().min(1, "Imię jest wymagane"),
  lastName: z.string().min(1, "Nazwisko jest wymagane"),
  email: z.string().email("Nieprawidłowy format adresu e-mail").optional(),
  phoneNumber: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  dateOfBirth: z.string().optional().nullable(),
  notes: z.string().optional(),
});

type ClientFormData = Omit<Client, "clientId" | "companyId" | "reservations">;

export function CreateClientDialog() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleCreateClient = async (data: ClientFormData) => {
    try {
      setIsSubmitting(true);
      if (!data.dateOfBirth) {
        data.dateOfBirth = null;
      }
      await api.post<Client>("api/Clients/Add", data);
    } catch (error) {
      console.error("Error creating client:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <DialogCreate
      title="Dodaj nowego klienta"
      description="Utwórz nowy rekord klienta w systemie."
      fields={clientFields}
      schema={clientSchema}
      onSubmit={handleCreateClient}
      trigger={
        <TableSingleOperation
          icon={<UserPlus2 size={20} />}
          operation="Dodaj"
          type="button"
        />
      }
    />
  );
}
