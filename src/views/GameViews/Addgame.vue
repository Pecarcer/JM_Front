<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Añadir Partida</b-navbar-brand>
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
          <div class="form-group">
            <label>Juego</label>
            <select v-model="boardgame_id" class="form-control form-control-lg">
              <option
                v-for="item in boardgames"
                :value="item.id"
                :key="item.id"
                >{{ item.title }}</option
              >
            </select>
          </div>

          <div class="form-group">
            <label>Organizador</label>
            <select v-model="master" class="form-control form-control-lg">
              <option v-for="item in users" :value="item.id" :key="item.id">{{
                item.nick
              }}</option>
            </select>
          </div>

          <div class="form-group">
            <label>Fecha</label>
            <input
              type="date"
              name="score"
              v-model="date"
              class="form-control form-control-lg"
            />
          </div>

          <div class="form-group">
              <label>Hora</label>
            <b-form-timepicker v-model="time" locale="es" placeholder="Selecciona la hora"></b-form-timepicker>
          </div>

          <button class="btn btn-lg btn-block" @click="saveGame()">
            Añadir
          </button>

          <b-button class="btn btn-lg btn-block volver" to="/games">
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
    title: "Añadir Partida | JuegosMesapp",
  },

  data() {
    return {
      master: "",
      boardgame_id: "",
      date: "",
      time: "",
      users: [],
      boardgames: [],
    };
  },
  methods: {
    saveGame() {
      let self = this;
      axios
        .post("/games/add", {
          master: this.master,
          boardgame_id: this.boardgame_id,
          date: this.date,
          time: this.time,          
        })
        .then(self.$router.push("/games"))
        .catch((e) => {
          alert(e);
        });
    },

    getUsers() {
      axios.get("/users").then((data) => {
        this.users = data.data;
      });
    },
    getBoardgames() {
      axios.get("/boardgames").then((data) => {
        this.boardgames = data.data;
      });
    },
  },
  created() {
    this.currentUser = JSON.parse(localStorage.user).user;
    this.getUsers();
    this.getBoardgames();
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
