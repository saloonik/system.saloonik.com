'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { loginAction, FormActionState } from '../auth/actions';
import { useActionState } from 'react';

const initalState: FormActionState = {
  error: '',
  data: {
    email: '',
    password: '',
  },
};

export function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, initalState);

  return (
    <form action={action} className="space-y-4">
      {state.error && (
        <Alert variant="destructive" className="py-2 text-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-1.5">
        <Label
          htmlFor="email"
          className="text-sm text-[#393637] dark:text-[#393637]"
        >
          E-mail
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="twoj@email.com"
          className="h-9 ring-0 outline-0 border-0 border-b-1 rounded-none shadow-none border-[#39363715] dark:text-black"
          defaultValue={state.data?.email}
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm dark:text-[#393637]">
            Hasło
          </Label>
          <a href="#" className="text-xs text-[#393637] dark:text-[#393637]">
            Zapomniałeś hasła?
          </a>
        </div>
        <Input
          placeholder="***********"
          id="password"
          type="password"
          name="password"
          className="h-9 ring-0 outline-0 border-0 border-b-1 rounded-none shadow-none dark:text-black border-[#39363715]"
          defaultValue={state.data?.password}
        />
      </div>
      <Button
        type="submit"
        className="w-full dark:bg-[#393637] hover:bg-[#4a4748] dark:hover:bg-[#393637] dark:text-white text-white h-9 mt-2"
        disabled={isPending}
      >
        {isPending ? 'Logowanie...' : 'Zaloguj się'}
      </Button>
    </form>
  );
}
