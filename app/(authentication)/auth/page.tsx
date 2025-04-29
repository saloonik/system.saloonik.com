"use client"

import { useState } from "react"
import { LoginForm } from "../_authComponents/login-form"
import { RegisterForm } from "../_authComponents/register-form"
import Image from "next/image"

export default function Home() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center dark:bg-[#393637]">
            <AuthGateway />
        </div>
    )
}

function AuthGateway() {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="w-full max-w-md rounded-lg shadow-lg overflow-hidden bg-accent dark:bg-white">
            <div className="p-5 w-full flex flex-col items-center">
                <Image src={'/logo.svg'} width={150} height={150} alt="Saloonik" />
                <p className="text-[#393637] text-sm mt-3">
                    {isLogin
                        ? "Zaloguj się, aby uzyskać dostęp do systemu"
                        : "Załóż konto właściciela i profil firmy"}
                </p>
            </div>

            <div className="p-6">
                {isLogin ? (
                    <LoginForm />
                ) : (
                    <RegisterForm />
                )}

                <div className="text-center mt-4">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm text-gray-600 hover:text-[#393637] dark:text-[#393637]"
                    >
                        {isLogin
                            ? "Nie masz konta? Zarejestruj się"
                            : "Masz już konto? Zaloguj się"}
                    </button>
                </div>
            </div>
        </div>
    )
}
