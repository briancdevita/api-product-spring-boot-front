# API Product Management

Esta es una aplicación de gestión de productos construida con [Next.js](https://nextjs.org), [React](https://reactjs.org), [Material-UI](https://mui.com/), y [React Query](https://react-query.tanstack.com/).


## Estructura del Proyecto

```plaintext
├── .gitignore               # Archivos y carpetas ignorados por Git
├── .next/                   # Archivos generados automáticamente por Next.js
├── eslint.config.mjs        # Configuración de ESLint
├── next-env.d.ts            # Declaraciones de tipos de Next.js
├── next.config.ts           # Configuración de Next.js
├── package.json             # Dependencias y scripts del proyecto
├── public/                  # Archivos estáticos (imágenes, fuentes, etc.)
├── README.md                # Documentación del proyecto
├── tsconfig.json            # Configuración de TypeScript
├── src/                     # Código fuente del proyecto
│   ├── app/                 # Páginas y layouts principales
│   │   ├── api/             # Rutas API de Next.js
│   │   ├── context/         # Contextos globales (e.g., autenticación)
│   │   ├── helper/          # Funciones auxiliares reutilizables
│   │   ├── login/           # Páginas y componentes relacionados con el login
│   │   ├── page.module.css  # Estilos locales para `page.tsx`
│   │   ├── page.tsx         # Página principal del proyecto
│   │   ├── layout.tsx       # Layout raíz de la aplicación
│   │   ├── globals.css      # Estilos globales de la aplicación
│   ├── components/          # Componentes reutilizables (e.g., tablas, botones)
│   ├── hooks/               # Hooks personalizados
│   ├── lib/                 # Configuración de Axios, React Query, etc.
│   ├── styles/              # Estilos centralizados y temas de MUI
│   ├── types/               # Tipos y modelos de TypeScript


## Instalación

Primero, clona el repositorio y navega al directorio del proyecto:

```bash
git clone <URL_DEL_REPOSITORIO>
cd api-product

Instala las dependencias:
npm install
# o
yarn install
# o
pnpm install

Scripts Disponibles
En el directorio del proyecto, puedes ejecutar:

npm run dev
Inicia el servidor de desarrollo.

Abre http://localhost:3000 para ver la aplicación en tu navegador.

npm run build
Construye la aplicación para producción en la carpeta .next.

npm start
Inicia el servidor en modo producción.

npm run lint
Ejecuta ESLint para encontrar y arreglar problemas en el código.

Configuración
Variables de Entorno
Asegúrate de configurar las variables de entorno necesarias en un archivo .env.

Configuración de ESLint
El archivo de configuración de ESLint se encuentra en eslint.config.mjs.

Configuración de Next.js
El archivo de configuración de Next.js se encuentra en next.config.ts.

Estructura de Código
app
Contiene las páginas y componentes principales de la aplicación.

components
Contiene los componentes reutilizables como Navbar, AuthGuard, ProductManagement, etc.

hooks
Contiene hooks personalizados como useAuth.

lib
Contiene funciones auxiliares y configuraciones como axiosInstance y queries.

styles
Contiene los estilos de la aplicación.

types
Contiene las definiciones de tipos TypeScript.

Autenticación
La autenticación se maneja mediante un contexto de React (AuthContext) que proporciona el estado de autenticación y funciones para iniciar y cerrar sesión.

Gestión de Productos
La gestión de productos incluye la capacidad de listar, crear, editar y eliminar productos. También se puede descargar un archivo CSV con la lista de productos.

API
La aplicación interactúa con una API backend para realizar operaciones CRUD en productos y categorías.

Contribuir
Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que te gustaría hacer.

Licencia
Este proyecto está licenciado bajo la Licencia MIT.

¡Gracias por usar nuestra aplicación de gestión de productos!
