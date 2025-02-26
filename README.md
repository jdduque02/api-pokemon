# API-POKEMON

Esta aplicación de construyó con el fin de completar una prueba técnica para la feria del Brasier y solo kukos para el cargo de Desarrollador.

## Requisitos Previos

Node.js instalado (versión 22.14.0 o superior).

## Instalación

    1. git clone https://github.com/jdduque02/api-pokemon.git

    2. cd api-pokemon

    3. npm i

    4. crear un archivo .env en la ruta ./src/

    5. Se deben configurar las siguientes variables de entorno:
        - PORT=
        - HASH_KEY_USER =
        - HASH_KEY_JWT=
        - VERSION=

## Inicia el servidor:

    npm start
    El servidor estará disponible en http://localhost:${PORT}.

## Uso:

1.  Ruta Para registrar un usuario:
    - POST: http://localhost:${PORT}/api/v${VERSION}/user/
    - body:{ "username":"prueba121", "password":"prueba12"}

2.  Iniciar sesión:
    - POST: http://localhost:${PORT}/api/v${VERSION}/user/login
    - body:{"username":"prueba121", "password":"prueba12"}
3.  Consultar un pokemon
    - GET: http://localhost:${PORT}/api/v${VERSION}/pokemon/name/clefairy
    - header:X-Access-Token: el token obtenido tanto en Iniciar sesión como en el crear usuario
    - query params: nombre del pokemon
4.  Consultar un pokemon
    - GET: http://localhost:${PORT}/api/v${VERSION}/pokemon/id/35
    - header: X-Access-Token: el token obtenido tanto en Iniciar sesión como en el crear usuario
    - query params: id del pokemon
5.  Consultar pokemons con paginacion incluida y limites:
    - GET: http://localhost:${PORT}/api/v${VERSION}/pokemon/all/?page=${page}&limit=${limit}
    - header: X-Access-Token: el token obtenido tanto en Iniciar sesión como en el crear usuario
    - query params:
        - page 
        - limit

## BD

    se usaron archivos .json como BD en esta prueba
    el nombre del atributo header para el JWT es X-Access-Token
