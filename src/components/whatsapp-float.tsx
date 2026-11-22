import { getWhatsAppLink, getSiteSettings } from "@/lib/site-settings";

/** Bouton WhatsApp flottant discret, en bas à droite. */
export async function WhatsAppFloat() {
  const settings = await getSiteSettings();
  const href = getWhatsAppLink(settings);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Contacter la Direction Générale sur WhatsApp"
      title="WhatsApp — Direction Générale"
      className="focus-ring fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/20 transition hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.2L2 22l4.9-1.6A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .9.9-2.9-.2-.3a8.2 8.2 0 1 1 6.8 3.6Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.2 2.2-.5 3.8a11.6 11.6 0 0 0 4.5 4.9c1.8 1 2.5 1.1 3.4.9.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.2Z" />
      </svg>
    </a>
  );
}
