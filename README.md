# GameHive

Plataforma web comunitaria para descubrir videojuegos, consultar información relevante, publicar reseñas y contextualizar la confiabilidad de las opiniones mediante roles, reputación y moderación.

> **Estado actual del paquete:** documentación funcional + mockups de referencia + frontend ejecutable en React/Vite. La implementación usa JSON como respaldo local, autenticación simulada por rol y un adaptador opcional a RAWG. No incluye backend ni base de datos de producción.

---

## 1. Propósito del proyecto

GameHive nace de un problema concreto: la información necesaria para investigar un videojuego suele estar repartida entre tiendas, agregadores, comunidades y redes sociales. Además, una calificación aislada no siempre permite saber qué tan útil o confiable es una reseña.

La propuesta reúne en una sola experiencia:

- descubrimiento y búsqueda de videojuegos;
- filtros y ordenamiento de catálogo;
- ficha detallada de cada juego;
- reseñas y puntuaciones comunitarias;
- perfiles de usuarios y críticos;
- biblioteca personal y favoritos;
- reputación como señal contextual, no como garantía de verdad;
- reportes y moderación;
- administración de juegos, cuentas, críticos y contenido reportado.

La intención no es construir una tienda, un clon de Steam ni un agregador puro de notas. El valor diferencial está en combinar **descubrimiento + opinión + contexto de confiabilidad**.

---

## 2. Pregunta de investigación aplicada

**¿Cómo puede una aplicación web combinar información estructurada de videojuegos con reseñas comunitarias y señales de reputación para facilitar el descubrimiento de títulos y la interpretación de la confiabilidad de las opiniones?**

### Hipótesis de trabajo

Una interfaz que integre búsqueda, detalle, reseñas y reputación en un mismo flujo puede reducir la fragmentación de información y aportar más contexto antes de que una persona decida explorar, guardar o evaluar un videojuego.

---

## 3. Alcance académico

El documento de definición establece dos hitos principales:

- **M1 - Semana 5:** Problem Statement + Figma de las pantallas + prototipo estático navegable y despliegue.
- **M2 - Semana 10:** frontend React funcional con datos simulados, componentes reutilizables, rutas y defensa de arquitectura.

Las etapas posteriores de integración con APIs, reputación, moderación, pruebas y cierre funcionan como planificación interna y deben adaptarse al cronograma definitivo de la asignatura.

---

## 4. Roles del sistema

| Rol | Capacidades principales |
| --- | --- |
| **Usuario** | Buscar, filtrar, consultar juegos, puntuar, reseñar, votar utilidad, reportar contenido y gestionar biblioteca/favoritos. |
| **Crítico** | Incluye las capacidades del usuario y añade críticas profesionales estructuradas: contexto de juego, ocho criterios de evaluación, análisis editorial, transparencia y perfil verificado. |
| **Administrador** | Gestiona catálogo, cuentas, roles, verificación de críticos, estados, reportes y métricas administrativas. |

### Regla de permisos

Las acciones sensibles no deben depender únicamente de que un botón esté oculto en la interfaz. En una versión con backend real, cada operación debe validarse también del lado del servidor.

Para M1/M2, donde se permite el uso de datos simulados, los permisos se representan mediante mocks y lógica de interfaz.

---

## 5. Flujos end-to-end principales

### 5.1 Descubrimiento

`Inicio -> Explorar/Buscar -> Filtrar/Ordenar -> Resultados -> Detalle del videojuego`

El usuario debe poder encontrar un juego, reducir resultados y llegar a una ficha completa sin abandonar el flujo principal.

### 5.2 Reseñas

`Login -> Detalle del juego -> Crear/Editar reseña -> Publicar -> Reseña visible en juego y perfil`

La publicación debe validar campos obligatorios y mostrar retroalimentación cuando falte información.

### 5.3 Reputación y moderación

`Actividad del usuario -> Señales de reputación -> Interpretación de reseña -> Reporte -> Revisión administrativa -> Resolución`

La reputación aporta contexto. No debe mostrarse como una medida absoluta de verdad.

---

## 6. Requisitos funcionales resumidos

El documento define 20 requisitos funcionales:

