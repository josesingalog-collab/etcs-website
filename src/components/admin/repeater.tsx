"use client";

import { Fragment, useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

export type RepeaterFieldDef = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "url";
  placeholder?: string;
};

type Item = Record<string, string>;

export function RepeaterField({
  name,
  label,
  fields,
  items: initialItems,
  addLabel = "Ajouter un élément",
  hint,
  itemTitleKey,
}: {
  name: string;
  label: string;
  fields: RepeaterFieldDef[];
  items: Item[];
  addLabel?: string;
  hint?: string;
  itemTitleKey?: string;
}) {
  const [items, setItems] = useState<Item[]>(() => initialItems.map((item) => ({ ...item })));

  function update(index: number, key: string, value: string) {
    setItems((current) => current.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }

  function add() {
    setItems((current) => [...current, Object.fromEntries(fields.map((field) => [field.name, ""]))]);
  }

  function remove(index: number) {
    setItems((current) => current.filter((_, i) => i !== index));
  }

  function move(index: number, offset: number) {
    setItems((current) => {
      const target = index + offset;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <div className="grid gap-3">
      <span className="text-sm font-bold text-anthracite">{label}</span>
      {hint && <span className="-mt-1 text-xs font-normal leading-5 text-slate-500">{hint}</span>}
      <div className="grid gap-3">
        {items.map((item, index) => (
          <Fragment key={index}>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <span className="flex min-w-0 items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-royal-50 text-[10px] text-royal">{index + 1}</span>
                  <span className="truncate">
                    {itemTitleKey && item[itemTitleKey] ? String(item[itemTitleKey]) : `Élément ${index + 1}`}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-1">
                  <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Monter" className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:text-royal disabled:opacity-30">
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label="Descendre" className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:text-royal disabled:opacity-30">
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" onClick={() => remove(index)} aria-label="Supprimer" className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-red-500 transition hover:bg-red-50">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </span>
              </div>
              <div className="mt-3 grid gap-3">
                {fields.map((field) => (
                  <label key={field.name} className="grid gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{field.label}</span>
                    {field.type === "textarea" ? (
                      <textarea
                        className="focus-ring w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-normal text-anthracite outline-none transition placeholder:text-slate-400 hover:border-slate-400"
                        name={`${name}[${index}][${field.name}]`}
                        rows={3}
                        placeholder={field.placeholder}
                        value={item[field.name] ?? ""}
                        onChange={(event) => update(index, field.name, event.target.value)}
                      />
                    ) : (
                      <input
                        className="focus-ring w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-normal text-anthracite outline-none transition placeholder:text-slate-400 hover:border-slate-400"
                        name={`${name}[${index}][${field.name}]`}
                        type={field.type === "url" ? "url" : "text"}
                        placeholder={field.placeholder}
                        value={item[field.name] ?? ""}
                        onChange={(event) => update(index, field.name, event.target.value)}
                      />
                    )}
                  </label>
                ))}
              </div>
            </div>
            <input type="hidden" name={`${name}[${index}][__present]`} value="1" />
          </Fragment>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="focus-ring inline-flex w-fit items-center gap-2 rounded-xl border border-dashed border-royal/50 px-4 py-2.5 text-sm font-bold text-royal transition hover:bg-royal-50"
      >
        <Plus className="h-4 w-4" />{addLabel}
      </button>
    </div>
  );
}
