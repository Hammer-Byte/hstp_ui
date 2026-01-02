import { Building2, Check } from "lucide-react";

export default function HotelGrid({ items, selectedId, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      {items.map((item) => {
        const active = selectedId === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`surface px-6 py-7 text-left relative transition
              ${
                active
                  ? "border border-accent bg-accent/10 scale-[1.02]"
                  : "hover:bg-muted/60"
              }`}
          >
            <div className="flex gap-4">
              <div
                className={`h-11 w-11 rounded-xl flex items-center justify-center
                  ${
                    active
                      ? "bg-accent text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
              >
                <Building2 className="h-5 w-5" />
              </div>

              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  Staff training & compliance
                </p>
              </div>
            </div>

            {active && (
              <Check className="absolute top-4 right-4 h-5 w-5 text-accent" />
            )}
          </button>
        );
      })}
    </div>
  );
}
