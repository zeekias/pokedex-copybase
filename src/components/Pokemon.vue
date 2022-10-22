<template>
  <div class="pokemon-container" :class="{ actived: isClicked }" v-if="Object.entries(pokemonData).length > 0">
    <button class="close-modal" v-if="isClicked" @click="handleActive(false)">X</button>
    <div class="pokemon-card" :class="pokemonData.types[0].type.name" @click="handleActive(true)">
      <div class="pokemon-info">

        <div v-if="isClicked" class="pokemon-attributes">
          <div class="pokemon-specials-att">
            <div class="pokemon-special-attack">
              <span class="title">SPC ATK</span>
              <span class="pokemon-specials atck">{{pokemonData.stats[3].base_stat}}</span>
            </div>
            <div class="pokemon-special-defense">
              <span class="title">SPC DEF</span>
              <span class="pokemon-specials def">{{pokemonData.stats[4].base_stat}}</span>
            </div>
          </div>
          <div class="pokemon-normal-att">
            <span class="pokemon-attack">{{"ATCK "+pokemonData.stats[1].base_stat}}</span>
            <span class="pokemon-defense">{{"DEF "+pokemonData.stats[2].base_stat}}</span>
            <span class="pokemon-speed">{{"SPD "+pokemonData.stats[5].base_stat}}</span>
          </div>
        </div>


        <ul v-if="isClicked" class="pokemon-types">
          <h3>Type(s): </h3>
          <li v-for="(type, key) in pokemonData.types" :key="key" class="pokemon-type" :class="type.type.name">
            <span>{{ type.type.name }}</span>
          </li>
        </ul>
        <div class="pokemon-image-container">
          <img class="pokemon-image"
            :src="pokemonData.sprites.front_default ? pokemonData.sprites.front_default : pokemonData.sprites.back_default"
            :alt="pokemonData.name">
        </div>

        <div class="pokemon-heading">
          <h2 class="pokemon-name" :class="{ minus: !isClicked }">{{ pokemonData.name }}</h2>
          <p v-if="isClicked" class="pokemon-life">{{"HP "+pokemonData.stats[0].base_stat}}</p>
        </div>
      </div>
    </div>
    <div v-if="!isTheLastOne && !isClicked" class="arrow">
      <img src="../assets/images/seta.png" alt="Back Arrow">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    pokemonData: {} as any,
    isTheLastOne: Boolean
  }, data() {
    return {
      isClicked: false
    }
  },
  methods: {
    handleActive(valor: boolean) {
      this.isClicked = valor;
    }
  }

})
</script>

<style lang="scss" scoped>
.pokemon-container.choosed {
  .pokemon-card {
    background-color: rgba(39, 39, 39, 0.2);
    border-radius: 8px;
  }
}

.pokemon-container {
  display: flex;
  align-items: center;
  cursor: url("../assets/images/cursor/cursor.cur") 2 2, pointer;
  ;

  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f1ecff;
    padding: 5px;
    border-radius: 50px;
    border: 0;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }



  .pokemon-card {
    .pokemon-info {
      .pokemon-heading {
        display: flex;
        align-items: center;
        justify-content: center;

        .pokemon-name {
          text-align: center;
          text-transform: capitalize;
        }

        .pokemon-name.minus {
          background-color: #333;
          color: #f1ecff;
          padding: 6px 10px;
          border-radius: 20px;
          font-weight: bold;
        }
      }

      .pokemon-image {
        width: 40vh;
      }

      :hover {
        background-color: rgb(0, 0, 0, 0.02);
      }

    }
  }
}

