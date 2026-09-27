# GameHive — Guía de Commits, Ramas, Pull Requests y GitHub Pages

> Guía de trabajo colaborativo para **dos integrantes** del proyecto GameHive.
>
> Stack actual: **React + Vite + JSON/localStorage**.  
> Objetivo: mostrar una evolución técnica clara, mantener un historial de Git entendible y desplegar la versión estable en **GitHub Pages**.

---

## 1. Objetivo de esta guía

Este documento define una forma ordenada de trabajar GameHive entre dos compañeros usando Git y GitHub.

La idea es que el repositorio muestre:

- avances reales y pequeños;
- participación visible de ambos integrantes;
- ramas separadas para trabajar sin pisarse;
- Pull Requests antes de integrar funcionalidades;
- una rama `develop` para integración;
- una rama `main` estable;
- commits con nombres profesionales;
- despliegue automático de `main` en GitHub Pages.

> **Importante:** cada commit debe realizarse cuando ese cambio haya sido realmente implementado o integrado. No es recomendable alterar fechas ni fabricar una cronología anterior. Si el proyecto ya existe completo, pueden usarlo como referencia y volver a integrar los módulos por etapas, haciendo y comprobando cada avance de forma real.

---

# 2. Estrategia de ramas

Para un equipo de dos personas, la estructura recomendada es:

```text
main
│
└── develop
    │
    ├── feature/auth-users
    ├── feature/catalog-games
    ├── feature/critic-role
    ├── feature/admin-panel
    ├── feature/ui-polish
    └── feature/github-pages
```

## `main`

Contiene únicamente versiones estables y presentables.

Todo push o merge a `main` puede activar el despliegue de GitHub Pages.

**No trabajar directamente sobre `main`.**

---

## `develop`

Es la rama compartida de integración.

Aquí se unen las funcionalidades terminadas antes de llevarlas a producción.

Flujo:

```text
feature/* → develop → main
```

---

## `feature/*`

Cada funcionalidad importante debe desarrollarse en una rama temporal.

Ejemplos:

```text
feature/auth-users
feature/catalog-games
feature/critic-role
feature/admin-panel
feature/ui-polish
```

Cuando la función está terminada:

```text
feature/*
   ↓ Pull Request
develop
```

Después se elimina la rama de feature.

---

# 3. Reparto recomendado entre dos integrantes

Para evitar conflictos constantes, conviene dividir el proyecto por módulos.

## Integrante A — Usuarios, autenticación y crítico

Responsabilidades principales:

```text
src/context/AuthContext.jsx
src/services/authService.js
src/pages/LoginPage.jsx
src/pages/RegisterPage.jsx
src/pages/ProfilePage.jsx
src/pages/LibraryPage.jsx
src/pages/CriticApplicationPage.jsx
src/pages/CriticProfilePage.jsx
src/pages/ReviewEditorPage.jsx
src/data/users.json
```

## Integrante B — Catálogo, comunidad y administración

Responsabilidades principales:

```text
src/pages/HomePage.jsx
src/pages/ExplorePage.jsx
src/pages/SearchResultsPage.jsx
src/pages/GameDetailPage.jsx
src/pages/AdminDashboardPage.jsx
src/pages/AdminGamesPage.jsx
src/pages/AdminUsersPage.jsx
src/pages/AdminReportsPage.jsx
src/services/communityService.js
src/services/rawgService.js
src/data/games.json
src/data/community.json
```

## Archivos compartidos

Estos archivos deben editarse con más cuidado porque ambos podrían necesitarlos:

```text
src/App.jsx
src/styles.css
src/components/Navbar.jsx
package.json
vite.config.js
README.md
```

Antes de modificar uno de estos archivos, es recomendable avisar al compañero y sincronizar `develop`.

---

# 4. Crear el repositorio

En GitHub:

1. Crear un nuevo repositorio.
2. Nombre sugerido:

```text
GameHive
```

3. Puede ser público si se usará GitHub Pages con GitHub Free.
4. No agregar archivos iniciales si ya tienen el proyecto local.

