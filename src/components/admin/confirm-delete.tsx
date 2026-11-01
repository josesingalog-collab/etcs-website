"use client";

import { Trash2 } from "lucide-react";

export function ConfirmDelete({ action, id, label }: { action: (formData: FormData) => void | Promise<void>; id: string; label: string }) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(`Supprimer « ${label} » ? Cette action est définitive.`)) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50">
        <Trash2 className="h-4 w-4" />Supprimer
      </button>
    </form>
  );
}
