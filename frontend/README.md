# React + TypeScript + Vite

## 📦 Instalación

el repositorio tiene un archivo `.nvmrc` que especifica la versión de node que se debe usar; si tienes instalado el gestor de versiones de node `nvm`, puedes usarlo para instalar la versión especificada, por ejemplo:

Asi se instalaria la version que el archivo `.nvmrc` especifica:

```bash
nvm install
```

y asi se seleccionaría la version que indica el archivo `.nvmrc`:

```bash
nvm use
```

con la version instalada, puedes instalar las dependencias con:

```bash
npm install --save-dev
```

necesitas setear una variable de archivo en un archivo `.env` para que el frontend pueda comunicarse con el backend, que es el base donde se levantó el backend:

```bash
VITE_API_URL=http://localhost:3000
```

levanta el servidor con:

```bash
npm run dev
```