Después, desde la carpeta de GameHive:

```bash
git init
git branch -M main
```

Como el objetivo del proyecto es mostrar una progresión clara, **no es necesario subir todos los archivos en el primer commit**. Pueden preparar únicamente los archivos iniciales que quieran registrar, por ejemplo:

```bash
git add README.md package.json package-lock.json
git status
git commit -m "chore(project): initialize GameHive project"
```

Después se conecta el repositorio remoto y se publica ese primer avance:

```bash
git remote add origin https://github.com/USUARIO/GameHive.git
git push -u origin main
```

Los demás archivos continuarán existiendo en el computador, pero no entrarán a Git hasta que sean agregados explícitamente a un commit posterior.

> Sustituir `USUARIO` por el usuario u organización real de GitHub.

---

# 5. Agregar al compañero como colaborador

El propietario del repositorio debe entrar a:

```text
Repository
→ Settings
→ Collaborators
→ Add people
```

Agregar el usuario de GitHub del segundo integrante.

Cuando acepte la invitación podrá clonar y trabajar en las ramas del proyecto.

---

# 6. Crear `develop`

El propietario puede crear la rama compartida así:

```bash
git switch -c develop
git push -u origin develop
```

Desde ese momento:

```text
main    = versión estable

develop = integración del equipo
```

---

# 7. Primer paso del segundo integrante

El segundo integrante clona el repositorio:

```bash
git clone https://github.com/USUARIO/GameHive.git
cd GameHive
npm install
```

Después obtiene las ramas remotas:

```bash
git fetch --all
git switch develop
```

Comprobar el proyecto:

```bash
npm run dev
```

Y antes de hacer commits importantes:

```bash
npm run build
```

---

# 8. Norma para escribir commits

GameHive utilizará **Conventional Commits**.

Formato:

```text
tipo(área): descripción breve
```

Ejemplo:

```text
feat(critic): add professional review questionnaire
```

---

## Tipos principales

| Tipo | Uso |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de error |
| `refactor` | Reorganización sin cambiar comportamiento |
| `style` | Cambios visuales/CSS sin lógica nueva |
| `docs` | Documentación |
| `test` | Pruebas |
| `chore` | Configuración o mantenimiento |
| `ci` | GitHub Actions / integración continua |
| `build` | Configuración del proceso de compilación |

Ejemplos válidos:

```text
feat(auth): add demo login with local users
feat(catalog): add game exploration page
feat(critic): add structured critic evaluation
fix(router): preserve routes on GitHub Pages
style(profile): improve critic profile layout
docs(readme): document demo accounts
ci(pages): configure automatic GitHub Pages deployment
```

Evitar commits como:

```text
cambios
avance
cosas nuevas
final
final final
ahora si
arreglo
commit 7
```

Git no merece ese misterio arqueológico.

---

# 9. Regla de oro para cada commit

Un commit debería representar **una unidad lógica de trabajo**. Git no obliga a confirmar todos los archivos que existen en la carpeta: el commit solamente incluye aquello que haya sido enviado previamente al área de preparación o **staging**.

Correcto:

```text
feat(auth): add login form validation
```

Incorrecto:

```text
feat: login + admin + critic + css + README + deploy
```

## 9.1. Cómo subir únicamente uno o varios archivos en un commit

Supongamos que el proyecto ya contiene:

```text
README.md
package.json
package-lock.json
vite.config.js
src/
public/
data/
```

pero para el primer avance solamente se quieren registrar:

```text
README.md
package.json
package-lock.json
```

Primero se consulta el estado del repositorio:

```bash
git status
```

Después se agregan **solamente** esos archivos:

```bash
git add README.md package.json package-lock.json
```

Se comprueba otra vez qué quedó preparado:

```bash
git status
```

Git debería separar los archivos preparados de aquellos que todavía no se subirán:

```text
Changes to be committed:
  new file: README.md
  new file: package.json
  new file: package-lock.json

Untracked files:
  vite.config.js
  src/
  public/
  data/
```