.pokemon-container.actived {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 25%;
  background-color: rgb(0, 0, 0, 0.5);
  top: 0%;
  cursor: default;

  .close-modal {
    z-index: 99;
    padding: 20px;
    position: absolute;
    right: auto;
    top: 3%;
    background-color: #f1ecff;
    border-radius: 50px;
    border: 0;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    font-size: 32px;
    cursor: pointer;

  }

  .close-modal:hover {
    color: red;
  }

  .pokemon-card {
    width: 310px;
    height: 520px;
    margin-left: 30px;
    padding: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    border-radius: 12px;
    box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("../assets/images/fundo-card-0.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    animation: slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

    .pokemon-info {
      display: flex;
      flex-direction: column-reverse;
      gap: 5px;

      .pokemon-types {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        list-style: none;

        .pokemon-type {
          background-color: #333;
          color: #f1ecff;
          padding: 6px 10px;
          border-radius: 20px;
          text-transform: capitalize;
          font-weight: bold;
        }

        .pokemon-type.fire {
          background-color: rgb(218, 95, 95);
        }

        .pokemon-type.water {
          background-color: rgb(108, 138, 230);
        }

        .pokemon-type.grass {
          background-color: rgb(77, 113, 38);
        }

        .pokemon-type.flying {
          background-color: rgb(224, 224, 224);
          color: #444444;
        }

        .pokemon-type.electric {
          background-color: rgb(204, 192, 66);
        }

        .pokemon-type.psychic {
          background-color: rgb(224, 224, 224);
          color: #333;
        }

        .pokemon-type.dragon {
          background-color: rgb(245, 93, 29);
        }

        .pokemon-type.fairy {
          background-color: rgb(209, 38, 166);
        }

        .pokemon-type.rock {
          background-color: rgb(36, 13, 7);
        }

        .pokemon-type.bug {
          background-color: rgb(152, 190, 110);
        }

        .pokemon-type.steel {
          background-color: rgb(68, 68, 68);
        }

        .pokemon-type.ice {
          background-color: rgb(51, 116, 135);
        }
      }



      .pokemon-attributes {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-weight: bold;
        gap: 10px;

        .pokemon-specials-att {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;


          div {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .title {
              font-size: 12px
            }

            .pokemon-specials {
              padding: 3px 5px;
              border-radius: 50%;
              background-color: rgba(0, 0, 0, 0.8);
              color: rgb(234, 232, 232);
            }
          }

         

        }

        .pokemon-normal-att {
          span {
            padding: 6px 10px;
            color: #000000;
            background-color: #EEEEEE;

          }

          .pokemon-attack {
            border-top-left-radius: 8px;
            border-right: 2px solid rgb(12, 12, 12);
          }

          .pokemon-defense {
            border-right: 2px solid rgb(16, 16, 16);
          }

          .pokemon-speed {
            border-bottom-right-radius: 8px;
          }
        }
      }

      .pokemon-heading {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(179, 177, 185, 0.7);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;

        .pokemon-name {
          width: 65%;
          color: white;
          text-align: left;
          padding: 12px 10px;
        }

        .pokemon-life {
          background-color: #333;
          color: #f1ecff;
          padding: 6px 10px;
          border-radius: 20px;
          font-weight: bold;
        }
      }

      .pokemon-image-container {
        position: relative;

        .pokemon-image {
          width: 280px;
          border: 3px solid rgb(241, 237, 237, 0.5);
          background-color: rgba(91, 91, 91, 0.4);
          border-radius: 8px;
          animation: show-pokemon 3.25s ease-out 1;
        }

      }


      .pokemon-image-container::before {
        content: "";
        width: 64px;
        height: 64px;
        position: absolute;
        right: 45%;
        top: 50%;
        opacity: 0;
        background-image: url("../assets/images/pokebola.png");
        background-repeat: no-repeat;
        background-size: contain;
        animation: slide-tl 0.5s ease-in-out;
      }

    }
  }

  .pokemon-card.fire {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("../assets/images/fundo-card-fire.jpg");
  }

  .pokemon-card.water {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("../assets/images/fundo-card-water.jpg");
  }
  .pokemon-card.ice {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("../assets/images/fundo-card-ice.jpg");
  }
  .pokemon-card.grass,
  .pokemon-card.bug {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("../assets/images/fundo-card-grass.jpg");
  }

  .pokemon-card.flying {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("../assets/images/fundo-card-fly.jpg");
  }

  .pokemon-card.electric {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("../assets/images/fundo-card-electric.jpg");
  }

  .pokemon-card.psychic {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("../assets/images/fundo-card-psychic.jpg");
  }

  .pokemon-card.dragon {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("../assets/images/fundo-card-dragon.jpg");
  }

  .pokemon-card.fairy {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("../assets/images/fundo-card-fairy.jpg");
  }

  .pokemon-card.dark {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("../assets/images/fundo-card-dark.jpg");
  }

  .pokemon-card.rock {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("../assets/images/fundo-card-rock.jpg");
  }
}



@keyframes show-pokemon {
  from {
    border: 0px;
    background-color: none;
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slide-top {
  0% {
    overflow: hidden;
    transform: translateY(100px);
  }

  100% {
    transform: translateY(0px);
  }
}


@keyframes slide-tl {
  0% {
    opacity: 1;
    transform: translateY(300px) translateX(300px);
  }

  100% {
    transform: translateY(0) translateX(0);
  }
}
</style>