# GameHive React - mapa de implementación

Este documento resume dónde quedó cada requisito principal del frontend.

## Estructura

- `src/components/`: navegación, tarjetas, reseñas, modales, guards de rutas y layout administrativo.
- `src/pages/`: pantallas funcionales de usuario, crítico y administrador.
- `src/data/`: configuración y seed JSON editable.
- `src/services/`: autenticación simulada, comunidad local y adaptador RAWG.
- `src/context/`: sesión React.
- `.github/workflows/deploy.yml`: build y despliegue a GitHub Pages.

## Datos configurables

- `app-config.json`: banderas y reglas generales.
- `users.json`: cuentas seed, roles y hashes demo.
- `games.json`: catálogo offline de respaldo.
- `community.json`: reseñas, actividad, reportes y biblioteca inicial.

Los JSON son la fuente inicial. Las acciones de la demo se guardan en el navegador para permitir interacción sin backend.

## Seguridad de la propuesta

1. No hay claves privadas versionadas.
2. Las contraseñas seed no aparecen en texto plano dentro de JSON.
3. La sesión de login se conserva en `sessionStorage`.
4. La key RAWG, si se usa, se pega desde la UI y queda solo en `sessionStorage`.
5. Las rutas administrativas usan guard por rol en frontend.
6. Estas medidas son apropiadas para una demostración estática, pero **no sustituyen autorización de backend**.

## Fuentes críticas

Las reseñas propias de GameHive viven en JSON/localStorage. Para datos externos, RAWG puede aportar metadatos y el campo Metacritic cuando exista. OpenCritic queda documentado como fuente complementaria potencial, pero no se realiza scraping ni se inventa un endpoint público de lectura.

## Pruebas rápidas

- Entrar con usuario y abrir Biblioteca.
- Entrar como crítico y publicar una reseña.
- Entrar como administrador y cambiar estados en Reportes.
- Buscar sin RAWG y comprobar fallback local.
- Añadir una RAWG key desde la llave del navbar y repetir búsqueda.
- Ejecutar `npm run build` después de `npm install`.
