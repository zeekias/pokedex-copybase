<template>
  <main class="view-container">
    <section class="search-section">
      <div class="title">
        <h1>Search Your</h1>
        <img class="logo" src="../assets/images/pokemon_logo.svg.png" alt="logo">
      </div>
      <input class="search-bar" :class="{error: error}" type="search" v-model.lazy="pokemonID" @change="searchPokemon"
        placeholder="Digite o Nome ou ID do Pokémon">
      <p>Aperte Enter para Pesquisar!</p>
    </section>
    <ul class="pokemon-list" v-if="(isASucessiveEvolution) && pokemonEvolution && pokemonEvolution.length > 0">

      <li v-for="(pokemon, index) in pokemonEvolution" :key="index">
        <Pokemon v-if="pokemon" :class="{choosed: pokemonData.name === pokemon.name}"  :pokemonData="pokemon" :isTheLastOne="pokemonEvolution.length-1 === index " />

      </li>
    </ul>
    <div class="pokemon-list is-not-sucessive-evolution"
      v-else-if="(pokemonData?.name === pokemonEvolution[0]?.name) && pokemonEvolution && pokemonEvolution.length > 0">
      <Pokemon class="pokemon choosed"  :pokemonData="pokemonEvolution[0]" :isTheLastOne="true" />
      <h3>Possíveis Evoluções</h3>
      <ul class="list">
        <li v-for="(pokemon, index) in pokemonEvolution" :key="index">
          <Pokemon v-if="pokemonData?.name !== pokemonEvolution[index]?.name"
            :pokemonData="pokemon" :isTheLastOne="true" />
        </li>
      </ul>
    </div>
    <ul class="pokemon-list" v-else-if="pokemonData?.name !== pokemonEvolution[0]?.name && pokemonEvolution.length > 0">
      <li class="pokemon">
        <Pokemon v-if="pokemonEvolution.length > 0" :pokemonData="pokemonEvolution[0]" />
      </li>

      <li class="pokemon choosed">
        <Pokemon v-if="pokemonData" :pokemonData="pokemonData" :isTheLastOne="true" />
      </li>
    </ul>
  </main>

</template>

<script lang="ts">
import Pokemon from '../components/Pokemon.vue';
import { pokeApi } from '../api/pokeApi';

interface iPokemon {
  id: number,
  name: string,
  sprites: {
    front_default: string,
    back_default: string,
  },
  stats: [{
    base_stat: number,
    effort: number,
    stat: {
      name: string,
      url: string
    }
  }],
  types: [
    {
      slot: number,
      type: {
        name: string,
        url: string
      }
    }
  ],
}

export default {
  name: 'Home',
  components: {
    Pokemon,
  },
  data() {
    return {
      pokemonID: '',
      pokemonData: <iPokemon>{},
      pokemonEvolution: [] as any,
      isASucessiveEvolution: false,
      error: false
    }
  },
  methods: {
    async searchPokemon() {
      this.error = false;
      this.pokemonEvolution.length = 0;
      const result = await pokeApi.getPokemon(this.pokemonID);
      if (!result) {
        this.error = true;
        return;
      }
      const { pokemon, pokemonEvolutions, isASucessiveEvolution } = result;
      this.pokemonData = pokemon;
      this.pokemonEvolution = pokemonEvolutions;
      this.isASucessiveEvolution = isASucessiveEvolution;
    },

  }
}
</script>

<style lang="scss" scoped>
.view-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2vh;
  position: relative;
  color: white;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("../assets/images/fundo-site.png");
  background-repeat: no-repeat;
  background-size: cover;

  .search-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 25px;
    margin-top: 40px;

    .title {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      h1 {
        font-size: 2.5em;
        text-shadow:
          -1px -1px 0px rgb(0, 0, 0),
          -1px 1px 0px rgb(0, 0, 0),
          1px -1px 0px rgb(0, 0, 0),
          1px 0px 0px rgb(0, 0, 0);
      }

      img {
        width: 40vh;
      }
    }

    h2,
    p {
      text-align: center;
    }

    .search-bar {
      width: 60%;
      padding: 1.5%;
      border-radius: 8px;
      border: 2px solid rgb(59, 59, 59);
    }

    .search-bar.error {
      animation: search-error 0.5s ease-in-out ;
    }
  }
}

.pokemon-list {
  max-width: 90%;
  height: 50%;
  overflow-x: scroll;
  display: flex;
  gap: 3vw;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
}

.pokemon-list.is-not-sucessive-evolution {
  display: flex;
  flex-direction: column;
  align-items: center;

  .list {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
    width: 100%;

  }
}

@keyframes search-error {
  0% {
    border-bottom: 4px solid rgb(255, 0, 0);   
     transform: translateX(0px);
  }

  50% {
    transform: translateX(-10px);
  }

  100% {
    transform: translateX(10px);
  }
}
</style>
