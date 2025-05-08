"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Walidacja formularza
    if (!email || !password) {
      setError("Proszę wypełnić wszystkie pola");
      setIsLoading(false);
      return;
    }

    try {
      return;
    } catch (err) {
      setError("Wystąpił błąd. Spróbuj ponownie.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive" className="py-2 text-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
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
          type="email"
          placeholder="twoj@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-9 ring-0 outline-0 border-0 border-b-1 rounded-none shadow-none border-[#39363715] dark:text-black"
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-9 ring-0 outline-0 border-0 border-b-1 rounded-none shadow-none dark:text-black border-[#39363715]"
        />
      </div>

      <Button
        type="submit"
        className="w-full dark:bg-[#393637] hover:bg-[#4a4748] dark:hover:bg-[#393637] dark:text-white text-white h-9 mt-2"
        disabled={isLoading}
      >
        {isLoading ? "Logowanie..." : "Zaloguj się"}
      </Button>
    </form>
  );
}
