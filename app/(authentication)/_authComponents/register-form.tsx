'use client';

import { useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormActionState, registerAction } from '../auth/actions';

const initalState: FormActionState = {
  error: '',
  data: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    companyAddress: '',
    companyNIP: '',
    terms: 'off',
  },
};

export function RegisterForm() {
  const [state, action, isPending] = useActionState(
    registerAction,
    initalState
  );

  const [activeTab, setActiveTab] = useState<'personal' | 'company'>(
    'personal'
  );

  return (
    <form action={action} className="space-y-4">
      {state.error && (
        <Alert variant="destructive" className="py-2 text-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as 'personal' | 'company')}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 h-9 bg-transparent">
          <TabsTrigger
            value="personal"
            className="text-[#393637] data?-[state=active]:text-white data?-[state=active]:bg-[#393637] dark:data?-[state=active]:bg-[#393637]"
          >
            Osobowe
          </TabsTrigger>
          <TabsTrigger
            value="company"
            className="text-[#393637] data?-[state=active]:text-white data?-[state=active]:bg-[#393637] dark:data?-[state=active]:bg-[#393637]"
          >
            Firma
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-3 pt-3">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm text-[#393637]">
              Imię i nazwisko
            </Label>
            <Input
              id="name"
              placeholder="Jan Kowalski"
              name="name"
              defaultValue={state.data?.name}
              className="h-9 ring-0 outline-0 border-0 border-b-1 rounded-none shadow-none border-[#39363715] dark:text-black"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="register-email" className="text-sm text-[#393637]">
              E-mail
            </Label>
            <Input
              id="register-email"
              type="email"
              placeholder="ty@example.com"
              name="email"
              defaultValue={state.data?.email}
              className="h-9 ring-0 outline-0 border-0 border-b-1 rounded-none shadow-none border-[#39363715] dark:text-black"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="register-password"
              className="text-sm text-[#393637]"
            >
              Hasło
            </Label>
            <Input
              id="register-password"
              type="password"
              placeholder="*********"
              name="password"
              defaultValue={state.data?.password}
              className="h-9 ring-0 outline-0 border-0 border-b-1 rounded-none shadow-none border-[#39363715] dark:text-black"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="confirm-password"
              className="text-sm text-[#393637]"
            >
              Potwierdź hasło
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="*********"
              name="confirmPassword"
              defaultValue={state.data?.confirmPassword}
              className="h-9 ring-0 outline-0 border-0 border-b-1 rounded-none shadow-none border-[#39363715] dark:text-black"
            />
          </div>

          <Button
            type="button"
            className="w-full bg-[#393637] hover:bg-[#4a4748] text-white h-9 mt-2"
            onClick={() => setActiveTab('company')}
          >
            Dalej
          </Button>
        </TabsContent>

        <TabsContent value="company" className="space-y-3 pt-3">
          <div className="space-y-1.5">
            <Label htmlFor="company-name" className="text-sm text-[#393637]">
              Nazwa firmy
            </Label>
            <Input
              id="company-name"
              placeholder="Acme Sp. z o.o."
              name="companyName"
              defaultValue={state.data?.companyName}
              className="h-9 ring-0 outline-0 border-0 border-b-1 rounded-none shadow-none border-[#39363715] dark:text-black"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="company-address" className="text-sm text-[#393637]">
              Adres firmy
            </Label>
            <Input
              id="company-address"
              placeholder="ul. Biznesowa 12, Miasto"
              name="companyAddress"
              defaultValue={state.data?.companyAddress}
              className="h-9 ring-0 outline-0 border-0 border-b-1 rounded-none shadow-none border-[#39363715] dark:text-black"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="company-nip" className="text-sm text-[#393637]">
              NIP firmy
            </Label>
            <Input
              id="company-nip"
              placeholder="PLXXXXXXXXX"
              name="companyNIP"
              defaultValue={state.data?.companyNIP}
              className="h-9 ring-0 outline-0 border-0 border-b-1 rounded-none shadow-none border-[#39363715] dark:text-black"
            />
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <Checkbox
              id="terms"
              name="terms"
              defaultValue={state.data?.terms}
              className="ring-2 ring-[#393637]"
            />
            <label
              htmlFor="terms"
              className="text-xs font-medium leading-none text-[#393637]"
            >
              Akceptuję regulamin
            </label>
          </div>

          <div className="flex space-x-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-9 border-gray-300 text-text-[#393637] hover:bg-gray-50 dark:border-[#39363715] dark:hover:text-white dark:text-[#393637] dark:hover:bg-[#393637]"
              onClick={() => setActiveTab('personal')}
            >
              Wstecz
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#393637] hover:bg-[#4a4748] text-white h-9"
              disabled={isPending}
            >
              {isPending ? 'Tworzenie konta...' : 'Rejestruj'}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
}
