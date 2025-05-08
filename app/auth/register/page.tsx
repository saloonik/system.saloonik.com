"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyNIP, setCompanyNIP] = useState("");

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError("Proszę wypełnić wszystkie dane osobowe");
      setActiveTab("personal");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Hasła nie są takie same");
      setActiveTab("personal");
      setIsLoading(false);
      return;
    }

    if (!companyName || !companyAddress) {
      setError("Proszę wypełnić wszystkie dane firmy");
      setActiveTab("company");
      setIsLoading(false);
      return;
    }

    if (!companyNIP) {
      setError("Proszę wprowadzić NIP firmy");
      setActiveTab("company");
      setIsLoading(false);
      return;
    }

    if (!acceptTerms) {
      setError("Musisz zaakceptować regulamin");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://localhost:50787/register", {
        body: JSON.stringify({
          name,
          email,
          password,
          companyName,
          companyAddress,
          companyNIP,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Success!");
        return;
      } else {
        const result = await response.json();
        setError(result.message || "Wystąpił błąd.");
      }
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-9 bg-transparent">
          <TabsTrigger
            value="personal"
            className="text-[#393637] data-[state=active]:text-white data-[state=active]:bg-[#393637] dark:data-[state=active]:bg-[#393637]"
          >
            Osobowe
          </TabsTrigger>
          <TabsTrigger
            value="company"
            className="text-[#393637] data-[state=active]:text-white data-[state=active]:bg-[#393637] dark:data-[state=active]:bg-[#393637]"
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="h-9 ring-0 outline-0 border-0 border-b-1 rounded-none shadow-none border-[#39363715] dark:text-black"
            />
          </div>

          <Button
            type="button"
            className="w-full bg-[#393637] hover:bg-[#4a4748] text-white h-9 mt-2"
            onClick={() => setActiveTab("company")}
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
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
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
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              required
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
              value={companyNIP}
              onChange={(e) => setCompanyNIP(e.target.value)}
              required
              className="h-9 ring-0 outline-0 border-0 border-b-1 rounded-none shadow-none border-[#39363715] dark:text-black"
            />
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
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
              onClick={() => setActiveTab("personal")}
            >
              Wstecz
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#393637] hover:bg-[#4a4748] text-white h-9"
              disabled={isLoading}
            >
              {isLoading ? "Tworzenie..." : "Rejestruj"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
}
