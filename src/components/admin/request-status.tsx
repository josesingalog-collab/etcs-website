import { RequestStatus } from "@prisma/client";
import { Field, inputClass } from "@/components/admin/form-fields";
import { RequestStatusBadge } from "@/components/admin/ui";

const labels: Record<RequestStatus, string> = { NEW: "Nouveau", IN_PROGRESS: "En cours", PROCESSED: "Traité", ARCHIVED: "Archivé" };

export function RequestStatusForm({ action, id, status }: { action: (formData: FormData) => void | Promise<void>; id: string; status: RequestStatus }) {
  return (
    <form action={action} className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-mist p-4">
      <input type="hidden" name="id" value={id} />
      <div className="grid gap-3">
        <RequestStatusBadge status={status} />
        <Field label="Modifier le statut" >
          <select className={inputClass + " w-44"} name="status" defaultValue={status}>
            {Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </Field>
      </div>
      <button type="submit" className="focus-ring rounded-lg bg-royal px-4 py-2.5 text-sm font-bold text-white transition hover:bg-royal-deep">
        Mettre à jour
      </button>
    </form>
  );
}
