<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Editar Partida</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-navbar-brand right>
            {{ this.currentUser.nick }}
          </b-navbar-brand>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col class="alert">
          <b-alert variant="danger" :show="showAlert">
            Credenciales incorrectas
          </b-alert>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col>
          <div class="card">
            <div class="form-group">
              <label>Organizador</label>
              <input
                disabled
                type="text"
                name="score"
                v-model="game.masterNick"
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-group">
              <label>Juego</label>
              <input
                disabled
                type="text"
                name="score"
                v-model="game.boardgameTitle"
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-group">
              <label>Fecha</label>
              <input
                type="date"
                name="score"
                v-model="game.date"
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-group">
              <label>Hora</label>
              <b-form-timepicker
                v-model="game.time"
                locale="es"
                placeholder="Selecciona la hora"
              ></b-form-timepicker>
            </div>

            <button class="btn btn-lg btn-block" @click="saveGameChanges()">
              Editar
            </button>
            <b-button class="btn btn-lg btn-block" to="/games">
              Volver
            </b-button>
          </div>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  metaInfo: {
    title: "Editar Partida | JuegosMesapp",
  },
  data() {
    return {
      showAlert: false,
      comment: [],
      game: "",
    };
  },
  created() {
    this.currentUser = JSON.parse(localStorage.user).user;
    if (this.currentUser.role != "Admin") {
      this.$router.push("/games");
    } else {
      axios
        .get(`/games/edit/${this.$route.params.id}`)
        .then((response) => {
          this.game = response.data[0];
        });
    }
  },
  methods: {
    saveGameChanges() {
      let self = this;
      axios
        .post(
          `/games/update/${this.$route.params.id}`,
          this.game
        )
        .then(self.$router.push("/games"))
        .catch((err) => {
          console.log(err);
          this.showAlert = true;
        });
    },
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
</style>
