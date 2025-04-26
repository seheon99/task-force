import clsx from "clsx";
import Link from "next/link";

export function Tabs({
  currentTab,
  tabs,
}: {
  currentTab: string;
  tabs: { id: string; displayName: string; href: string }[];
}) {
  return (
    <div className="border-b border-zinc-200">
      <nav aria-label="Tabs" className="-mb-px flex">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            aria-current={compareTitle(tab.id, currentTab) ? "page" : undefined}
            className={clsx(
              compareTitle(tab.id, currentTab)
                ? "border-zinc-500 text-zinc-600"
                : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700",
              "w-full border-b-2 px-1 py-4 text-center text-sm font-medium"
            )}
          >
            {tab.displayName}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function compareTitle(a: string, b: string) {
  return a.toLowerCase() === b.toLowerCase();
}
