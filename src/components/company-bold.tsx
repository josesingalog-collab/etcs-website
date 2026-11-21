const companySplit = /(E\.T\.C\.S\s*Sarl|ETCS\s*SARL|ETCS\s*Sarl)/g;
const companyMatch = /^(E\.T\.C\.S\s*Sarl|ETCS\s*SARL|ETCS\s*Sarl)$/i;

/** Met « E.T.C.S Sarl » en gras au sein d'un texte (toutes variantes d'écriture). */
export function CompanyBold({ text }: { text: string }) {
  const parts = text.split(companySplit);
  return (
    <>
      {parts.map((part, index) =>
        companyMatch.test(part) ? <strong key={index} className="font-extrabold">{part}</strong> : <span key={index}>{part}</span>,
      )}
    </>
  );
}
