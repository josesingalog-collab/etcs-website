import Link from "next/link";
import Image from "next/image";

export function Logo({ light = false, companyName = "ETCS", logoUrl }: { light?: boolean; companyName?: string; logoUrl?: string | null }) {
  if (logoUrl) {
    return (
      <Link href="/" aria-label={`${companyName} — Accueil`} className="flex min-w-0 items-center">
        <Image
          src={logoUrl}
          alt={companyName}
          width={120}
          height={60}
          priority
          className={`h-14 w-auto shrink-0 ${light ? "rounded-lg bg-white px-3 py-2 shadow-md" : ""}`}
        />
      </Link>
    );
  }
  return (
    <Link href="/" className="flex min-w-0 items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-vinci pb-0.5 text-lg font-black tracking-tight text-white shadow-md">ET</span>
      <span className={`flex min-w-0 flex-col leading-none ${light ? "text-white" : "text-vinci-navy"}`}>
        <span className="truncate text-lg font-extrabold tracking-tight">{companyName}</span>
        <small className="mt-1 text-[9px] font-bold tracking-[.18em] text-vinci">ENTREPRISE GÉNÉRALE</small>
      </span>
    </Link>
  );
}
