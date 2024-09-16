<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Teslo API

1. Despues de clonar el repo
```
npm install
```
2. Renombras __.env.template__ a __.env__

3. Configurar variables de entorno 

4. Levantar base de datos 
```
docker-compose up -d
```
5. Ejecuta 
```
nest start --watch
```

6. Ejecuta seed
```
http://localhost:PORT/api/seed

```

Otros: 
- Instala los decoradores ORM y otros paquetes utiles
```
npm i @nestjs/config
npm install @nestjs/typeorm typeorm
npm install pg
npm i class-validator class-transformer
npm install -D @types/uuid
npm i -D @types/multer
npm i @nestjs/serve-static
npm i bcrypt
npm i -D @types/bcrypt
<!-- Authentication -->
npm install --save @nestjs/passport passport
npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt

```


## OpenAPI documentation
```
npm i @nestjs/swagger
```
