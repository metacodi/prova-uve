# Prova tècnica UVE Solutions

Aplicació Ionic + Angular que mostra un directori de contactes obtingut de l'endpoint `https://jsonplaceholder.typicode.com/users`, amb buscador per qualsevol camp, enllaços ràpids a correu i telèfon i un disseny responsiu.

## Requisits previs
- Node.js LTS (versió recomanada ≥ 18).
- NPM (instal·lat amb Node.js).
- (Opcional) Ionic CLI si es vol utilitzar `ionic serve`.

## Instal·lació
```bash
npm install
```

## Posada en marxa
```bash
npm run start
```
El servidor s'obrirà a `http://localhost:4200/`.

Si tens el client d'Ionic (@ionic/cli) instal·lat globalment també pots utilitzar:
```bash
ionic serve
```

## Scripts addicionals
- `npm run build`: genera la versió de producció.
 - `npm run test -- --watch=false --browsers=ChromeHeadless`: executa la bateria de tests unitaris (Karma + Jasmine) en mode headless, ideal per a CI o per verificar ràpidament que tot funciona correctament.
- `npm run test`: mode interactiu amb Karma per treballar en local.

## Arquitectura i funcionalitats
- L'aplicació és una SPA Angular standalone amb Ionic 8.
- La pàgina principal `ContactsListPage` consumeix el servei `ContactsService`, que invoca l'endpoint públic de jsonplaceholder.
- El formulari de cerca utilitza `Signals` per reaccionar als canvis d'usuari i filtra per nom, usuari, email i telèfon.
- Els enllaços de correu i telèfon obren el gestor predeterminat (`mailto:` i `tel:`).
- Inclou estils responsius i grid d'Ionic per adaptar-se a diferents amplades.

## Millores respecte la primera versió
- Projecte migrat a Angular standalone (sense mòduls NgModule).
- Substitució de `Observable` + `async` per `Signals` i `computed` per a l'estat reactiu.
- Ús de les noves estructures de control `@if` i `@for` en les plantilles.
- Refactorització del codi de la home a `contacts-list.page` amb un servei dedicat i tipatge explícit a `Contact`.
- Aplicació completa de l'estil i comportament responsiu demanat a la prova.
- Afegides proves unitàries amb tests per al servei (`ContactsService`) i per al component (`ContactsListPage`), incloent validacions del filtratge i del maneig d'estats de càrrega/error.
- Afegit un `delay(1000)` al servei per simular latència i permetre visualitzar l'spinner de càrrega durant la demo; en un entorn real es recomana utilitzar les DevTools del navegador per simular la xarxa lenta.
