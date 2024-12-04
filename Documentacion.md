# Documentación General del Proyecto
## Pokemon Team Builder

### Descripción General:
Este proyecto es una aplicación web diseñada para que los usuarios puedan registrarse, iniciar sesión y construir su equipo Pokémon favorito. Utiliza **React** junto con **Formik** y **Yup** para gestionar formularios, mientras que **Firebase** se encarga de la autenticación de usuarios. Además, se integra la **PokeAPI** para obtener información de los Pokémon, permitiendo a los usuarios filtrar, paginar y ver detalles específicos.


### Objetivos del Proyecto:
- Crear una plataforma interactiva para construir equipos Pokémon.
- Implementar una autenticación segura mediante Firebase.
- Integrar datos de la PokeAPI y manejar la comunicación asíncrona.


### Integración de la API y Comunicación Asíncrona:

#### Uso de la PokeAPI:
- **Endpoint principal:** `https://pokeapi.co/api/v2/pokemon?limit=150`
- Se obtienen los primeros 150 Pokémon. Luego, para cada uno, se acceden a detalles individuales como tipo, peso e imágenes a través de la URL proporcionada en cada respuesta.

#### Metodología:
- La aplicación usa `fetch` para obtener datos de la PokeAPI de manera asíncrona.
- Se emplea `Promise.all` para combinar múltiples llamadas y asegurar que todos los datos necesarios se obtengan antes de renderizar la lista.


### Desafíos Superados Durante el Desarrollo:

#### 1. Autenticación con Firebase:
- **Desafío:** Configurar la autenticación y gestionar el estado del usuario.
- **Solución:** Implementé Firebase Authentication y creé un contexto (UserContext) para proporcionar acceso global al estado del usuario autenticado.

#### 2. Manejo de Contextos en React:
- **Desafío:** Compartir el estado del usuario entre múltiples componentes.
- **Solución:** Desarrollé un contexto personalizado para gestionar y actualizar la información del usuario en toda la aplicación.

#### 3. Integración de la PokeAPI:
- **Desafío:** Comprender la estructura de la API y manejar la paginación y filtrado.
- **Solución:** Estudié la documentación de la API y realicé pruebas con `console.log` para entender los datos. Se aplicaron filtros personalizados y se implementó manejo de errores adecuado.


### Documentación de las Funciones por Archivo:

#### 1. `ContactForm.jsx`:
- **Descripción:** Formulario para que los usuarios envíen mensajes.
    - **`initialValues`**: Define valores iniciales para los campos.
    - **`validationSchema`**: Valida el formulario (correo, asunto, descripción, aceptación de términos).
    - **`handleSubmit`**: Envía los datos del formulario, muestra una alerta con SweetAlert y resetea el formulario.

#### 2. `LoginForm.jsx`:
- **Descripción:** Formulario de inicio de sesión.
    - **`useEffect`**: Redirige al perfil si el usuario ya está autenticado.
    - **`handleSubmit`**: Inicia sesión usando Firebase, guarda el usuario en el contexto y redirige al perfil. Maneja alertas de éxito o error.

#### 3. `Navbar.jsx`:
- **Descripción:** Barra de navegación dinámica según el estado del usuario.
    - **`handleLogout`**: Cierra la sesión del usuario usando Firebase.

#### 4. `RegisterForm.jsx`:
- **Descripción:** Formulario de registro.
    - **`handleSubmit`**: Registra al usuario con Firebase, actualiza el contexto y maneja alertas.

#### 5. `UserContext.jsx`:
- **Descripción:** Contexto global para gestionar el estado del usuario.
    - **`UserProvider`**: Proporciona el estado del usuario a los componentes. Usa `onAuthStateChanged` de Firebase para escuchar cambios en la autenticación.

#### 6. `Home.jsx`:
- **Descripción:** Página principal que muestra la lista de Pokémon con opciones de filtrado y paginación.
    - **`fetchPokemons`**: Recupera la lista de Pokémon de manera asíncrona, incluyendo detalles específicos.
    - **`applyFilters`**: Filtra Pokémon por nombre, tipo y peso.  