import Link from "next/link";
import Image from "next/image";

export function Logo({ light = false, companyName = "GTGC", logoUrl }: { light?: boolean; companyName?: string; logoUrl?: string | null }) {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-3">
      {logoUrl ? (
        <Image src={logoUrl} alt={companyName} width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-white object-contain p-1" />
      ) : (
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-royal to-royal-deep pb-0.5 text-lg font-black tracking-tight text-white shadow-md">GT</span>
      )}
      <span className={`flex min-w-0 flex-col leading-none ${light ? "text-white" : "text-anthracite"}`}>
        <span className="truncate text-lg font-extrabold tracking-tight">{companyName}</span>
        <small className="mt-1 text-[9px] font-bold tracking-[.18em] text-gold">GÉNIE CIVIL</small>
      </span>
    </Link>
  );
}
