# Full de ruta

Llista de millores prioritzades per a evolucions futures del projecte.

## Funcionalitat
- Considerar la càrrega incremental/paginada dels contactes i introduir un `ion-refresher` o mecanismes d’infinite scroll.
- Afegir mode offline amb persistència (IndexedDB/Capacitor Storage) i sincronització quan torni la connectivitat.
- Permetre l’edició bàsica: marcar contactes favorits, afegir notes o etiquetes i filtrar-hi.
- Exposar feedback d’estat (snackbar/toast) quan hi hagi errors o accions completades.

## Internacionalització i accessibilitat
- Localitzar l’aplicació (ca/es/en) utilitzant `@angular/localize` o una estratègia basada en JSON.
- Revisar contrastos i afegir suport complet per a lectors de pantalla (atributs ARIA, focus management).
- Permetre canviar la mida de font o un mode de gran contrast des de la UI.
- Permetre alternància entre mode dark i light seguint preferències de l'usuari i/o configuració del sistema.

## Arquitectura i qualitat
- Documentar un flux de dades per a càrregues successives (paginació o infinite scroll) i introduir proves d’integració end-to-end (Web Test Runner/Cypress).
- Establir una pipeline CI (GitHub Actions) amb execució de lint, tests unitàries i build.
- Migrar el servei de dades a una API pròpia que actuï com a proxy/cache i permeti personalitzacions (p. ex. filtrar al servidor).

## Rendiment
- Analitzar l’impacte dels estils i components d’Ionic per reduir pes del bundle (lazy load de components i split per funcionalitats futures).
- Afegir prefetch de dades i caching amb `service worker` quan el projecte necessiti PWA.
