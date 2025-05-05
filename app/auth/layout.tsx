'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import Link from 'next/link';

export const LOGIN_PATH = '/auth/login';
export const REGISTER_PATH = '/auth/register';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <div className="min-h-screen w-full flex items-center justify-center dark:bg-[#393637]">
      <div className="w-full max-w-md rounded-lg shadow-lg overflow-hidden bg-accent dark:bg-white">
        <div className="p-5 w-full flex flex-col items-center">
          <Image src={'/logo.svg'} width={150} height={150} alt="Saloonik" />
          <p className="text-[#393637] text-sm mt-3">
            {path === LOGIN_PATH
              ? 'Zaloguj się, aby uzyskać dostęp do systemu'
              : 'Załóż konto właściciela i profil firmy'}
          </p>
        </div>

        <div className="p-6">
          {children}
          <div className="text-center mt-4">
            <button className="text-sm text-gray-600 hover:text-[#393637] dark:text-[#393637]">
              {path === LOGIN_PATH ? (
                <Link href={REGISTER_PATH}>
                  Nie masz jeszcze konta?{' '}
                  <strong className="cursor-pointer">Załóż konto</strong>
                </Link>
              ) : (
                <Link href={LOGIN_PATH}>
                  Posiadasz już konto?{' '}
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
