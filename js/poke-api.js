const pokeAPI = {};

const converterPokemonApiDeatilToPokemon = (pokemonDetail) => {
  const pokemon = new Pokemon();  
  pokemon.name = pokemonDetail.name;
  pokemon.number = pokemonDetail.id;

  const types = pokemonDetail.types.map((type) => type.type.name);
  const [type] = types;

  pokemon.types = types
  pokemon.type = type;
  pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default;

  return pokemon;

}

pokeAPI.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
          .then((response) => response.json())
          .then((pokemon) => converterPokemonApiDeatilToPokemon(pokemon));
};

pokeAPI.getPokemons = (offset = 0, limit = 10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))
    .then((detailsRequest) => Promise.all(detailsRequest))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.log(error));
};