| ID | Función |
| --- | --- |
| RF-01 | Registro de cuenta. |
| RF-02 | Inicio y cierre de sesión. |
| RF-03 | Roles y permisos. |
| RF-04 | Catálogo navegable. |
| RF-05 | Búsqueda por texto. |
| RF-06 | Filtros por género, plataforma, año y nota. |
| RF-07 | Ordenamiento por popularidad, lanzamiento o puntuación. |
| RF-08 | Ficha individual de videojuego. |
| RF-09 | Valoración por usuarios registrados. |
| RF-10 | Crear, editar y consultar reseñas. |
| RF-11 | Votar utilidad de una reseña. |
| RF-12 | Calcular y mostrar reputación. |
| RF-13 | Biblioteca: favoritos, wishlist, jugados y pendientes. |
| RF-14 | Perfiles/análisis de críticos verificados. |
| RF-15 | Reportar contenido. |
| RF-16 | Moderación administrativa. |
| RF-17 | Gestión de usuarios, roles y críticos. |
| RF-18 | Gestión administrativa de juegos. |
| RF-19 | Dashboard con métricas y accesos rápidos. |
| RF-20 | Enlaces externos autorizados cuando estén disponibles. |

---

## 7. Requisitos no funcionales

El proyecto debe conservar:

- navegación consistente y feedback visual;
- adaptación responsive;
- contraste y foco visible;
- paginación y consultas bajo demanda;
- separación entre componentes, datos y servicios;
- ausencia de secretos sensibles en repositorios públicos;
- despliegue compatible con GitHub Pages para M1/M2;
- uso de APIs autorizadas en vez de scraping;
- trazabilidad en moderación y reportes.

---

## 8. Inventario de pantallas

El alcance académico define **14 pantallas funcionales**. El ZIP incluye **15 archivos PNG**, porque existen composiciones/referencias administrativas adicionales que agrupan varias vistas.

| # | Pantalla oficial | Archivo de referencia encontrado |
| --- | --- | --- |
| 01 | Home / Discover | `PagPrincipal.png` |
| 02 | Login | `InicioSesion.png` |
| 03 | Registro | `RegistroSesion.png` |
| 04 | Explorar Juegos | `Explorador.png` |
| 05 | Resultados de Búsqueda | `ResultadoBusqueda.png` |
| 06 | Detalle del Videojuego | `VisionDeUnJuego.png` |
| 07 | Crear / Editar Reseña | `EscribirRese#U00f1a.png` |
| 08 | Perfil de Usuario | `PerfilUsuario.png` |
| 09 | Biblioteca / Favoritos | `BibliotecaUsuario.png` |
| 10 | Perfil de Crítico | `PerfilCritico.png` |
| 11 | Dashboard Administrador | `PanelAdministrador.png` |
| 12 | Gestión de Videojuegos | `GestionVideojuegos.png` |
| 13 | Gestión de Usuarios y Críticos | incluida en `ComplementoDashBoard.png` y como referencia en `DashBoard.png` |
| 14 | Gestión de Reportes | `GestionReportes.png` |

### Archivos administrativos complementarios

- `DashBoard.png`: lámina que reúne Dashboard, Gestión de Videojuegos y Gestión de Usuarios/Críticos.
- `ComplementoDashBoard.png`: segunda composición administrativa con las mismas familias de vistas.

Estas composiciones son útiles como evidencia visual, pero no deben contarse como funcionalidades nuevas fuera de las 14 pantallas oficiales.

---

## 9. Observaciones de consistencia visual encontradas

Durante la revisión del material se detectaron algunos puntos que conviene normalizar antes de la entrega final:

1. El documento y las pantallas públicas usan **GameHive** como nombre del proyecto.
2. Algunas referencias administrativas muestran **GameHub**. Para la entrega debe unificarse todo a **GameHive**.
3. Existen dos composiciones administrativas con pequeñas diferencias de cifras, nombres y estructura. Conviene escoger una versión como fuente final y usar la otra únicamente como referencia de diseño.
4. La pantalla de Gestión de Usuarios y Críticos está incluida dentro de composiciones, pero sería recomendable exportarla también como PNG independiente si el docente espera una evidencia por pantalla.
5. El nombre de archivo `EscribirRese#U00f1a.png` parece provenir de una codificación de la letra `ñ`. Es recomendable renombrarlo a `EscribirResena.png` o `EscribirReseña.png` antes de publicarlo en el repositorio.

---

## 10. Arquitectura de datos

GameHive separa dos clases de información.

### 10.1 Datos externos

