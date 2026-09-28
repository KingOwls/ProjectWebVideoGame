# Guía Git y GitHub para GameHive

Esta guía propone una ruta de trabajo para versionar GameHive de forma clara, colaborativa y defendible. Está pensada para un equipo académico que necesita demostrar evolución real del proyecto sin convertir el historial en una colección de commits gigantes o ambiguos.

---

## 1. Objetivo del historial

Un buen historial debe permitir responder tres preguntas:

1. **¿Qué cambió?**
2. **¿Por qué cambió?**
3. **¿En qué etapa del proyecto ocurrió?**

La idea no es producir muchos commits por cantidad. La meta es que cada commit represente una unidad de trabajo real y revisable.

---

## 2. Ramas compartidas

Se recomiendan **dos ramas permanentes compartidas**:

### `main`

Contiene la versión estable y demostrable.

Debe recibir cambios mediante Pull Request desde `develop`, especialmente antes de M1, M2 y entrega final.

### `develop`

Es la rama de integración del equipo.

Aquí se reúnen las funcionalidades terminadas antes de preparar una versión estable.

### Ramas temporales opcionales

Para trabajo individual o por funcionalidad:

```text
feature/login-mock
feature/catalogo
feature/resenas
feature/perfiles
feature/admin
fix/navbar-responsive
docs/readme
```

Estas ramas no necesitan ser permanentes. Cuando el cambio se integra en `develop`, pueden eliminarse.

---

## 3. Crear el repositorio desde cero

Desde la carpeta raíz del proyecto:

```bash
git init
git branch -M main
```

Configurar identidad si aún no está configurada:

```bash
git config --global user.name "Nombre Apellido"
git config --global user.email "correo-que-usas-en-github@example.com"
```

Comprobar:

```bash
git config --global --list
```

Crear el repositorio vacío en GitHub y conectar el remoto:

```bash
git remote add origin https://github.com/USUARIO/gamehive.git
git remote -v
```

---

## 4. Primer commit: baseline real

Como el material recibido ya contiene documentación y mockups, lo más transparente es crear **un baseline** que indique que estos archivos existían antes de comenzar la nueva etapa de versionamiento.

Ejemplo:

```bash
git add .
git commit -m "chore: establish GameHive project baseline"
git push -u origin main
```

Esto es preferible a dividir artificialmente archivos ya terminados en diez commits para aparentar que fueron creados uno por uno dentro del repositorio.

---

## 5. Crear la segunda rama compartida

```bash
git switch -c develop
git push -u origin develop
```

A partir de aquí:

- `main` queda estable;
- `develop` recibe integración;
- el trabajo nuevo puede hacerse en ramas `feature/*`.

---

## 6. Cómo se une otro integrante

El colaborador clona:

```bash
git clone https://github.com/USUARIO/gamehive.git
cd gamehive
```

Descarga referencias remotas:

```bash
git fetch --all
```

Crea una rama local que siga `develop`:

```bash
git switch --track origin/develop
```

Si `develop` ya existe localmente:

```bash
git switch develop
git pull origin develop
```

---

## 7. Flujo diario recomendado

Antes de empezar:

```bash
git switch develop
git pull origin develop
```

Crear una rama para la tarea:

```bash
git switch -c feature/login-mock
```

Trabajar y revisar:

```bash
git status
git diff
```

Agregar únicamente los archivos relacionados:

```bash
git add src/pages/Login.jsx src/data/users.json
```

Crear commit:

```bash
git commit -m "feat(auth): add mock login by role"
```

Subir rama:

```bash
git push -u origin feature/login-mock
```

Luego se abre un Pull Request:

```text
feature/login-mock -> develop
```

Cuando `develop` esté listo para un hito:

```text
develop -> main
```

---

## 8. Convención de mensajes

Se recomienda una versión sencilla de Conventional Commits:

| Tipo | Uso |
| --- | --- |
| `feat` | funcionalidad nueva |
| `fix` | corrección |
| `docs` | documentación |
| `style` | cambios visuales sin lógica |
| `refactor` | reorganización sin cambiar comportamiento esperado |
| `test` | pruebas |
| `chore` | configuración, dependencias, estructura |

Ejemplos:

```text
feat(search): add text search and empty state
feat(review): validate review form before submit
feat(admin): add report moderation table
fix(filters): reset pagination after filter change
docs: explain RAWG integration strategy
refactor(cards): reuse GameCard in home and library
test(auth): cover role access scenarios
```

Evitar mensajes como:

```text
cambios
cosas nuevas
arreglo
avance 2
funciona
```

Porque no explican el contenido del commit.

---

## 9. Ruta de commits recomendada desde este punto

La siguiente secuencia es una **ruta futura**. Cada commit debe hacerse únicamente cuando esos archivos/cambios existan realmente.