Solamente los archivos mostrados en **Changes to be committed** entrarán en el siguiente commit.

Para revisar exactamente las líneas que serán confirmadas:

```bash
git diff --staged
```

Finalmente:

```bash
git commit -m "chore(project): initialize GameHive project"
git push
```

Los demás archivos permanecerán intactos en el computador y podrán agregarse en avances posteriores.

---

## 9.2. Segundo commit con otros archivos

Por ejemplo, para registrar después la configuración base de React y Vite:

```bash
git add index.html vite.config.js src/main.jsx
git status
git diff --staged
git commit -m "feat(app): configure React and Vite entry point"
git push
```

Después, para la estructura principal de la aplicación:

```bash
git add src/App.jsx
git commit -m "feat(app): add main application structure"
git push
```

De esta forma el historial puede verse progresivamente:

```text
Commit 1
chore(project): initialize GameHive project
  README.md
  package.json
  package-lock.json

Commit 2
feat(app): configure React and Vite entry point
  index.html
  vite.config.js
  src/main.jsx

Commit 3
feat(app): add main application structure
  src/App.jsx
```

---

## 9.3. Evitar `git add .` cuando se quiere controlar la progresión

El comando:

```bash
git add .
```

agrega al staging prácticamente todos los cambios de la carpeta actual. Es válido en muchos proyectos, pero **no es conveniente cuando se quiere construir commits pequeños y claramente separados**.

En GameHive se recomienda preferir:

```bash
git add archivo1 archivo2
```

o una carpeta concreta:

```bash
git add src/components/
```

Ejemplo:

```bash
git add src/pages/LoginPage.jsx src/services/authService.js
git commit -m "feat(auth): add demo login flow"
```

---

## 9.4. Qué hacer si se agregó un archivo por accidente

Si todavía **no se ha hecho el commit**, retirar todos los archivos del staging sin borrar los cambios locales:

```bash
git restore --staged .
```

Después se agregan únicamente los correctos:

```bash
git add README.md package.json
```

Para retirar solo un archivo:

```bash
git restore --staged src/App.jsx
```

Esto no elimina el archivo ni deshace el trabajo. Únicamente evita que entre en el próximo commit.

---

## 9.5. Cuando un mismo archivo tiene cambios para dos commits distintos

Puede ocurrir que `src/App.jsx` tenga al mismo tiempo cambios de autenticación y cambios de navegación. Para separar ambos avances se puede usar el modo interactivo:

```bash
git add -p src/App.jsx
```

Git mostrará cada bloque de cambios y preguntará:

```text
Stage this hunk [y,n,q,a,d,s,e,?]?
```

Las opciones más útiles son:

| Opción | Acción |
|---|---|
| `y` | agregar ese bloque al commit |
| `n` | dejar ese bloque para después |
| `s` | intentar dividirlo en bloques más pequeños |
| `q` | salir |

Así se puede hacer, por ejemplo:

```bash
git add -p src/App.jsx
git commit -m "feat(auth): integrate protected routes"
```

y después preparar las modificaciones restantes:

```bash
git add -p src/App.jsx
git commit -m "feat(navigation): integrate application routes"
```

---

## 9.6. Rutina recomendada antes de cada commit

Para ambos integrantes, el flujo habitual debería ser:

```bash
# 1. Revisar todos los cambios
git status

# 2. Revisar diferencias todavía no preparadas
git diff

# 3. Elegir únicamente los archivos del avance actual
git add ARCHIVO_1 ARCHIVO_2

# 4. Confirmar qué entrará realmente
git status
git diff --staged

# 5. Crear el commit
git commit -m "tipo(area): descripcion del avance"

# 6. Publicarlo en la rama de trabajo
git push
```

El segundo `git status` y `git diff --staged` son especialmente importantes. Funcionan como una revisión final antes de cerrar la caja del commit.

---

## 9.7. Staging, commit y push no son lo mismo

El flujo conceptual es:

```text
Archivos modificados en el computador
              │
              │ git add
              ▼
         Área de staging
              │
              │ git commit
              ▼
       Repositorio local
              │
              │ git push
              ▼
            GitHub
```

Por tanto:

- `git add` elige **qué cambios** formarán parte del siguiente commit;
- `git commit` registra esos cambios en el historial local;
- `git push` publica los commits locales en la rama remota de GitHub.

Tener todo GameHive en una carpeta **no significa que todo deba subir en el mismo commit**. El staging permite construir el historial paso a paso de forma controlada.

> Los commits deben corresponder a avances que el equipo haya realmente integrado y pueda explicar. Separar archivos sirve para documentar mejor el proceso, no para atribuir trabajo inexistente ni fabricar una cronología artificial.

---

# 10. Ruta completa de commits para GameHive

La siguiente secuencia está diseñada para mostrar una progresión lógica del proyecto.

**No tienen que hacer todos los commits el mismo día.** Cada commit se realiza cuando el avance correspondiente esté terminado y comprobado.

---

## ETAPA 1 — Base del proyecto

### Commit 1 — Integrante A

Rama:

```text
feature/project-base
```

Archivos principales:

```text
package.json
package-lock.json
index.html
src/main.jsx
vite.config.js
.gitignore
```

Commit:

```bash
git commit -m "chore(project): initialize React and Vite structure"
```

---

### Commit 2 — Integrante A

Archivos:

```text
src/App.jsx
src/components/Navbar.jsx
src/components/Footer.jsx
src/components/Logo.jsx
```

Commit:

```bash
git commit -m "feat(layout): add main application structure and navigation"
```

---

### Commit 3 — Integrante B

Archivos:

```text
src/styles.css
```

Commit:

```bash
git commit -m "style(ui): define initial GameHive visual system"
```

---

### Pull Request 1

```text
feature/project-base → develop
```

Título recomendado:

```text
feat: establish GameHive project foundation
```

---

# ETAPA 2 — Datos y catálogo

## Integrante B

Crear rama:

```bash
git switch develop
git pull origin develop
git switch -c feature/catalog-games
```

### Commit 4

Archivos:

```text
src/data/games.json
src/data/app-config.json
```

```bash
git commit -m "feat(data): add local game catalog and app configuration"
```

### Commit 5

Archivos:

```text
src/components/GameCard.jsx
src/components/GameArtwork.jsx
src/pages/HomePage.jsx
```

```bash
git commit -m "feat(home): add featured games and catalog cards"
```

### Commit 6

Archivos:

```text
src/pages/ExplorePage.jsx
src/components/SearchBar.jsx
```

```bash
git commit -m "feat(catalog): add exploration and filtering interface"
```

### Commit 7

Archivos:

```text
src/pages/SearchResultsPage.jsx
```

```bash
git commit -m "feat(search): add game search results flow"
```

### Commit 8

Archivos:

```text
src/pages/GameDetailPage.jsx
src/components/ReviewCard.jsx
```

```bash
git commit -m "feat(game): add game details and community reviews"
```

### Pull Request 2

```text
feature/catalog-games → develop
```

---

# ETAPA 3 — Autenticación y usuario

## Integrante A

```bash
git switch develop
git pull origin develop
git switch -c feature/auth-users
```

### Commit 9

Archivos:

```text
src/data/users.json
src/utils/hash.js
src/services/authService.js
```

```bash
git commit -m "feat(auth): add local demo authentication service"
```

### Commit 10

Archivos:

```text
src/context/AuthContext.jsx
src/components/ProtectedRoute.jsx
```

```bash
git commit -m "feat(auth): add session context and protected routes"
```

### Commit 11

Archivos:

```text
src/pages/LoginPage.jsx
src/pages/RegisterPage.jsx
```

```bash
git commit -m "feat(account): add login and registration pages"
```

### Commit 12

Archivos:

```text
src/pages/ProfilePage.jsx
src/pages/LibraryPage.jsx
```

```bash
git commit -m "feat(user): add profile and personal game library"
```

### Pull Request 3

