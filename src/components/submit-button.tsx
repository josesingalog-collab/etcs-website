"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Save } from "lucide-react";
import { submitClass } from "@/components/admin/form-fields";

export function SubmitButton({ label = "Enregistrer" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${submitClass} disabled:opacity-60`}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      {pending ? "Enregistrement…" : label}
    </button>
  );
}
