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


Otros: 
- Instala los decoradores ORM
```
npm i @nestjs/config
npm install @nestjs/typeorm typeorm
npm install pg
```