### Commit 0 - Baseline del material existente

```text
chore: establish GameHive project baseline
```

Incluye:

```text
GameHive_Definicion_Proyecto_Investigacion.docx
*.png
README.md
GUIA_GIT_GITHUB.md
data/mock-users.json
.gitignore
```

### Commit 1 - Estructura del prototipo M1

```text
feat(m1): add static application shell and navigation
```

Archivos esperados:

```text
index.html
css/base.css
css/components.css
js/navigation.js
assets/
```

### Commit 2 - Inicio de sesión y registro simulado

```text
feat(auth): implement mock login and registration flow
```

Archivos esperados:

```text
login.html
register.html
js/auth.js
data/mock-users.json
```

### Commit 3 - Home y exploración

```text
feat(catalog): add home and explore views with mock games
```

Archivos esperados:

```text
index.html
explore.html
js/catalog.js
data/mock-games.json
css/game-card.css
```

### Commit 4 - Búsqueda y filtros

```text
feat(search): add search filters sorting and empty state
```

Archivos esperados:

```text
search.html
js/search.js
js/filters.js
css/filters.css
```

### Commit 5 - Detalle del videojuego

```text
feat(game): add game detail view and related information
```

Archivos esperados:

```text
game.html
js/game-detail.js
css/game-detail.css
```

### Commit 6 - Reseñas

```text
feat(review): add review creation validation and display
```

Archivos esperados:

```text
review.html
js/reviews.js
data/mock-reviews.json
```

### Commit 7 - Perfil y biblioteca

```text
feat(profile): add user profile and library states
```

Archivos esperados:

```text
profile.html
library.html
js/profile.js
js/library.js
```

### Commit 8 - Perfil de crítico

```text
feat(critic): add verified critic profile view
```

Archivos esperados:

```text
critic.html
js/critic-profile.js
```

### Commit 9 - Administración

```text
feat(admin): add dashboard games users and reports views
```

Archivos esperados:

```text
admin/dashboard.html
admin/games.html
admin/users.html
admin/reports.html
js/admin/
```

### Commit 10 - Estados de error y responsive

```text
fix(ui): improve responsive behavior and error states
```

### Commit 11 - Cierre de M1

```text
docs(m1): document prototype deployment and test evidence
```

Después de verificar M1, crear PR:

```text
develop -> main
```

Y etiqueta:

```bash
git tag -a v0.1.0-m1 -m "Milestone 1 - static prototype"
git push origin v0.1.0-m1
```

---

## 10. Ruta de migración React para M2

No conviene borrar de golpe el prototipo estático. La migración debe poder rastrearse.

### Commit 12 - Inicialización React

```text
chore(react): initialize Vite React application
```

Archivos:

```text
package.json
vite.config.js
src/
public/
```

### Commit 13 - Rutas y layout

```text
feat(react): add routes navbar and shared layout
```

### Commit 14 - Componentes del catálogo

```text
refactor(catalog): extract reusable game cards and filters
```

### Commit 15 - Datos simulados desacoplados

```text
refactor(data): move demo data into reusable data layer
```

### Commit 16 - Autenticación simulada por rol

```text
feat(auth): add role-aware mock session in React
```

### Commit 17 - Reseñas y perfiles

```text
feat(community): implement reviews profiles and library flows
```

### Commit 18 - Administración

```text
feat(admin): implement role-protected admin routes
```

### Commit 19 - Pruebas

```text
test: cover search review permissions and moderation flows
```

### Commit 20 - Cierre de M2

```text
docs(m2): document React architecture and deployment
```

Cuando M2 esté validado:

```bash
git switch main
git pull origin main
```

Integrar mediante PR `develop -> main` y etiquetar:

```bash
git tag -a v0.2.0-m2 -m "Milestone 2 - React frontend"
git push origin v0.2.0-m2
```

---

## 11. Cómo dividir correctamente un cambio en varios commits

Supongamos que trabajas en búsqueda.

Primero creas la estructura:

```bash
git add src/pages/SearchResults.jsx
git commit -m "feat(search): add results page structure"
```

Después agregas filtrado:

```bash
git add src/components/FilterPanel.jsx src/utils/filterGames.js
git commit -m "feat(search): add combined game filters"
```

Luego el estado sin resultados:

```bash
git add src/components/EmptyState.jsx src/pages/SearchResults.jsx
git commit -m "feat(search): add recoverable empty state"
```

Finalmente corriges responsive:

```bash
git add src/styles/search.css
git commit -m "fix(search): improve mobile results layout"
```

Eso muestra una evolución real porque cada snapshot tiene una intención concreta.

---

## 12. Seleccionar archivos específicos para un commit

No es obligatorio usar siempre:

```bash
git add .
```

Para un historial más limpio:

```bash
git add README.md GUIA_GIT_GITHUB.md
git commit -m "docs: add project and collaboration guides"
```

O:

```bash
git add src/pages/Login.jsx src/services/authMock.js data/mock-users.json
git commit -m "feat(auth): connect login form to demo users"
```

Antes de confirmar:

```bash
git status
git diff --staged
```

---

## 13. Guardar trabajo incompleto sin crear un commit malo

Si necesitas cambiar de rama temporalmente:

```bash
git stash push -m "wip: filtros de plataforma"
```

Ver stashes:

```bash
git stash list
```

Recuperar:

```bash
git stash pop
```

Esto evita commits tipo `WIP` únicamente para guardar cambios locales.

---

## 14. Actualizar una rama antes de abrir Pull Request

```bash
git switch develop
git pull origin develop

git switch feature/catalogo
git merge develop
```

Resolver conflictos si aparecen y probar nuevamente.

Después:

```bash
git push
```

---

## 15. Pull Requests

Cada PR debería incluir:

```text
## Qué se agregó
- ...

## Qué requisito cubre
- RF-xx / HU-xx

## Cómo probarlo
1. ...
2. ...

## Evidencia
- Captura o descripción

## Riesgos / pendientes
- ...
```

Esto conecta Git con los requisitos del proyecto y facilita la sustentación.

---

## 16. Proteger `main`

En GitHub se recomienda configurar una regla para `main` que:

- requiera Pull Request;
- evite pushes directos;
- requiera que las comprobaciones pasen cuando existan tests/CI;
- evite borrar la rama accidentalmente.

`develop` puede tener reglas más flexibles, pero también es recomendable integrar mediante PR cuando trabajan varias personas.

---

## 17. `.gitignore` mínimo

Para un proyecto React/Vite:

```gitignore
node_modules/
dist/
.env
.env.*
!.env.example
.DS_Store
Thumbs.db
.vscode/
.idea/
coverage/
```

Nunca versionar una `.env` con secretos reales.

---

## 18. Comprobar el historial

Vista corta:

```bash
git log --oneline --graph --decorate --all
```

Vista con autor y fechas:

```bash
git log --pretty=fuller --date=iso
```

Vista compacta personalizada:

```bash
git log --graph --all --pretty=format:"%C(auto)%h %C(blue)%ad %C(green)%an%Creset %s" --date=short
```

---

## 19. Fechas de los commits

Git conserva dos fechas principales:

- **AuthorDate:** momento atribuido a la creación original del cambio.
- **CommitDate:** momento en que el commit fue creado o reescrito en ese repositorio.

Para trabajo normal no debes configurar estas fechas manualmente. Git toma la hora del sistema.

### Revisar zona horaria del equipo

En Colombia la zona horaria habitual es UTC-05:00. Conviene que Windows/Linux tenga la fecha, hora y zona correctas antes de trabajar.

Git mostrará el offset correspondiente, por ejemplo:

```text
2026-09-23T15:30:00-05:00
```

### Cuándo sí tiene sentido definir una fecha manualmente

Puede ser útil al:

- migrar un historial legítimo desde otro sistema;
- reconstruir commits a partir de registros que conservan su fecha original;
- crear fixtures o pruebas automatizadas;
- importar trabajo antiguo cuya fecha se puede verificar.

No es recomendable usarlo para hacer parecer que una entrega o avance ocurrió antes de que realmente ocurriera.

### Linux, macOS o Git Bash

Para restaurar una fecha legítima conocida:

```bash
GIT_AUTHOR_DATE="2026-09-20T10:30:00-05:00" \
GIT_COMMITTER_DATE="2026-09-20T10:30:00-05:00" \
git commit -m "docs: import original project definition"
```

### PowerShell

```powershell
$env:GIT_AUTHOR_DATE="2026-09-20T10:30:00-05:00"
$env:GIT_COMMITTER_DATE="2026-09-20T10:30:00-05:00"
git commit -m "docs: import original project definition"
Remove-Item Env:GIT_AUTHOR_DATE
Remove-Item Env:GIT_COMMITTER_DATE
```

### CMD de Windows

```bat
set GIT_AUTHOR_DATE=2026-09-20T10:30:00-05:00
set GIT_COMMITTER_DATE=2026-09-20T10:30:00-05:00
git commit -m "docs: import original project definition"
set GIT_AUTHOR_DATE=
set GIT_COMMITTER_DATE=
```

### Verificar después

```bash
git log -1 --pretty=fuller --date=iso
```

Si un commit se reescribe mediante `rebase`, `commit --amend`, cherry-pick u otras operaciones, su `CommitDate` puede cambiar aunque el `AuthorDate` se conserve.

---

## 20. GitHub y la fecha visible

