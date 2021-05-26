<template>
  <form>
    <p class="h4 text-center mb-4">Añadir Juego</p>
    <br/>

    <div class="grey-text">
      <div class="four wide field">
        <input type="text" v-model="title" placeholder="Título" />
      </div>
      <div class="four wide field">
        <input type="text" v-model="creator" placeholder="Creadores" />
      </div>
      <div class="four wide field">
        <input type="text" v-model="release" placeholder="Fecha de lanzamiento" />
      </div>
      <div class="four wide field">
        <input type="text" v-model="min_num_players" placeholder="Número mínimo de jugadores" />
      </div>
      <div class="four wide field">
        <input type="text" v-model="max_num_players" placeholder="Número Máximo de Jugadores" />
      </div>
      <div class="four wide field">
        <input type="text" v-model="playing_time" placeholder="Duración de partida" />
      </div>
      <div class="four wide field">
        <input type="text" v-model="ages" placeholder="Edad mínima" />
      </div>
      <div class="four wide field">
        <input type="text" v-model="publisher" placeholder="Editorial" />
      </div>
      <div class="four wide field">
        <input type="text" v-model="image" placeholder="Imagen" />
      </div>
    </div>
    <br />
    <div class="text-center">
      <button color="primary" @click="saveBoardgame()">Añadir</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "AddBoardgame",

  data() {
    return {
      title: "",
      creator: "",
      release: "",
      min_num_players: "",
      max_num_players: "",
      playing_time: "",
      ages: "",
      publisher: "",
      image: "",
    };
  },
  methods: {
    saveBoardgame() {
      let self = this;
      axios
        .post("/boardgames/add", {
          title: this.title,
          creator: this.creator,
          release: this.release,
          min_num_players: this.min_num_players,
          max_num_players: this.max_num_players,
          playing_time: this.playing_time,
          ages: this.ages,
          publisher: this.publisher,
          image: this.image,
        })
        .then(self.$router.push("/boardgames"))
        .catch((e) => {
          alert(e);
        });
    },
  },
};
</script>

<style scoped>
</style>
