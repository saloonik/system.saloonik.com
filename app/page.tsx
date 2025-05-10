import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24 dark:bg-[#393637]">
      <ThemeSwitcher />
      <p className="text-2xl">Hello world Saloonik!</p>
    </div>
  );
}