Responsabilidad de una API de videojuegos:

- nombre;
- portada e imágenes;
- descripción;
- géneros;
- plataformas;
- fecha de lanzamiento;
- desarrollador/editor;
- metadatos públicos disponibles.

### 10.2 Datos internos

Responsabilidad de GameHive:

- usuarios;
- roles;
- reseñas;
- valoraciones;
- votos de utilidad;
- biblioteca/favoritos;
- reputación;
- perfiles de críticos;
- reportes;
- estados y resoluciones administrativas.

### 10.3 Modelo conceptual previsto

Entidades sugeridas:

- `users`
- `roles`
- `games`
- `reviews`
- `review_votes`
- `user_games`
- `reports`
- `critic_profiles`

En una fase con persistencia real, estas entidades pueden representarse en SQL. Para M1/M2 pueden modelarse con JSON/JavaScript local.

---

## 11. Autenticación y permisos simulados con JSON

Para una demostración académica sin backend se incluye:

`data/mock-users.json`

El archivo contiene tres cuentas de ejemplo:

| Rol | Correo | Contraseña de demostración |
| --- | --- | --- |
| Usuario | `user@gamehive.local` | `UserDemo123!` |
| Crítico | `critic@gamehive.local` | `CriticDemo123!` |
| Administrador | `admin@gamehive.local` | `AdminDemo123!` |

> **Importante:** estas son credenciales públicas de demostración y no deben reutilizarse en producción. El JSON incluido guarda `salt` + hash SHA-256 en vez de la contraseña en texto plano; aun así, la autenticación ocurre en el navegador y por tanto es solo una simulación académica. Producción requiere hashing resistente en servidor, manejo de sesión y autorización backend.

### Ejemplo de lógica de demo

1. El formulario recibe correo y contraseña.
2. El frontend carga los usuarios simulados.
3. Busca el correo y calcula `SHA-256(salt + contraseña)` con Web Crypto.
4. Si el hash coincide y `status === "active"`, crea una sesión simulada en `sessionStorage`.
5. El campo `role` controla las rutas y acciones disponibles.
6. Al cerrar sesión se elimina el estado local.

Para evitar confundir una demo con seguridad real, no se recomienda presentar `localStorage` como solución de autenticación de producción.

---


## 11.1 Flujo ampliado del rol Crítico

La versión actual diferencia de forma explícita una **reseña comunitaria** de una **crítica profesional**. Un usuario normal publica una nota, título y opinión libre; una cuenta con rol `critic` accede desde el mismo botón de reseña a un formulario estructurado con mayor exigencia.

La crítica profesional registra:

- plataforma analizada, horas jugadas y estado de finalización;
- ocho puntuaciones: jugabilidad, narrativa, arte, sonido, rendimiento, accesibilidad, contenido y relación calidad/precio;
- promedio calculado y puntuación editorial final;
- problemas técnicos observados;
- opciones de accesibilidad verificadas;
- resumen editorial y análisis extenso;
- fortalezas y aspectos por mejorar;
- público recomendado;
- declaración de copia proporcionada por publisher/desarrollador;
- justificación cuando la puntuación editorial se aleja significativamente del promedio calculado.

Las críticas profesionales se guardan en `localStorage` dentro de la misma colección de reseñas, incorporando un objeto `criticAnalysis`. `ReviewCard` detecta ese objeto y habilita un desglose expandible con criterios y contexto.

### Solicitud para convertirse en crítico

Los usuarios normales disponen de **Solicitar rol de crítico** desde su perfil. El formulario recoge experiencia, años, géneros dominados, referencias previas, una crítica de muestra y motivación. Las solicitudes se guardan localmente bajo `gamehive.community.criticApplications`.

El administrador puede revisarlas desde **Administración → Usuarios y críticos**, consultar la muestra y aprobar o rechazar. Al aprobar en esta demostración se crea un override local de rol; el usuario debe cerrar sesión y volver a ingresar para cargar `role: critic` y `verifiedCritic: true`.

Este mecanismo es deliberadamente de demostración. En producción, la aprobación y los permisos deben persistirse y validarse en backend.

## 12. Estrategia de APIs

### Principal candidata: RAWG

RAWG se plantea como fuente principal para validar:

- catálogo;
- búsqueda;
- filtros;
- plataformas;
- géneros;
- fechas;
- imágenes;
- metadatos de detalle.

### Complementarias

