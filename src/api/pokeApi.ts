export const pokeApi = {
    defaultUrl: 'https://pokeapi.co/api/v2/pokemon/',
    async getPokemonByName(pokemonID: string) {
      try {
        if(!pokemonID) return;
        pokemonID = pokemonID.toLowerCase();
        const response = await fetch(`${this.defaultUrl}${pokemonID}`);
        if(response.status !== 200) return;
        const pokemon = await response.json();
        return pokemon;
      } catch (error) {
        console.log("ERROR TO GET POKEMON BY NAME", error);
      }
    },
    async getPokemon(pokemonID: string) {
        try {
          if(!pokemonID) return;
          const pokemon = await this.getPokemonByName(pokemonID);
          if(!pokemon) return;
          const pokemonEvolutionChain = await this.getEvolutionChains(pokemon.species.url);
          let pokemonEvolutionsNames;
          let isASucessiveEvolution = false;
          if(pokemonEvolutionChain.chain.evolves_to.length > 1){
            pokemonEvolutionsNames = await getAllPossibleEvolutions(pokemonEvolutionChain.chain.evolves_to);
            pokemonEvolutionsNames.unshift(pokemonEvolutionChain.chain.species.name);
          }else{
            pokemonEvolutionsNames = getEvolutions(pokemonEvolutionChain.chain, []);
            isASucessiveEvolution = true;
          }
          
          const pokemonEvolutions = await Promise.all(pokemonEvolutionsNames.map((pokemonName: string) =>this.getPokemonByName(pokemonName)));
          
          const pokemonData = {pokemon, pokemonEvolutions,isASucessiveEvolution};
          return pokemonData;
        } catch (error) {
          console.log("ERROR TO GETPOKEMON", error);
        }
      },
      async getEvolutionChains(specieUrl: string){
          try {
          const evolutionUrl = await getSpecies(specieUrl);
          if(!evolutionUrl) return;
          const response = await fetch(`${evolutionUrl}`);
          if(response.status !== 200) return;
          const pokemonEvolution = await response.json();
          return pokemonEvolution;
        } catch (error) {
          console.log("ERROR TO GET EVOLUTION: ", error);
        }
      }
}


async function getSpecies(specieUrl: string) {
    try {
    if(!specieUrl) return;
    const response = await fetch(`${specieUrl}`);
    if(response.status !== 200) return;
    const speciePokemon = await response.json();
    return speciePokemon.evolution_chain.url;
  } catch (error) {
    console.log("ERROR TO GET SPECIES: ", error);
  }
}

function getEvolutions(chain: any, names: string[]):any {
  const pokemonName = names;
  if (chain.evolves_to.length === 0) return [...names, chain.species.name];
  pokemonName.push(chain.species.name);
  return getEvolutions(chain.evolves_to[0], pokemonName);
}

function getAllPossibleEvolutions(evolutions: any[]){
  const allPossibleEvolutions = evolutions.map((pokemon)=>{
    return pokemon.species.name;
  })
  return allPossibleEvolutions;
}