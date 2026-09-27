# GameHive — Ampliación del rol Crítico

Esta actualización separa la reseña comunitaria de la crítica profesional y añade un flujo demostrable de postulación, revisión y aprobación de críticos.

## Flujo del usuario normal

`Juego → Escribir reseña → Nota general + título + opinión → Publicar`

El usuario normal conserva una experiencia simple. No necesita completar el cuestionario profesional.

## Flujo del crítico

`Juego → Crear crítica → Contexto → 8 criterios → Técnica/accesibilidad → Argumento editorial → Veredicto → Publicar`

El formulario profesional solicita:

1. Plataforma analizada.
2. Horas jugadas.
3. Estado de finalización.
4. Jugabilidad.
5. Narrativa.
6. Arte y diseño.
7. Sonido y música.
8. Rendimiento técnico.
9. Accesibilidad.
10. Contenido y duración.
11. Relación calidad/precio.
12. Problemas técnicos observados.
13. Opciones de accesibilidad verificadas.
14. Resumen editorial.
15. Análisis completo.
16. Fortalezas y aspectos por mejorar.
17. Público recomendado.
18. Puntuación final.
19. Justificación de diferencias importantes frente al promedio calculado.
20. Declaración de copia gratuita/proporcionada.

Las críticas estructuradas incluyen un objeto `criticAnalysis` dentro de la reseña. Las tarjetas de crítica detectan ese objeto y permiten desplegar el desglose profesional.

## Solicitud para convertirse en crítico

Desde el perfil de una cuenta `user` aparece **Solicitar rol de crítico**. La solicitud recoge experiencia, años, géneros, trabajos previos, muestra escrita y motivación.

Ruta: `/#/critic/apply`

Persistencia demo: `localStorage`, clave `gamehive.community.criticApplications`.

## Revisión administrativa

En **Administración → Usuarios y críticos** aparece una tabla de solicitudes. El administrador puede:

- consultar la solicitud completa;
- leer la crítica de muestra;
- aprobar;
- rechazar.

Si se aprueba, la demo guarda un override de rol local. Al cerrar sesión y volver a entrar, la cuenta aprobada carga como `critic` y `verifiedCritic: true`.

## Archivos principales modificados

- `src/pages/ReviewEditorPage.jsx`
- `src/pages/CriticApplicationPage.jsx`
- `src/pages/CriticProfilePage.jsx`
- `src/pages/ProfilePage.jsx`
- `src/pages/AdminUsersPage.jsx`
- `src/components/ReviewCard.jsx`
- `src/services/communityService.js`
- `src/services/authService.js`
- `src/data/community.json`
- `src/data/users.json`
- `src/styles.css`
- `README.md`

## Prueba rápida sugerida

1. Iniciar con `user@gamehive.local` / `UserDemo123!`.
2. Ir a Perfil y abrir **Solicitar rol de crítico**.
3. Completar y enviar la solicitud.
4. Cerrar sesión.
5. Iniciar con `admin@gamehive.local` / `AdminDemo123!`.
6. Abrir **Administración → Usuarios y críticos**.
7. Revisar y aprobar la solicitud.
8. Cerrar sesión e iniciar de nuevo con la cuenta de usuario.
9. Abrir cualquier juego y pulsar **Crear crítica**.
10. Completar el formulario profesional y publicar.
11. Abrir la reseña publicada y desplegar **Ver desglose profesional**.

También puede probarse directamente el formulario profesional con `critic@gamehive.local` / `CriticDemo123!`.
