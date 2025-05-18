"use client";

import { Input } from "./input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const DataTableSearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearchTermChange = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("searchTerm", value.trim());
    params.set("pageNumber", "1");
    router.replace(`?${params.toString()}`);
  }, 300);

  return (
    <fieldset className="relative">
      <Search className="absolute left-2.5 top-2.5" size={17} />
      <Input
        type="text"
        placeholder="Wyszukaj..."
        className="border w-[400px] pl-8"
        onChange={(e) => handleSearchTermChange(e.target.value)}
      />
    </fieldset>
  );
};
