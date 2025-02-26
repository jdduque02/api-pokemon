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


    POST: http://localhost:${PORT}/api/v${VERSION}/user/

    body:
    {
        "username":"prueba121",
        "password":"prueba12"
    }
    respuesta:
    {
        "message": "User created successfully",
        "user": {
            "id": "1b8e657c-3610-44c0-8442-8f57ecd95b86",
            "username": "prueba121"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. eyJkYXRhIjp7InVzZXJuYW1lIjoicHJ1ZWJhMTIxIn0sImV4cGlyZXNJbiI6IjIwMjUtMDItMjZUMTg6Mzc6MTcuNDczWiIsImlhdCI6MTc0MDU5NTAzNzQ3M30.iY7L_1Jg1yk8ctzPu6ThcBJci8ptYC0gnNVnpF8-oEA"
    }

2. Iniciar sesión:
   POST: http://localhost:${PORT}/api/v${VERSION}/user/login
   body:
   {
   "username":"prueba121",
   "password":"prueba12"
   }
   respuesta:
   {
   "message": "Login successful",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoicHJ1ZWJhMTIxIn0sImV4cGlyZXNJbiI6IjIwMjUtMDItMjZUMTc6MTU6MTEuMjA5WiIsImlhdCI6MTc0MDU5MDExMTIwOX0.JpMQpMrVqkE1e_wUKnWVUyWuMsa1JYj129c21J6itbc"
   }
3. Consultar un pokemon
   GET: http://localhost:${PORT}/api/v${VERSION}/pokemon/name/clefairy
   header:
   X-Access-Token: el token obtenido tanto en Iniciar sesión como en el crear usuario
   query params: nombre del pokemon
4. Consultar un pokemon
   GET: http://localhost:${PORT}/api/v${VERSION}/pokemon/id/35
   header:
   X-Access-Token: el token obtenido tanto en Iniciar sesión como en el crear usuario
   query params: id del pokemon
   respuesta:
   {
   "id": 35,
   "name": "clefairy",
   "types": "fairy",
   "hp": 70,
   "attack": 45,
   "specialAttack": 60,
   "defense": 48,
   "specialDefense": 65,
   "speed": 35
   }
5. Consultar pokemons con paginacion incluida y limites:
   GET: http://localhost:${PORT}/api/v${VERSION}/pokemon/all/?page=${page}&limit=${limit}
   header:
   X-Access-Token: el token obtenido tanto en Iniciar sesión como en el crear usuario
   query params:  
    - page - limit

## BD

    se usaron archivos .json como BD en esta prueba
