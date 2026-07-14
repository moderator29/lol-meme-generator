"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SearchForm({
  defaultValue = "",
  size = "lg",
  className,
}: {
  defaultValue?: string;
  size?: "lg" | "default";
  className?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex w-full flex-col gap-2 sm:flex-row",
        className,
      )}
    >
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          name="q"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a postcode or address, e.g. M1 4AE"
          aria-label="Search by postcode or address"
          className={cn(
            "pl-10",
            size === "lg" && "h-14 text-base shadow-sm",
          )}
        />
      </div>
      <Button
        type="submit"
        variant="accent"
        size={size === "lg" ? "lg" : "default"}
        className={cn(size === "lg" && "h-14 px-8 text-base")}
      >
        <Search className="h-5 w-5" />
        Search Property
      </Button>
    </form>
  );
}
