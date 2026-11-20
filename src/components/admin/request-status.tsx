import { RequestStatus } from "@prisma/client";
import { inputClass } from "@/components/admin/form-fields";
import { RequestStatusBadge } from "@/components/admin/ui";

const labels: Record<RequestStatus, string> = { NEW: "Nouveau", IN_PROGRESS: "En cours", PROCESSED: "Traité", ARCHIVED: "Archivé" };

export function RequestStatusForm({ action, id, status }: { action: (formData: FormData) => void | Promise<void>; id: string; status: RequestStatus }) {
  return (
    <form action={action} className="rounded-xl border border-slate-200 bg-mist p-4">
      <input type="hidden" name="id" value={id} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <RequestStatusBadge status={status} />
          <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">
            Statut
            <select className={inputClass + " w-44 rounded-lg"} name="status" defaultValue={status}>
              {Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
        </div>
        <button type="submit" className="focus-ring shrink-0 self-end rounded-lg bg-royal px-4 py-2.5 text-sm font-bold text-white transition hover:bg-royal-deep">
          Mettre à jour
        </button>
      </div>
    </form>
  );
}