- **OpenCritic:** posible referencia de crítica profesional, sujeto a disponibilidad y condiciones de acceso.
- **Steam Web API / Steamworks:** información específica del ecosistema Steam, no catálogo multiplataforma principal.
- **itch.io API:** integración opcional para componentes relacionados con su ecosistema.
- **IGDB:** alternativa técnica rica, pero requiere autenticación Twitch/OAuth y una arquitectura compatible con sus restricciones.

### Política de integración

- no scraping como base del sistema;
- no guardar claves privadas en el repositorio;
- no bloquear M1/M2 por dependencia de un servicio externo;
- mantener mocks como respaldo;
- consultar APIs bajo demanda;
- separar la capa de datos de los componentes visuales.

---

## 13. Riesgo de credenciales en GitHub Pages

GitHub Pages publica contenido estático. Todo secreto incluido en JavaScript, variables empaquetadas o archivos enviados al navegador puede ser inspeccionado.

Por eso:

- M1/M2 deben funcionar con mocks cuando una integración requiera una clave sensible;
- una clave pública diseñada por un proveedor para frontend debe tratarse de acuerdo con sus términos;
- una clave realmente secreta exige un backend, proxy seguro, función serverless u otra capa que no la exponga al navegador;
- `.env` debe añadirse a `.gitignore` cuando contenga secretos locales.

---

## 14. Arquitectura frontend prevista

La definición del proyecto propone una organización similar a:

```text
src/
├── components/
│   ├── Navbar/
│   ├── AdminSidebar/
│   ├── GameCard/
│   ├── ReviewCard/
│   ├── SearchBar/
│   ├── FilterPanel/
│   ├── Rating/
│   ├── StatusBadge/
│   ├── EmptyState/
│   ├── Pagination/
│   └── StatCard/
├── pages/
│   ├── Home/
│   ├── Explore/
│   ├── SearchResults/
│   ├── GameDetail/
│   ├── Login/
│   ├── Register/
│   ├── Profile/
│   ├── Library/
│   ├── CriticProfile/
│   ├── AdminDashboard/
│   ├── AdminGames/
│   ├── AdminUsers/
│   └── AdminReports/
├── data/
├── services/
├── hooks/
├── utils/
└── App.jsx
```

### Decisiones de componentización

- `GameCard` puede reutilizarse en Home, Explorador, Resultados y Biblioteca.
- `ReviewCard` concentra autor, puntuación, reputación y contenido.
- `FilterPanel` administra filtros sin duplicar el conjunto original de datos.
- `StatusBadge` representa estados con texto y color.
- `AdminSidebar` y `AdminTable` reducen repetición en administración.
- `services/` desacopla la UI de RAWG, mocks o futuras fuentes.

---

## 15. Estructura recomendada del repositorio

El paquete actual puede evolucionar a:

```text
GameHive/
├── README.md
├── GUIA_GIT_GITHUB.md
├── .gitignore
├── docs/
│   └── GameHive_Definicion_Proyecto_Investigacion.docx
├── mockups/
│   ├── public/
│   └── admin/
├── data/
│   └── mock-users.json
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── data/
│   ├── services/
│   ├── hooks/
│   └── utils/
├── package.json
└── vite.config.js
```

No es obligatorio reorganizar el ZIP inmediatamente. Esta estructura funciona como objetivo cuando comience la implementación.

---

## 16. Estado de ejecución del ZIP recibido

### Lo que sí puede revisarse ahora

- documento de investigación y alcance;
- mockups de pantallas;
- flujos y requisitos;
- estrategia de datos;
- estrategia de APIs;
- cronograma y criterios de prueba.

### Lo que ya puede ejecutarse

El paquete incorpora `index.html`, `src/`, `package.json`, configuración de Vite, datos JSON y workflow de GitHub Pages. Puede instalarse y ejecutarse como frontend React.

### Lo que sigue fuera del alcance de este ZIP

- backend seguro de autenticación;
- base de datos SQL persistente;
- secretos privados almacenados en servidor;
- integración OpenCritic de lectura sin un acceso oficial documentado para este caso.

---

## 17. Ejecución del frontend React

Si se utiliza React con Vite, el flujo habitual será:

```bash
npm install
npm run dev
```

Para construir la versión de producción:

```bash
npm run build
```

Para revisar localmente el build:

```bash
npm run preview
```