```text
feature/auth-users → develop
```

---

# ETAPA 4 — Comunidad y reseñas

## Integrante B

Crear:

```text
feature/community-reviews
```

### Commit 13

Archivos:

```text
src/data/community.json
src/services/communityService.js
```

```bash
git commit -m "feat(community): add local review and report storage"
```

### Commit 14

Archivos:

```text
src/pages/ReviewEditorPage.jsx
src/components/ReviewCard.jsx
```

En esta etapa todavía puede implementarse primero la experiencia sencilla del usuario.

```bash
git commit -m "feat(review): add standard user review workflow"
```

### Pull Request 4

```text
feature/community-reviews → develop
```

---

# ETAPA 5 — Rol profesional de crítico

## Integrante A

Crear:

```text
feature/critic-role
```

### Commit 15

Archivos:

```text
src/pages/CriticApplicationPage.jsx
src/pages/ProfilePage.jsx
src/services/communityService.js
```

```bash
git commit -m "feat(critic): add critic role application workflow"
```

### Commit 16

Archivos:

```text
src/pages/ReviewEditorPage.jsx
```

Funcionalidad:

- plataforma;
- horas jugadas;
- juego completado;
- evaluación estructurada.

```bash
git commit -m "feat(critic): add professional review questionnaire"
```

### Commit 17

Archivos:

```text
src/pages/ReviewEditorPage.jsx
src/data/community.json
```

Funcionalidad:

- jugabilidad;
- narrativa;
- arte;
- sonido;
- rendimiento;
- accesibilidad;
- contenido;
- calidad/precio;
- cálculo de puntuación.

```bash
git commit -m "feat(critic): add multi-category scoring system"
```

### Commit 18

Archivos:

```text
src/pages/ReviewEditorPage.jsx
```

Funcionalidad:

- resumen;
- análisis completo;
- pros;
- contras;
- público recomendado;
- declaración sobre copia proporcionada.

```bash
git commit -m "feat(critic): add editorial analysis and transparency fields"
```

### Commit 19

Archivos:

```text
src/pages/CriticProfilePage.jsx
src/components/ReviewCard.jsx
```

```bash
git commit -m "feat(critic): expand critic profile with review metrics"
```

### Pull Request 5

```text
feature/critic-role → develop
```

---

# ETAPA 6 — Administración

## Integrante B

Crear:

```text
feature/admin-panel
```

### Commit 20

Archivos:

```text
src/components/AdminLayout.jsx
src/pages/AdminDashboardPage.jsx
```

```bash
git commit -m "feat(admin): add administration dashboard"
```

### Commit 21

Archivos:

```text
src/pages/AdminGamesPage.jsx
src/pages/AdminUsersPage.jsx
```

```bash
git commit -m "feat(admin): add game and user management"
```

### Commit 22

Archivos:

```text
src/pages/AdminUsersPage.jsx
src/services/authService.js
src/services/communityService.js
```

```bash
git commit -m "feat(admin): add critic application moderation"
```

### Commit 23

Archivos:

```text
src/pages/AdminReportsPage.jsx
```

```bash
git commit -m "feat(admin): add community report management"
```

### Pull Request 6

```text
feature/admin-panel → develop
```

---

# ETAPA 7 — Integración de rutas y roles

Después de que ambas ramas estén integradas:

```bash
git switch develop
git pull origin develop
```

Crear:

```text
feature/integration
```

### Commit 24 — Integrante A

Archivos:

```text
src/App.jsx
src/components/Navbar.jsx
src/components/ProtectedRoute.jsx
```

```bash
git commit -m "refactor(routes): connect role-based application navigation"
```

### Commit 25 — Integrante B

Archivos:

```text
src/styles.css
```

```bash
git commit -m "style(responsive): polish layouts for desktop and mobile"
```

### Commit 26 — cualquiera de los dos

Solo si realmente corrigen errores encontrados durante las pruebas.

```bash
git commit -m "fix(integration): resolve role navigation and review issues"
```

### Pull Request 7

