import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

const Breadcrumbs = () => {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);

    const dynamicCrumbs = segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;

      // ✅ FIXED label formatting (no UI change, correct logic)
      const label = decodeURIComponent(segment)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      return { href, label };
    });

    const rootCrumb = { href: "/dashboard", label: "Dashboard", isRoot: true };

    if (pathname === "/dashboard") return [rootCrumb];

    return [
      rootCrumb,
      ...dynamicCrumbs.filter((c) => c.href !== "/dashboard"),
    ];
  }, [pathname]);

  return (
    <nav className="flex items-center text-sm text-muted-foreground overflow-x-auto no-scrollbar mask-fade-right">
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div key={crumb.href} className="flex items-center whitespace-nowrap">
            {index > 0 && (
              <ChevronRight className="h-3.5 w-3.5 mx-1 text-muted-foreground/50 shrink-0" />
            )}

            {isLast ? (
              <span className="font-semibold text-foreground px-0.5">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:text-primary hover:underline underline-offset-4 px-0.5 transition-colors flex items-center gap-1"
              >
                {index === 0 && <Home className="h-3.5 w-3.5" />}
                {crumb.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