Estos comandos corresponden al `package.json` incluido en este paquete. La primera instalación genera `package-lock.json`, que conviene versionar después de validar la instalación en el equipo del grupo.

---

## 18. Plan de implementación por etapas

### Etapa A - Baseline documental

- consolidar nombre GameHive;
- almacenar documento de definición;
- versionar mockups;
- registrar requisitos y pantallas;
- crear README y guía Git.

### Etapa B - Prototipo estático M1

- navegación entre pantallas;
- layout base;
- datos estáticos;
- formularios visuales;
- estados vacíos y de error;
- despliegue en GitHub Pages.

### Etapa C - Migración a React M2

- crear rutas;
- extraer componentes reutilizables;
- mover datos a mocks;
- implementar filtros y estado de página;
- implementar login simulado por rol;
- implementar reseñas comunitarias y críticas profesionales simuladas;
- implementar biblioteca;
- implementar panel administrativo.

### Etapa D - Validación de API

- probar búsquedas reales;
- revisar campos disponibles;
- manejar resultados parciales;
- manejar errores/caídas;
- medir si RAWG cubre Home, Explorar, Resultados y Detalle;
- mantener fallback con mocks.

### Etapa E - Persistencia real, si el curso la exige

- diseñar base SQL;
- implementar backend;
- aplicar hashing de contraseña;
- autenticar sesiones/tokens;
- validar autorización en servidor;
- migrar reseñas, usuarios, biblioteca y reportes.

---

## 19. Reputación

La propuesta conceptual usa una escala de 0 a 100 basada en señales simples:

- antigüedad;
- contribuciones;
- reseñas publicadas;
- votos útiles;
- actividad consistente;
- penalizaciones por reportes confirmados.

Interpretación propuesta:

- **0-39:** cuenta nueva o reputación baja;
- **40-69:** reputación media;
- **70-100:** reputación alta por actividad/utilidad sostenida.

El número debe acompañarse de contexto y nunca presentarse como una certificación de que una opinión es verdadera.

---

## 20. Estados de moderación

| Estado | Significado |
| --- | --- |
| Pendiente | El reporte todavía no ha sido revisado. |
| Aprobado | El reporte se considera válido y requiere la acción correspondiente. |
| Rechazado | No se encontró incumplimiento. |
| Eliminado | El contenido fue removido conservando trazabilidad administrativa. |

---

## 21. Pruebas funcionales mínimas

| ID | Caso | Resultado esperado |
| --- | --- | --- |
| T-01 | Buscar "Elden Ring" | Se muestran coincidencias y se puede abrir el detalle. |
| T-02 | Aplicar género + plataforma + año | Se respetan todos los filtros activos. |
| T-03 | Buscar texto inexistente | Aparece un Empty State recuperable. |
| T-04 | Publicar reseña válida | La reseña se refleja en juego y perfil. |
| T-05 | Publicar reseña incompleta | Se bloquea la publicación y se indican errores. |
| T-06 | Cambiar estado de biblioteca | El juego aparece en la categoría adecuada. |
| T-07 | Usuario intenta función admin | La acción queda bloqueada/no disponible. |
| T-08 | Admin resuelve reporte | Cambia el estado y queda registrada la resolución. |
| T-09 | Admin cambia rol/verifica crítico | El perfil refleja el estado actualizado. |
| T-10 | Falla la API | La UI informa el error sin romper la aplicación. |

---

## 22. Accesibilidad

Criterios mínimos:

- contraste suficiente;
- foco visible;
- navegación por teclado;
- labels explícitos;
- mensajes de error comprensibles;
- texto alternativo donde corresponda;
- botones con nombre de acción;
- icono + texto para estados;
- no depender únicamente de rojo/verde.

---

## 23. Seguridad y privacidad

### En la demo

- usar únicamente datos ficticios;
- no incluir correos o contraseñas reales;
- no subir claves privadas;
- no presentar el JSON local como una base de datos segura.

### En producción

- password hashing con un algoritmo apropiado;
- autorización del lado servidor;
- validación de entradas;
- sesiones/tokens seguros;
- rate limiting donde corresponda;
- registro de acciones administrativas;
- mínimo de datos personales necesarios.

---

## 24. Uso de Inteligencia Artificial en el proyecto

La IA se utilizó como **herramienta de apoyo**, no como sustituto de la toma de decisiones del equipo.

