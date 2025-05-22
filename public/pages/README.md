# MicroVorvanDocs

Zaměříme se na **ultralehkou základní verzi** bez AI, playgroundů a kolaborace. Pojďme vytvořit **„MicroVorvanDocs"** – minimalistickou alternativu k Docsify s rychlostí jako priorita.

---

### 🎯 **Minimální jádro (v0.1)**

1. **Instant Markdown → HTML**
  
  - Načítání `.md` souborů přímo z adresáře (žádný build, žádné konfigurace).
  - Rendering pomocí **WebAssembly Markdown parseru** (3x rychlejší než klasické JS řešení).
2. **Zero-Dependency Router**
  
  - Navigace pomocí hash (#) bez reloadu stránky.
  - Automatické detekce `README.md` jako výchozí stránky.
3. **CSS Atomic Injection**
  
  - Vestavěné minimalistické CSS (5 KB) s tmavým/světlým režimem.
  - Žádné externí závislosti – vše v jednom HTML souboru.

---

### 🛠️ **Struktura projektu**

