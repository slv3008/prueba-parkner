# Prueba Parkner

## Instalación

Este proyecto requiere [Node.js](https://nodejs.org/) v18+ para correr.

Tiene dependencias de [pnpm](https://pnpm.io/) v6+.

Instalar las dependencias y devDependencies y correr el servidor.

```sh
pnpm install
```

Correr las migraciones de la base de datos

```sh
pnpm db:push
npx prisma db seed
```

## Requisitos

- [ ] Obtener credenciales de Discord para poder crear una cuenta.
- [ ] Actualizar archivo .env con las credenciales de Discord.
- [ ] En el archivo `server/api/routers/invitation.ts` agregar funcion para obtener todas las invitaciones.
- [ ] En el archivo `server/api/routers/invitation.ts` agregar funcion para agregar una nueva invitacion. El usuario que invita debe de ser el que esta registrado.
- [ ] En el archivo `server/api/routers/invitation.ts` agregar funcion para cancelar una invitacion.
- [ ] En el archivo `src/app/_components/InvitationTable.tsx` completar codigo para mostrar la lista de invitaciones.
- [ ] En el archivo `src/app/create/page.tsx` completar codigo para crear una nueva invitacion.
  - [ ] Utilizar libreria [react-hook-form](https://react-hook-form.com/) para validar los campos.
  - [ ] Utilizar tRPC para poder crear una invitacion.
  - [ ] Una vez que se crea la invitacion, redireccionar a la pagina de lista de invitaciones.
- [ ] En el archivo `src/app/_components/InvitationTable.tsx` completar codigo para cancelar una invitacion.
  - [ ] Utilizar tRPC para poder cancelar una invitacion.
  - [ ] Una vez que se cancela la invitacion, actualizar la lista de invitaciones.
- [ ] Subir cambios a un repositorio de git publico.
- [ ] Puntos extra: Subir el proyecto a un servidor de [Vercel](https://vercel.com/).

