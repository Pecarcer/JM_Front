<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Editar Juego de Mesa</b-navbar-brand>
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
            <form>
              <div class="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="title"
                  v-model="boardgame.title"
                  class="form-control form-control-lg"
                />
              </div>

              <div class="form-group">
                <label>Creado por</label>
                <input
                  type="text"
                  name="creator"
                  v-model="boardgame.creator"
                  class="form-control form-control-lg"
                />
              </div>

              <div class="form-group">
                <label>Fecha Lanzamiento</label>
                <input
                  type="date"
                  name="release"
                  v-model="boardgame.release"
                  class="form-control form-control-lg"
                />
              </div>

              <div class="form-group">
                <label>Mínimo de Jugadores</label>
                <input
                  type="text"
                  name="min_num_players"
                  v-model="boardgame.min_num_players"
                  class="form-control form-control-lg"
                />
              </div>

              <div class="form-group">
                <label>Máximo de Jugadores</label>
                <input
                  type="text"
                  name="max_num_players"
                  v-model="boardgame.max_num_players"
                  class="form-control form-control-lg"
                />
              </div>

              <div class="form-group">
                <label>Duración de Partida</label>
                <input
                  type="text"
                  name="playing_time"
                  v-model="boardgame.playing_time"
                  class="form-control form-control-lg"
                />
              </div>

              <div class="form-group">
                <label>Edad mínima</label>
                <input
                  type="text"
                  name="ages"
                  v-model="boardgame.ages"
                  class="form-control form-control-lg"
                />
              </div>

              <div class="form-group">
                <label>Editorial</label>
                <input
                  type="text"
                  name="publisher"
                  v-model="boardgame.publisher"
                  class="form-control form-control-lg"
                />
              </div>
             <button
                type="submit"
                class="btn btn-lg btn-block"
                @click="saveBoardgameChanges()"
              >
                Editar
              </button>
                  <b-button class="btn btn-lg btn-block" to="/boardgames">
                Volver
              </b-button>
            </form>
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
  data() {
    return {
      boardgame: {},
      showAlert: false,
    };
  },
  created() {
    this.currentUser = JSON.parse(localStorage.user).user;
    if (this.currentUser.role != "Admin") {
      this.$router.push("/boardgames"); 
    } else {
      axios
        .get(`/boardgames/edit/${this.$route.params.id}`)
        .then((response) => {
          this.boardgame = response.data;
        });
    }
  },
  methods: {
    /*
    * Saves the changes donde to the boardgame
    */
    saveBoardgameChanges() {
      let self = this;
      axios
        .post(
          `/boardgames/update/${this.$route.params.id}`,
          this.boardgame
        )
        .then(self.$router.push("/boardgames"))
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
