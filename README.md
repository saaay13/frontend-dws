# Frontend - Store DWS

Este es el frontend para el proyecto **Store DWS**, construido con React y Vite.

## 🚀 Tecnologías Usadas

- **React 19**: Biblioteca principal para la interfaz de usuario.
- **Vite**: Herramienta de construcción y servidor de desarrollo ultra rápido.
- **TypeScript**: Para un desarrollo seguro con tipado estático.
- **Tailwind CSS 4**: Framework de CSS moderno para estilos rápidos y responsivos.
- **React Router Dom 7**: Gestión de la navegación y rutas de la aplicación.

### 🔌 Comunicación con la API
> [!IMPORTANT]
> **No se usa Axios.** La comunicación con el backend se realiza mediante la API nativa `fetch` de JavaScript, centralizada en `src/services/api.ts` para un manejo consistente de cabeceras y errores.

---

## 📂 Estructura del Proyecto

A continuación se detalla la organización de la carpeta `src/`, siguiendo los principios de **Atomic Design**:

```text
src/
├── assets/             # Recursos estáticos (imágenes, SVGs)
├── components/         # Componentes reutilizables
│   ├── atoms/          # Componentes mínimos (Button, Input, Card)
│   ├── molecules/      # Combinaciones de átomos
│   ├── organisms/      # Secciones complejas (Navbar)
│   └── templates/      # Estructuras de página (MainLayout)
├── context/            # Contextos de React para estado global
├── hooks/              # Lógica reutilizable y gestión de estado de React
│   └── useProducts.ts  # Hook para gestionar la lógica de productos
├── pages/              # Componentes de página (Rutas)
│   ├── DashboardPage.tsx
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   └── ProductsPage.tsx
├── services/           # Comunicación técnica con la API (Fetch)
│   ├── api.ts          # Configuración base de fetch
│   ├── auth.ts         # Servicios de autenticación
│   └── productService.ts # Servicios de productos
├── App.tsx             # Definición de rutas y layout principal
├── main.tsx            # Punto de entrada de la aplicación
├── index.css           # Estilos globales y configuración de Tailwind
└── App.css             # Estilos específicos de App (opcional)
```

---

## 🛠️ Instalación y Uso

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Correr en modo desarrollo:
   ```bash
   npm run dev
   ```

3. Construir para producción:
   ```bash
   npm run build
   ```
