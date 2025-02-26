const { response } = require('express');
const { readDB, writeDB } = require('./../../config/database');
const DBTABLE = 'pokemons';
const axios = require('axios');
// Función para obtener detalles de un Pokémon por su URL
async function fetchPokemonDetails(identifier) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
        const pokemon = response.data;

        return {
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types.map((type) => type.type.name).join(', '),
            hp: pokemon.stats.find((stat) => stat.stat.name === 'hp').base_stat,
            attack: pokemon.stats.find((stat) => stat.stat.name === 'attack').base_stat,
            specialAttack: pokemon.stats.find((stat) => stat.stat.name === 'special-attack').base_stat,
            defense: pokemon.stats.find((stat) => stat.stat.name === 'defense').base_stat,
            specialDefense: pokemon.stats.find((stat) => stat.stat.name === 'special-defense').base_stat,
            speed: pokemon.stats.find((stat) => stat.stat.name === 'speed').base_stat,
        };
    } catch (error) {
        throw new Error(`Error al obtener los detalles del Pokémon: ${error.message}`);
    }
}

const getPokemon = async (req, res = response) => {
    const { params: { identifier } } = req;
    if (!identifier) {
        return res.status(400).json({ message: 'identifier' });
    }
    let detailsPokemon;
    try {
        detailsPokemon = await fetchPokemonDetails(identifier);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
    let pokemons;
    try {
        pokemons = readDB(DBTABLE);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    let validateExitingPokemon = undefined;
    if (Object.keys(pokemons).length !== 0) {
        try {
            validateExitingPokemon = pokemons.find(pokemons => pokemons.name === identifier || pokemons.id === parseInt(identifier));
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    if (!validateExitingPokemon) {
        pokemons.push(detailsPokemon);
        let sendPokemonsDB;
        try {
            sendPokemonsDB = writeDB(pokemons, DBTABLE);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    return res.status(200).json(detailsPokemon);
}

/**
 * Retrieves a paginated list of Pokémon from the external Pokémon API and sends the details as a response.
 * 
 * @param {Object} req - The HTTP request object, containing query parameters 'page' and 'limit'.
 * @param {Object} res - The HTTP response object used to send back the desired HTTP response.
 * 
 * @returns {Object} - JSON response containing paginated Pokémon details.
 * 
 * Sends a 400 status code if 'page' or 'limit' query parameters are missing.
 * Sends a 404 status code if there is an error fetching the data from the Pokémon API.
 * Sends a 500 status code if there is an error fetching Pokémon details.
 */

const getAllPokemons = async (req, res = response) => {
    const { query: { page, limit } } = req;
    if (!page || !limit) {
        return res.status(400).json({ message: 'page and limit' });
    }
    if (limit > 1000) {
        return res.status(400).json({ message: 'limit can not be greater than 1000' });
    }
    const offset = (parseInt(page) - 1) * parseInt(limit);
    let getPokemonsByAPI;
    try {
        getPokemonsByAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    const { data: { results: pokemonList } } = getPokemonsByAPI;
    try {
        const pokemonDetails = await Promise.all(
            pokemonList.map(async (pokemon) => {
                const details = await fetchPokemonDetails(pokemon.name);
                return details;
            })
        );
        return res.status(200).json({
            total: pokemonList.length,
            page: parseInt(page),
            limit: parseInt(limit),
            pokemons: pokemonDetails
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching Pokémon details", error: error.message });
    }
}
module.exports = { getPokemon, getAllPokemons };