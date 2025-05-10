"use client";

import { SaloonikLogo } from "../../components/ui/saloonik-logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const LOGIN_PATH = "/auth/login";
export const REGISTER_PATH = "/auth/register";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="bg-accent w-full max-w-md overflow-hidden rounded-lg shadow-lg">
        <div className="flex w-full flex-col items-center p-5">
          <SaloonikLogo />
          <p className="mt-3 text-sm">
            {path === LOGIN_PATH
              ? "Zaloguj się, aby uzyskać dostęp do systemu."
              : "Załóż konto właściciela i profil firmy."}
          </p>
        </div>
        <div className="p-6">
          {children}
          <div className="mt-4 text-center">
            <button className="] text-sm text-gray-600 dark:text-white">
              {path === LOGIN_PATH ? (
                <Link href={REGISTER_PATH}>
                  Nie masz jeszcze konta?{" "}
                  <strong className="cursor-pointer">Załóż konto</strong>
                </Link>
              ) : (
                <Link href={LOGIN_PATH}>
                  Posiadasz już konto?{" "}
                  <strong className="cursor-pointer">Zaloguj się</strong>
                </Link>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
