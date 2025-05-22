# 🐳 VorvanDocs - Documentation System


# O aplikaci

VorvanDocs je lehký prohlížeč dokumentace, který dynamicky zobrazuje soubory Markdown z adresářové struktury. Ideální pro technickou dokumentaci, znalostní báze nebo jakýkoli hierarchicky uspořádaný obsah.

## Klíčové vlastnosti

- **Dynamická navigace**  
  Automaticky generuje skládací strom souborů z adresářové struktury
- **Okamžitý náhled**  
  Okamžitě vykresluje soubory Markdown do čistého formátování
- **Podpora témat**  
  Automatický světlý/tmavý režim podle systémového nastavení
- **Responzivní design**  
  Funguje na počítačích i mobilních zařízeních
- **Klientské routování**  
  Udržuje stav navigace pomocí URL hashů
- **Žádný build proces**  
  Pracuje přímo se statickými soubory

## Jak to funguje

1. **Adresářová struktura**  
   Čte složku `/docs` a její podadresáře
2. **Parsování souborů**  
   Automaticky rozpozná adresáře (📁) a Markdown soubory (📄)
3. **Vykreslování obsahu**  
   Používá `marked.js` pro rychlou konverzi Markdown → HTML
4. **Navigace**  
   Udržuje stav rozbalení/sbalení adresářů

## Technologie

- Moderní JavaScript (ES6+)
- CSS Grid pro layout
- CSS proměnné pro téma
- Marked.js pro parsování Markdownu
- Nativní browser API (Fetch, DOMParser)

## Použití

1. Uspořádejte dokumentaci do Markdown souborů v `/docs`
2. Aplikace automaticky:
   - Parsuje adresářovou strukturu
   - Generuje navigaci
   - Načítá soubory
   - Vykresluje obsah

## Omezení

- Vyžaduje specifickou adresářovou strukturu (`/docs` v kořenu)
- Podporuje pouze Markdown soubory (.md)
- Žádné server-side rendering
- Vyžaduje moderní prohlížeč (využívá ES6 funkce)

## Vhodné pro

- Technickou dokumentaci
- Projektové wiki
- Znalostní báze
- Osobní systém poznámek
  
