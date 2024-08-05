## Game Master AI

¡Bienvenido al repositorio de Game Master AI (o GmAi, para abreviar)!

GmAi es una aplicación web para crear historias jugando a juegos de rol de mesa dirigidos por inteligencia artificial.

**Pruébalo en:** https://gmai.rpg.ar

### ¿Cómo funciona?

1. **Crea tu personaje:** Inventa un nombre, genera una descripción con la ayuda de GmAi y asigna características usando puntos de experiencia (XP).
2. **Reúne tu equipo:** Puedes jugar con hasta 2 personajes en una historia.
3. **Elige tu aventura:** Dile a GmAi qué tipo de historia te gustaría vivir.
4. **Juega:** GmAi te presentará opciones para avanzar en la historia, pero también puedes proponer tus propias ideas.
5. **Supera las pruebas:** En momentos clave, GmAi te pedirá una prueba de característica (2d6 + característica) para determinar tu éxito o fracaso.

### Características del juego

- Creación de personajes con descripciones mejoradas por IA.
- Edición de personajes con XP ganado.
- Compartir personajes con amigos.
- Reclutamiento de hasta 2 personajes por historia.
- Selección de tipo de historia.
- Creación de botones de comandos personalizados para respuestas habituales a GmAi.
- Más de 20 temas de color para personalizar tu experiencia.
- Narración de la historia con voz generada por IA.
- Reconocimiento de voz para escribir respuestas.
- Botones de acción ("A", "B", "C") para elegir rápidamente entre opciones de historia.
- Botones en las fichas de personaje para realizar tiradas de dados.
- Guardar historias como libros en una biblioteca.
- Abrir, editar y compartir libros con amigos.
- Iniciar nuevas historias a partir de libros existentes.

### Sistema de juego

- **Pruebas de característica:** Tira 2d6 + característica para superar los desafíos de la historia.
- **Éxitos y fracasos:** Obtén éxitos con resultados de 10 o más (2 éxitos con 14 o más). Obtén fracasos con resultados menores a 10 (2 fracasos con 6 o menos).
- **Fin de la historia:** La historia termina después de 3 fallos o 5 éxitos.
- **Recompensas:** Gana XP al finalizar una historia (2XP +2XP adicionales con 4 o más éxitos).

### Instalación

**Requisitos:**

- Editor de código (por ejemplo, VSCode)
- Node.js
- API Key de Gemini AI de Google (obtén una en: https://aistudio.google.com/)
- Para guardar el progreso en la base de datos, se necesita un proyecto de Firebase (https://firebase.google.com/) con "Firestore Database" y "Authentication" mediante cuenta de Google.

**Pasos:**

1. Clona este repositorio.
2. Abre el proyecto en tu editor de código.
3. Configura las variables de entorno (ver más abajo).
4. Instala las dependencias: `npm install`
5. Compila la aplicación: `npm run build`
6. Ejecuta la aplicación: `npm run start`
7. Accede a la aplicación en tu navegador: http://localhost:3000/

**Variables de entorno:**

- **.env.local:**
  - `AI_APY_KEY="Tu API Key de Gemini AI"`
- **Para Firebase (en la configuración de tu proyecto como Web App):**
  - `FIREBASE_API_KEY=`
  - `FIREBASE_AUTH_DOMAIN=`
  - `FIREBASE_PROJECT_ID=`
  - `FIREBASE_STORAGE_BUCKET=`
  - `FIREBASE_MSG_SENDER_ID=`
  - `FIREBASE_APP_ID=`

### Futuro del proyecto

- **Modo multijugador cooperativo:** Crea historias con hasta 4 jugadores.
- **Generación de imágenes de personajes:** Visualiza tus personajes con la ayuda de GmAi.
- **Creación de vídeos a partir de libros:** Convierte tus historias en películas.
- **Plan de suscripción:** Accede a funciones ilimitadas y beneficios exclusivos.
- **Versión para Android:** Juega en cualquier lugar desde tu dispositivo móvil.

### RPG.ar

GmAi también formará parte de otros proyectos de RPG.ar:

- **Map:** Encuentra comunidades de juegos de rol, lugares y jugadores cerca de ti.
- **Lumashay:** Un sistema de juego de rol de mesa completo con mundo propio, potenciado por GmAi.

¡Únete a nosotros en esta aventura de juegos de rol impulsada por IA!