```text
feature/integration → develop
```

---

# ETAPA 8 — Documentación

Crear:

```text
feature/documentation
```

Pueden repartirse la documentación entre ambos.

### Commit 27 — Integrante A

Archivos:

```text
README.md
MEJORAS_ROL_CRITICO.md
```

```bash
git commit -m "docs(readme): document architecture roles and demo accounts"
```

### Commit 28 — Integrante B

Archivos:

```text
IMPLEMENTACION_REACT.md
README_COMMITS_GAMEHIVE.md
```

```bash
git commit -m "docs(git): add collaboration and commit workflow guide"
```

### Pull Request 8

```text
feature/documentation → develop
```

---

# ETAPA 9 — Preparar GitHub Pages

Crear:

```text
feature/github-pages
```

## Commit 29

Archivos:

```text
vite.config.js
```

La configuración actual de GameHive detecta automáticamente el nombre del repositorio:

```js
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const githubPagesBase = repositoryName ? `/${repositoryName}/` : '/'
```

Esto permite que Vite genere rutas compatibles con:

```text
https://usuario.github.io/GameHive/
```

Commit:

```bash
git commit -m "build(vite): configure repository base for GitHub Pages"
```

---

## Commit 30

Archivo:

```text
.github/workflows/deploy.yml
```

Commit:

```bash
git commit -m "ci(pages): add automatic GitHub Pages deployment"
```

Workflow recomendado y correcto:

```yaml
name: Deploy GameHive to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Setup Node
        uses: actions/setup-node@v6
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Configure Pages
        uses: actions/configure-pages@v5

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    needs: build
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

# 11. Probar antes de integrar a `main`

En `develop`:

```bash
git switch develop
git pull origin develop
npm ci
npm run build
```

El comando debe terminar sin errores.

Después pueden probar la compilación:

```bash
npm run preview
```

Revisar al menos:

- Home;
- Explorar;
- búsqueda;
- detalle de juego;
- login;
- registro;
- perfil;
- biblioteca;
- reseña normal;
- crítica profesional;
- solicitud de crítico;
- panel administrativo;
- aprobación/rechazo de crítico;
- reportes.

---

# 12. Pasar `develop` a `main`

No hacer simplemente:

```bash
git push origin main
```

sin revisar.

La forma recomendada es crear un Pull Request:

```text
develop → main
```

Título:

```text
release: publish GameHive milestone
```

Descripción sugerida:

```markdown
## Resumen

Integra la versión estable de GameHive.

## Funcionalidades

- Catálogo y búsqueda de videojuegos.
- Autenticación demo por roles.
- Reseñas de usuarios.
- Sistema profesional de críticos.
- Solicitudes para convertirse en crítico.
- Panel administrativo.
- Datos locales JSON/localStorage.
- Diseño responsive.
- Configuración de GitHub Pages.

## Verificación

- [x] npm ci
- [x] npm run build
- [x] Login usuario
- [x] Login crítico
- [x] Login administrador
- [x] Flujo de reseñas
- [x] Flujo de solicitud de crítico
- [x] Panel administrativo
```

Después de revisar:

```text
Merge Pull Request
```

El merge a `main` activará GitHub Actions.

---

# 13. Activar GitHub Pages

En GitHub:

```text
Repository
→ Settings
→ Pages
→ Build and deployment
→ Source
→ GitHub Actions
```

Después ir a:

```text
Repository
→ Actions
```

Allí debería aparecer:

```text
Deploy GameHive to GitHub Pages
```

Cuando termine correctamente, GitHub mostrará la URL publicada.

Normalmente será parecida a:

```text
https://USUARIO.github.io/GameHive/
```

---

# 14. Flujo diario de trabajo

Cada integrante debería comenzar así:

```bash
git switch develop
git pull origin develop
```

Después crear su feature:

```bash
git switch -c feature/nombre-funcionalidad
```

Trabajar normalmente.

Comprobar:

```bash
git status
git diff
npm run build
```

Agregar archivos:

```bash
git add src/pages/Archivo.jsx src/services/Servicio.js
```

Crear commit:

```bash
git commit -m "feat(area): describe completed functionality"
```

Subir la rama:

```bash
git push -u origin feature/nombre-funcionalidad
```

Crear Pull Request:

```text
feature/nombre-funcionalidad → develop
```

---

# 15. Hacer varios commits dentro de una misma rama

No es necesario crear una rama por cada commit.

Ejemplo:

```text
feature/critic-role
│
├── feat(critic): add critic application workflow
├── feat(critic): add professional review questionnaire
├── feat(critic): add multi-category scoring system
├── feat(critic): add editorial analysis fields
└── feat(critic): expand public critic profile
```

Cuando todo esté listo:

```text
Pull Request → develop
```

Esto mantiene el historial entendible sin generar decenas de ramas inútiles.

---

# 16. Sincronizar una rama antes de continuar

Supongamos que Integrante A lleva un rato trabajando en:

```text
feature/critic-role
```

pero Integrante B ya integró cambios a `develop`.

Integrante A puede actualizar así:

```bash
git switch develop
git pull origin develop

