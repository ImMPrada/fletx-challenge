# Backend

## Configuración

Este repositorio contiene un archivo .ruby-version para que puedas utilizar rbenv y aplicar automáticamente la versión de Ruby especificada.

Requisitos previos

Para ejecutar este proyecto necesitas:

- Ruby (versión especificada en .ruby-version)
- PostgreSQL

### Instalación de dependencias

Primero, instala y ejecuta PostgreSQL; en macOS:

```bash
brew install postgresql
brew services start postgresql
```

Crea la base de datos y aplica las migraciones:

```bash
rails db:create
rails db:migrate
```

Crea los departamentos y ciudades:

```bash
bundle exec rake departments:create
```

Registra los roles y features:

```bash
bundle exec rake authorization:features:create
bundle exec rake authorization:roles:create
```

Estamos usando semillas para popular la base de datos con datos de ejemplos.

```bash
rails db:seed
```

requieres de un archivo `.env` para que el servidor pueda comunicarse con el frontend, que es el base donde se levantó el frontend:

```bash
FRONTEND_URL=http://localhost:5173
MAILER_FROM=im.mprada+fletx@gmail.com
```

Inicia el servidor de desarrollo:

```bash
rails s
```

Este proyecto tiene por estrategia de autenticación el uso de Magic Links. Para recibir un correo electrónico con un enlace para iniciar sesión, necesitamos mailcatcher ([para instalarlo](https://mailcatcher.me/)) ejecutando:

```bash
mailcatcher
```

En otra terminal inicializa el servidor de jobs:

```bash
bin/delayed_job run
```

### Documentación de la API

Para generar la documentación de la API, siempre que se requiera actualizarla, ejecuta:

```bash
RAILS_ENV=test rake rswag:specs:swaggerize
```

La documentación se puede ver con el servidor de desarrollo corriendo en [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