GitHub puede mostrar distintos datos según la vista. La contribución en el calendario también depende de factores como:

- que el correo del commit esté asociado a la cuenta;
- que el commit termine en la rama predeterminada o una rama considerada por GitHub;
- que el repositorio cumpla las condiciones de contribución de GitHub.

Por eso modificar una fecha local no debería utilizarse como estrategia para "fabricar" actividad. La evidencia más sólida es un historial incremental real, PRs y cambios comprensibles.

---

## 21. Corregir el último commit

Si olvidaste un archivo y todavía no has compartido el commit:

```bash
git add archivo-olvidado.js
git commit --amend --no-edit
```

Si ya fue compartido con el equipo, evita reescribirlo sin coordinación, porque cambia el hash del commit.

---

## 22. Revertir sin borrar historia

Para deshacer un commit publicado:

```bash
git revert HASH_DEL_COMMIT
```

`git revert` crea un nuevo commit que revierte el anterior y es más seguro en ramas compartidas.

Evita `git reset --hard` sobre ramas que otras personas ya estén usando, salvo que todo el equipo entienda el impacto.

---

## 23. Etiquetas para hitos académicos

Las etiquetas permiten congelar versiones importantes.

M1:

```bash
git tag -a v0.1.0-m1 -m "Milestone 1 - static prototype"
git push origin v0.1.0-m1
```

M2:

```bash
git tag -a v0.2.0-m2 -m "Milestone 2 - React frontend"
git push origin v0.2.0-m2
```

Entrega final:

```bash
git tag -a v1.0.0 -m "GameHive final academic release"
git push origin v1.0.0
```

---

## 24. Relacionar commits con requisitos

Una práctica muy útil para la defensa es mencionar el requisito en el cuerpo del commit o PR.

Ejemplo:

```bash
git commit -m "feat(review): validate and publish community reviews" \
  -m "Covers RF-10, HU-04 and test cases T-04/T-05."
```

Después puedes demostrar exactamente qué cambios implementaron cada requisito.

---

## 25. Ejemplo de trabajo entre dos integrantes

### Integrante A

```bash
git switch develop
git pull
git switch -c feature/search
# trabaja
git add src/pages/SearchResults.jsx src/components/FilterPanel.jsx
git commit -m "feat(search): add search results and filter panel"
git push -u origin feature/search
```

### Integrante B

```bash
git switch develop
git pull
git switch -c feature/reviews
# trabaja
git add src/pages/ReviewForm.jsx src/components/ReviewCard.jsx
git commit -m "feat(review): add review form and reusable card"
git push -u origin feature/reviews
```

Ambos abren PR hacia `develop`. Después de integrar y probar:

```text
develop -> main
```

---

## 26. Ruta visual sugerida del repositorio

```text
main
  │
  ├── baseline -------------------------------●
  │                                           ▲
  │                                           │ PR M1
  │                                           │
develop ●────●────●────●────●────●────────────●
         \        \              \
          \        \              └─ feature/admin
           \        └─ feature/reviews
            └─ feature/catalog
```

Después de M1 continúa el mismo patrón para React/M2.

---

## 27. Checklist antes de cada push

- [ ] `git status` no muestra archivos accidentales.
- [ ] No hay contraseñas, API keys o tokens reales.
- [ ] El cambio funciona localmente.
- [ ] El commit tiene una sola intención principal.
- [ ] El mensaje explica el cambio.
- [ ] Los archivos incluidos corresponden a esa intención.
- [ ] Si cubre un requisito, está identificado en PR o documentación.
- [ ] Se actualizaron pruebas/documentación cuando era necesario.

---

## 28. Checklist antes de fusionar `develop` a `main`

- [ ] Rutas principales navegables.
- [ ] Login simulado probado con los tres roles.
- [ ] Usuario no puede acceder a funciones de administrador.
- [ ] Búsqueda/filtros tienen estado vacío.
- [ ] Reseñas validan campos obligatorios.
- [ ] Administración puede representar cambios de estado.
- [ ] No hay secretos en el repositorio.
- [ ] README refleja el estado real.
- [ ] Deploy funciona.
- [ ] Se creó evidencia del hito.

---

## 29. Recomendación para el proyecto actual

Con el ZIP recibido, la secuencia más defendible es:

1. crear el repositorio;
2. hacer un único **baseline** del material preexistente;
3. crear y compartir `develop`;
4. comenzar la implementación real desde ese punto;
5. usar ramas `feature/*` para cambios independientes;
6. hacer commits pequeños cuando el cambio funcione;
7. integrar a `develop` mediante PR;
8. fusionar a `main` solo para hitos estables;
9. usar tags para M1, M2 y entrega final.

Así Git deja de ser una decoración para la entrega y se convierte en evidencia concreta de cómo evolucionó GameHive.
