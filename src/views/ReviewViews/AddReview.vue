<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Añadir Reseña</b-navbar-brand>
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
          <form @submit="saveReview">
            <div class="form-group">
              <label>Juego</label>
              <select v-model="boardgame_id" class="form-control form-control-lg">
                   <option v-for="item in boardgames" :value="item.id" :key="item.id">{{item.title}}</option>
              </select>
            </div>

            <div class="form-group">
              <label>Usuario</label>
              <select v-model="reviewer" class="form-control form-control-lg">
                   <option v-for="item in users" :value="item.id" :key="item.id">{{item.nick}}</option>
              </select>
            </div>

            <div class="form-group">
              <label>Nota</label>
              <input
                type="text"
                name="score"
                v-model="score"
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-group">
              <label>Opinion</label>
              <input
                type="text"
                name="opinion"
                v-model="opinion"
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
      reviewer: "",
      boardgame_id: "",
      score: "",
      opinion: "",
      users: [],
      boardgames: [],
      sortBy: '',
    };
  },
  methods: {
    saveReview() {
      let self = this;
      axios
        .post("/reviews/add", {
          reviewer: this.reviewer,
          boardgame_id: this.boardgame_id,
          score: this.score,
          opinion: this.opinion,
        })
        .then(
            self.$router.push("/reviews")
            )
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