git switch feature/critic-role
git merge develop
```

Si no hay conflictos, continuar normalmente.

Si existen conflictos, Git indicará los archivos afectados.

Después de resolverlos:

```bash
git add .
git commit -m "fix(merge): resolve integration conflicts with develop"
```

---

# 17. Regla para evitar conflictos entre los dos compañeros

Antes de empezar una sesión:

```bash
git switch develop
git pull origin develop
```

Antes de crear Pull Request:

```bash
npm run build
```

Y no modificar simultáneamente, si pueden evitarlo:

```text
src/App.jsx
src/styles.css
src/components/Navbar.jsx
```

Si ambos necesitan cambiar uno de ellos, integrar primero una rama y después actualizar la otra desde `develop`.

---

# 18. Qué archivos NO subir

El `.gitignore` del proyecto ya debería excluir:

```text
node_modules/
dist/
.env
.env.*
*.log
.vscode/
.idea/
```

Sí deben subir:

```text
package.json
package-lock.json
.env.example
src/
.github/workflows/
vite.config.js
README.md
```

Especialmente `package-lock.json`: permite que ambos compañeros y GitHub Actions instalen versiones consistentes de las dependencias.

---

# 19. Propuesta de participación equilibrada

Una distribución posible sería:

| Etapa | Integrante A | Integrante B |
|---|---|---|
| Base | React/Vite/App | UI inicial |
| Datos | Configuración | Catálogo |
| Usuario | Auth, perfil, biblioteca | Comunidad |
| Reseñas | Integración por roles | Reseña estándar |
| Crítico | Formulario profesional | Apoyo a datos/comunidad |
| Admin | Integración auth | Dashboard y gestión |
| Integración | Rutas por roles | Responsive/UI |
| Docs | README funcional | Git/implementación |
| Deploy | Revisión | GitHub Actions |

No tiene que ser exactamente 50/50 en número de commits. Lo importante es que ambos tengan aportes técnicos identificables y que los Pull Requests permitan ver qué desarrolló cada uno.

---

# 20. Ejemplo visual del historial final

Al terminar, el historial puede verse aproximadamente así:

```text
* ci(pages): add automatic GitHub Pages deployment
* build(vite): configure repository base for GitHub Pages
* docs(git): add collaboration and commit workflow guide
* docs(readme): document architecture roles and demo accounts
* fix(integration): resolve role navigation and review issues
* style(responsive): polish layouts for desktop and mobile
* refactor(routes): connect role-based application navigation
* feat(admin): add community report management
* feat(admin): add critic application moderation
* feat(admin): add game and user management
* feat(admin): add administration dashboard
* feat(critic): expand critic profile with review metrics
* feat(critic): add editorial analysis and transparency fields
* feat(critic): add multi-category scoring system
* feat(critic): add professional review questionnaire
* feat(critic): add critic role application workflow
* feat(review): add standard user review workflow
* feat(community): add local review and report storage
* feat(user): add profile and personal game library
* feat(account): add login and registration pages
* feat(auth): add session context and protected routes
* feat(auth): add local demo authentication service
* feat(game): add game details and community reviews
* feat(search): add game search results flow
* feat(catalog): add exploration and filtering interface
* feat(home): add featured games and catalog cards
* feat(data): add local game catalog and app configuration
* style(ui): define initial GameHive visual system
* feat(layout): add main application structure and navigation
* chore(project): initialize React and Vite structure
```

Este historial cuenta una historia entendible del proyecto sin depender de commits gigantes.

---

# 21. Tags para entregas académicas

Cuando una entrega importante esté estable pueden crear un tag.

Ejemplo para M1:

```bash
git switch main
git pull origin main
git tag -a v0.1.0-m1 -m "GameHive Milestone 1"
git push origin v0.1.0-m1
```

Ejemplo para M2:

```bash
git tag -a v0.2.0-m2 -m "GameHive Milestone 2"
git push origin v0.2.0-m2
```

Versión final:

```bash
git tag -a v1.0.0 -m "GameHive final release"
git push origin v1.0.0
```

Esto permite demostrar exactamente qué versión correspondía a cada entrega.

---

# 22. Checklist antes de cada Pull Request

```text
[ ] Estoy trabajando en una feature branch.
[ ] Actualicé develop antes de comenzar.
[ ] Mi código funciona localmente.
[ ] npm run build termina correctamente.
[ ] No subí node_modules.
[ ] No subí .env.
[ ] Mis commits representan cambios concretos.
[ ] Los mensajes siguen Conventional Commits.
[ ] Revisé git diff.
[ ] Subí la rama al repositorio remoto.
[ ] El PR apunta a develop y no a main.
```

---

# 23. Checklist antes de pasar a `main`

```text
[ ] Todas las features necesarias están en develop.
[ ] develop está actualizado.
[ ] npm ci funciona.
[ ] npm run build funciona.
[ ] Login de usuario funciona.
[ ] Login de crítico funciona.
[ ] Login de administrador funciona.
[ ] Catálogo y búsqueda funcionan.
[ ] Reseñas funcionan.
[ ] Críticas profesionales funcionan.
[ ] Solicitud de crítico funciona.
[ ] Moderación administrativa funciona.
[ ] No existen secretos reales dentro del repositorio.
[ ] .env está ignorado.
[ ] El Pull Request develop → main fue revisado.
```

---

# 24. Resumen rápido del flujo

```bash
# 1. actualizar integración
git switch develop
git pull origin develop

