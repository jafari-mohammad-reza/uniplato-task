### uniplato-task

- this project is built on top of typescirpt , fastify and prisma

- database configuration and seed will be done by start script which you can find in package.json

- ways to run it:

### Using docker

```
docker-compose up -d
```

### OR

`docker build  -t uniplato-task . `

### Using package json script

```
pnpm run start:prod
```

## Swagger

- http://localhost:4000

### Project structure

- server=> uses routes
- handlers => uses service , schemas
- services => uses repository
- repository => using helper prisma
- helper functions
- routes => uses handlers , schemas
- schemas
- middlewares
