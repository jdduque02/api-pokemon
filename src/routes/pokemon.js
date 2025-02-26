
const express = require('express');
const { getPokemon, getAllPokemons } = require('../controllers/pokemon/controller');
const router = express.Router();

router.get('/pokemon/all/:limit?/:page?', getAllPokemons);
/* es la misma ruta solo que en la prueba se especificaba que debia contener estas dos rutas
    ejemplos:
    http://localhost:3000/api/v1/pokemon/name/clefairy
    http://localhost:3000/api/v1/pokemon/id/35
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
    ambos devuelven lo mismo
*/
router.get('/pokemon/name/:identifier', getPokemon);
router.get('/pokemon/id/:identifier', getPokemon);
module.exports = router;