# 2. crear rama
git switch -c feature/mi-funcionalidad

# 3. trabajar y revisar
git status
git diff
npm run build

# 4. commit
git add archivos-relacionados
git commit -m "feat(area): add functionality"

# 5. publicar rama
git push -u origin feature/mi-funcionalidad

# 6. GitHub
# Crear PR: feature/mi-funcionalidad → develop

# 7. cuando develop esté estable
# Crear PR: develop → main

# 8. el push/merge a main activa GitHub Pages
```

---

# 25. Regla final del equipo

La estructura recomendada para GameHive queda así:

```text
main
 ↑
 │ Pull Request de versión estable
 │
develop
 ↑              ↑
 │              │
feature/A       feature/B
Integrante A    Integrante B
```

Cada integrante desarrolla funcionalidades reales en ramas separadas, crea commits pequeños y descriptivos, sube su rama y solicita integración mediante Pull Request.

`develop` sirve para comprobar que todo funciona junto.

`main` representa únicamente la versión estable y es la rama que despliega GameHive en GitHub Pages.

Con esta metodología, el repositorio no solo contiene el proyecto: también documenta de forma natural **cómo fue construido, quién participó y cómo evolucionó cada módulo**.

---

## Referencias oficiales

- GitHub Pages — configuración de origen de publicación: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- GitHub Pages — workflows personalizados: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- Vite — despliegue de sitios estáticos: https://vite.dev/guide/static-deploy.html
