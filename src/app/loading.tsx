import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-mist">
      <div className="grid place-items-center gap-5">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-royal to-royal-deep shadow-lg shadow-royal/30">
          <Loader2 className="h-6 w-6 animate-spin text-white" />
        </span>
        <p className="text-xs font-bold uppercase tracking-[.22em] text-royal">Chargement en cours…</p>
      </div>
    </div>
  );
}
