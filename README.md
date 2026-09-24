# Sudoku

Svenskt Sudoku med Mini (6×6, 2×3-block) och Utmanaren (9×9, 3×3-block), slumpade pussel med unik lösning, tidtagning och separata gemensamma topp 10-listor.

## Teknik
React, Vinext, Cloudflare Workers och D1 via Drizzle. Servern genererar pusslet, behåller lösningen och validerar avslut. Tider beräknas på servern; namn kan registreras en gång per avslutad runda. Topplistorna ligger inte i localStorage.

## Utveckling
Kräver Node 22.13 eller senare. Kör `npm ci`, `npm run db:generate` vid schemaändring och `npm run build`. Applicera migrationerna med Wrangler mot lokal D1 enligt `drizzle/`. Kör `npm run dev` för utveckling. Sites hanterar produktionsbindningen DB och applicering av migrationer vid publicering.

GitHub lagrar källkoden. Sajten behöver Workers/D1 för topplistorna och kan därför inte köras enbart som statisk GitHub Pages-sajt.

## Funktioner
- Mus, pekskärm och tangentbord (1–9, piltangenter, Delete/Backspace).
- Markering av konflikter, ångra och radera.
- Animerade drag, vinstkonfetti och stöd för reducerad rörelse.
- Namn på 1–24 tecken. Vid lika tid är båda rundorna giltiga resultat.
- På mobil visas topplistan under spelet.

## Begränsningar
Topplistan är för vänskapligt spel, inte en manipulationssäker tävling: servervalidering förhindrar påhittade lösningar/tider men inte automatiska lösare. Slumpade pussel inom en nivå kan ha olika svårighet. En omladdning av sidan avslutar den synliga rundan. Spelarnamn är självvalda och inte verifierade identiteter.
