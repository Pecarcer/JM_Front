<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand
        >Añadir Jugador a la partida Id {{ this.idCurrentGame }}</b-navbar-brand
      >
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
            <label>Jugador</label>
            <select v-model="user" class="form-control form-control-lg">
              <option v-for="item in users" :value="item.id" :key="item.id">{{
                item.nick
              }}</option>
            </select>
          </div>

          <button class="btn btn-lg btn-block" @click="addPlayer()">
            Añadir
          </button>

          <b-button class="btn btn-lg btn-block volver" :to="'/players/of/'+ this.idCurrentGame" >
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
    title: "Añadir Jugador | JuegosMesapp",
  },

  data() {
    return {
      user: "",
      users: [],
      idCurrentGame: "",
    };
  },
  methods: {
    addPlayer() {
      let self = this;
      axios
        .post("/players/add", {
          user: this.user,
          game: this.idCurrentGame,
        })
        .then(self.$router.push("/players/of/" + this.idCurrentGame))
        .catch((e) => {
          alert(e);
        });
    },

    getUsers() {
      axios.get("/users").then((data) => {
        this.users = data.data;
      });
    },
  },
  created() {
    this.idCurrentGame = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );
    this.currentUser = JSON.parse(localStorage.user).user;
    this.getUsers();
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