### Usos realizados o apropiados para documentar

1. **Estructuración del problema:** organización del concepto de GameHive, objetivos, alcance y diferenciadores.
2. **Análisis de requisitos:** apoyo para convertir ideas generales en requisitos funcionales/no funcionales e historias de usuario.
3. **Arquitectura de información:** propuesta de relaciones entre Home, exploración, resultados, detalle, perfiles y administración.
4. **Revisión de consistencia:** detección de elementos que conviene unificar entre documento y mockups.
5. **Diseño técnico:** apoyo para separar datos externos, datos comunitarios, componentes React y servicios.
6. **Planificación de pruebas:** generación y refinamiento de escenarios funcionales y estados de error.
7. **Documentación:** elaboración y revisión de README, instrucciones Git y explicación de decisiones.
8. **Apoyo a prototipado:** formulación de ideas y criterios para pantallas, componentes y flujos visuales.

### Qué debe validar el equipo manualmente

- que las pantallas realmente cumplan los requisitos;
- que las APIs elegidas sigan disponibles y sus términos permitan el uso previsto;
- que el código compile y funcione;
- que los datos mostrados sean correctos;
- que no existan secretos en el repositorio;
- que cada integrante entienda y pueda defender las decisiones implementadas.

### Declaración sugerida para entrega

> Se utilizó Inteligencia Artificial como herramienta de apoyo para organizar requisitos, explorar alternativas de diseño, revisar consistencia, proponer estructuras técnicas y mejorar la documentación. Las decisiones finales, la selección del alcance, la validación del prototipo y la implementación son responsabilidad del equipo. El contenido generado con apoyo de IA fue revisado antes de incorporarse al proyecto.

Esta redacción es preferible a afirmar que la IA "hizo el proyecto", porque refleja su papel real como asistencia de análisis y documentación.

---

## 25. Riesgos identificados y solución propuesta

| Riesgo | Respuesta |
| --- | --- |
| Caída/cambio de API | Mantener mocks y desacoplar UI de la fuente externa. |
| Límites de solicitudes | Paginación, caché temporal y consultas bajo demanda. |
| Exposición de claves | No versionar secretos; usar arquitectura segura cuando sea necesaria. |
| Scope creep | Mantener los tres flujos principales como criterio de prioridad. |
| Datos duplicados entre proveedores | Guardar identificador externo + proveedor. |
| Manipulación de reputación | Reglas transparentes y moderación. |
| Restricciones de imágenes/datos | Respetar términos y atribuciones. |
| Inconsistencia de diseño | Mantener sistema visual y componentes compartidos. |

---

## 26. Criterio de terminado

Una funcionalidad puede considerarse terminada cuando:

- tiene pantalla y flujo definidos;
- posee estado normal, vacío y de error cuando aplica;
- identifica la fuente de sus datos;
- respeta el rol del usuario;
- funciona en el entorno de despliegue acordado;
- existe al menos un caso de prueba que demuestra el resultado esperado.

---

## 27. Roadmap resumido

```text
Problema e investigación
        ↓
Requisitos y arquitectura de información
        ↓
Figma / mockups
        ↓
M1: prototipo estático navegable
        ↓
Arquitectura React + mocks
        ↓
M2: frontend funcional
        ↓
Validación de API
        ↓
Reputación / moderación
        ↓
Pruebas / accesibilidad
        ↓
Correcciones y cierre
```

---

## 28. Flujo Git del equipo

La estrategia completa de repositorio, ramas, commits, Pull Requests, etiquetas M1/M2 y manejo correcto de fechas se encuentra en:

[`GUIA_GIT_GITHUB.md`](./GUIA_GIT_GITHUB.md)

---

## 29. Archivos principales del paquete

- `GameHive_Definicion_Proyecto_Investigacion.docx`: documento rector del alcance.
- `PagPrincipal.png`: Home / Discover.
- `InicioSesion.png`: inicio de sesión.
- `RegistroSesion.png`: registro.
- `Explorador.png`: catálogo y filtros.
- `ResultadoBusqueda.png`: resultados.
- `VisionDeUnJuego.png`: detalle de videojuego.
- `EscribirRese#U00f1a.png`: creación de reseña.
- `PerfilUsuario.png`: perfil de usuario.
- `BibliotecaUsuario.png`: biblioteca personal.
- `PerfilCritico.png`: perfil de crítico.
- `PanelAdministrador.png`: dashboard administrativo.
- `GestionVideojuegos.png`: administración de catálogo.
- `GestionReportes.png`: moderación de reportes.
- `DashBoard.png` y `ComplementoDashBoard.png`: composiciones/referencias administrativas.
- `data/mock-users.json`: usuarios locales para demostración.

