# Backend

## Configuración

Este repositorio contiene un archivo .ruby-version para que puedas utilizar rbenv y aplicar automáticamente la versión de Ruby especificada.

Requisitos previos

Para ejecutar este proyecto necesitas:

- Ruby (versión especificada en .ruby-version)
- PostgreSQL

### Instalación de dependencias

Primero, instala y ejecuta PostgreSQL:

```bash
brew install postgresql
brew services start postgresql
```

Crea la base de datos y aplica las migraciones:

```bash
rails db:create
rails db:migrate
```

Inicia el servidor de desarrollo:

```bash
rails s
```

### Documentación de la API

Para generar la documentación de la API, siempre que se requiera actualizarla, ejecuta:

```bash
RAILS_ENV=test rake rswag:specs:swaggerize
```

La documentación se puede ver con el servidor de desarrollo corriendo en [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
