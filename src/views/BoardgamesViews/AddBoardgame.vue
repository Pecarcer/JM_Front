<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Añadir Juego de Mesa</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-navbar-brand right>
            {{ this.currentUser.nick }}
          </b-navbar-brand>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-row>
      <b-col></b-col>
      <b-col>
        <div class="card">
          <form @submit="saveBoardgame">
            <div class="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="title"
                v-model="title"
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-group">
              <label>Creado por</label>
              <input
                type="text"
                name="creator"
                v-model="creator"
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-group">
              <label>Fecha Lanzamiento</label>
              <input
                type="date"
                name="release"
                v-model="release"
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-group">
              <label>Mínimo de Jugadores</label>
              <input
                type="text"
                name="min_num_players"
                v-model="min_num_players"
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-group">
              <label>Máximo de Jugadores</label>
              <input
                type="text"
                name="max_num_players"
                v-model="max_num_players"
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-group">
              <label>Duración de Partida</label>
              <input
                type="text"
                name="playing_time"
                v-model="playing_time"
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-group">
              <label>Edad mínima</label>
              <input
                type="text"
                name="ages"
                v-model="ages"
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-group">
              <label>Editorial</label>
              <input
                type="text"
                name="publisher"
                v-model="publisher"
                class="form-control form-control-lg"
              />
            </div>

            <button class="btn btn-lg btn-block">
              Añadir
            </button>
          </form>
          <b-button class="btn btn-lg btn-block volver" to="/boardgames">
            Volver
          </b-button>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  metaInfo: {
    title: "Juegos de Mesa | JuegosMesapp",
  },

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
    };
  },
  methods: {
    /**
     * Saves new boardgame
     */
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
        })
        .then(self.$router.push("/boardgames"))
        .catch((error) => {
          console.error(error.response.data);
        });
    },
    onChange(e) {
      this.file = e.target.files[0];
    },
  },
  created() {
    this.currentUser = JSON.parse(localStorage.user).user;
    if (this.currentUser.role != "Admin") {
      this.$router.push("/boardgames");
    }
  },
};
</script>

<style scoped>
.card {
  margin: 35px;
  border: 0;
}
button {
  background-color: green;
  color: white;
}
.volver {
  margin-top: 5px;
}
</style>