---

## 30. Referencias técnicas definidas en el proyecto

- RAWG API: catálogo, búsqueda y metadatos.
- Steamworks / IStoreService: datos del ecosistema Steam.
- itch.io API: integración oficial de itch.io.
- IGDB API: alternativa de catálogo con Twitch OAuth.
- OpenCritic: referencia de recepción crítica, sujeta a condiciones de acceso vigentes.

Antes de implementar una integración real, se deben volver a revisar sus términos, autenticación, límites y políticas actuales.

---

## 31. Próxima acción recomendada

Con el material actual, el siguiente paso técnico defendible es crear un **baseline del repositorio**, conservar todos los mockups y documentación, implementar el prototipo estático M1 y después migrarlo de forma incremental a React para M2.

La progresión propuesta para Git está documentada en `GUIA_GIT_GITHUB.md` para que cada commit corresponda a un cambio real, pequeño y explicable.

---

## 28. Implementación React incorporada (actualización 23/09/2026)

El paquete ahora incluye una implementación ejecutable en **React + Vite** construida desde cero a partir de las referencias visuales. Los PNG originales permanecen como documentación visual y **no se usan como fondos ni páginas superpuestas**.

### Pantallas implementadas

- Inicio / Discover.
- Login y Registro.
- Explorar y Resultados de búsqueda.
- Detalle del videojuego.
- Crear reseña.
- Perfil de usuario.
- Biblioteca.
- Perfil de crítico.
- Dashboard administrador.
- Gestión de videojuegos.
- Gestión de usuarios y críticos.
- Gestión de reportes.

### Ejecutar

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
npm run preview
```

### Cuentas de demo

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Usuario | `user@gamehive.local` | `UserDemo123!` |
| Crítico | `critic@gamehive.local` | `CriticDemo123!` |
| Administrador | `admin@gamehive.local` | `AdminDemo123!` |

Las contraseñas **no están almacenadas en texto plano dentro del JSON**. `src/data/users.json` conserva un `salt` y un hash SHA-256 de cada contraseña de demostración. El formulario calcula el hash con Web Crypto antes de comparar. Esto mejora la higiene del repositorio, pero **no convierte un frontend estático en un sistema de autenticación seguro**. Un usuario con acceso al código cliente puede inspeccionar y manipular el estado. Producción requiere backend, hashing de contraseña resistente (Argon2id/bcrypt/scrypt), sesión segura y autorización del lado servidor.

### JSON configurables

- `src/data/app-config.json`: banderas funcionales, proveedor, estados y reglas de reputación.
- `src/data/users.json`: usuarios seed y roles de la demostración.
- `src/data/games.json`: catálogo de respaldo.
- `src/data/community.json`: reseñas, actividad, reportes y biblioteca inicial.

Las operaciones realizadas durante la demo se mezclan con estos datos seed usando `localStorage`; la sesión de autenticación y la key RAWG usan `sessionStorage`.

### RAWG

La app funciona sin API. Desde el icono de llave en la barra superior se puede introducir una **RAWG API key solo para la sesión actual**. La key no se escribe en archivos del proyecto. Cuando está disponible, la búsqueda consulta RAWG y muestra su fuente; si la API falla, la interfaz vuelve al JSON local.

> En GitHub Pages no existe una forma de ocultar un secreto dentro del JavaScript del navegador. No subas una key privada al repositorio ni la empaquetes creyendo que `.env` la hace secreta. `VITE_*` termina en el bundle del frontend.

### GitHub Pages

`vite.config.js` detecta `GITHUB_REPOSITORY` durante GitHub Actions y configura automáticamente la base `/<REPO>/`. La navegación usa `HashRouter`, por lo que las rutas internas funcionan en hosting estático sin reglas de rewrite.

Workflow incluido: `.github/workflows/deploy.yml`.

En GitHub:

1. Sube el proyecto a `main`.
2. Ve a **Settings > Pages**.
3. Selecciona **GitHub Actions** como fuente.
4. El workflow compila `dist` y publica el sitio.
