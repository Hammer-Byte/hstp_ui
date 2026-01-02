"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "./AppHeader";
import HotelGrid from "./HotelGrid";
import { Button } from "@/components/ui/button";

const INSTITUTES = [
  { id: "h1", name: "Demo Hotel Group" },
  { id: "h2", name: "Sunrise Resort" },
  { id: "h3", name: "Blue Ocean Suites" },
];

export default function HotelSelectionPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(null);

  const selectedHotel = useMemo(
    () => INSTITUTES.find((h) => h.id === selectedId) || null,
    [selectedId]
  );

  const handleContinue = useCallback(() => {
    if (!selectedHotel) return;

    localStorage.setItem("activeHotel", JSON.stringify(selectedHotel));
    router.push("/dashboard");
  }, [selectedHotel, router]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader onLogout={() => router.push("/login")} />

      <main className="flex-1 max-w-5xl mx-auto px-6 pt-16">
        <h1 className="text-3xl font-semibold">Choose your Hotel</h1>
        <p className="text-muted-foreground mt-2">
          This helps us personalize training content.
        </p>

        <HotelGrid
          items={INSTITUTES}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        <div className="mt-14 max-w-sm">
          <Button
            className="w-full h-11"
            disabled={!selectedId}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </main>
    </div>
  );
}
