# fletx challenge

Este es mi desarrollo para la [prueba de fletx](https://fullstack-test-nu.vercel.app/), en la que se solicitaba diseñar un sistema de **autenticación y autorización** para acceder a una web app con entidades sobre las cuales se pueden realizar operaciones CRUD.

---

## 🔐 Flujo de autenticación

Para este desafío, se propuso un flujo de autenticación basado en **Magic Link**, un mecanismo passwordless que permite a los usuarios iniciar sesión mediante un enlace enviado a su correo electrónico.

```plaintext
[Usuario] 
   │
   ▼
Ingresa su email 📨
   │
   ▼
POST /auth/magic_link_request
   │
   ▼
📧 Backend genera y envía Magic Link
   │
   ▼
🔗 Usuario hace clic en el enlace
   │
   ▼
POST /auth/magic-login?token=...
   │
   ▼
✅ Backend valida el token y responde con un JWT
   │
   ▼
🧠 Frontend guarda el JWT en sessionStorage
   │
   ▼
🎉 Usuario autenticado
   │
   ▼
🔐 Frontend hace peticiones con:
Authorization: Bearer <jwt>
   │
   ▼
🔓 Backend valida el token y responde
   │
   ▼
🚪 Logout → sessionStorage.removeItem("jwt")
```

El Magic Link tiene un tiempo de expiración. Si el usuario no hace clic antes de ese límite, el token se invalida.

Es de uso único. Si ya fue utilizado o si el usuario ya está autenticado, el token es rechazado.

## 🔒 Autorización

La autorización se basa en un sistema de roles y features.
Cada usuario tiene un rol, y cada rol define una lista de funcionalidades (features) a las que tiene acceso. Estas features se usan para evaluar políticas de acceso en los controladores de los recursos protegidos.

La versión desplegada incluye dos roles por defecto:

- `admin`: acceso completo a todas las funcionalidades.
- `visitor`: acceso limitado, solo lectura.

Actualmente hay dos formas en que un usuario nuevo accede al sistema:

- ingresando por si mismo, en cuyo caso el rol por defecto es `visitor`.
- siendo invitado por un admin, en cuyo caso el rol será el que el admin elija.

siempre será posible cambiar el rol de un usuario en cualquier momento, es uno de los features del admin.

## El frontend

La interfaz está desarrollada como una Single Page Application (SPA) usando:

- React.ts
- Vite
- React Router
- React Context (para manejo de roles y features)

Características clave:

- Realiza peticiones autenticadas usando el JWT.
- Muestra mensajes de error cuando el usuario intenta acceder a acciones no permitidas.
- Gestiona el JWT completamente del lado del cliente, almacenándolo en sessionStorage.

---

## 📚 Más información

➡️ [Detalles de despliegue del backend](./backend/README.md)

➡️ [Detalles de despliegue del frontend](./frontend/README.md)

➡️ [Documentación de la API](https://fletx-challenge.fly.dev/api/v1/docs/index.html)

➡️ [App desplegada](https://fletx-challenge.vercel.app/companies)

---

Probando el entorno preview despleado:

como el correo del remitente que se está usando no está registrado como correo corporativo (es simplemente gmail) está tardando en exceso el envío por filtros spam. en este video utilizamos un servicio de correo temporal que nos entrega una dirección de correo aleatoria y es con la que haremos las veces de usuario, eñ servicio utilizado es https://temp-mail.org/es

probando el flujo de inicio de sesion:

https://www.loom.com/share/8179c38f07c042ed8506203f3c9837c5?sid=fe7776ae-97de-44db-80c3-d6c7520c1205

