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
          <span v-if="currentUser.role == 'Admin'">
            <div class="form-group">
              <label>Usuario</label>
              <select v-model="reviewer" class="form-control form-control-lg">
                <option v-for="item in users" :value="item.id" :key="item.id">{{
                  item.nick
                }}</option>
              </select>
            </div>
          </span>

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

          <button class="btn btn-lg btn-block" @click="saveReview()">
            Añadir
          </button>

          <b-button class="btn btn-lg btn-block volver" to="/reviews">
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
      currentUser: "",
      users: [],
      boardgames: [],
    };
  },
  methods: {
    /*
     * save the new review
     */
    saveReview() {
      if (this.currentUser.role != "Admin") {
        let self = this;
        axios
          .post("/reviews/add", {
            reviewer: this.currentUser.id,
            boardgame_id: this.boardgame_id,
            score: this.score,
            opinion: this.opinion,
          })
          .then(self.$router.push("/reviews"))
          .catch((e) => {
            alert(e);
          });
      } else {
        let self = this;
        axios
          .post("/reviews/add", {
            reviewer: this.reviewer,
            boardgame_id: this.boardgame_id,
            score: this.score,
            opinion: this.opinion,
          })
          .then(self.$router.push("/reviews"))
          .catch((e) => {
            alert(e);
          });
      }
    },
    /*
     * Gets all the users from the api
     */
    getUsers() {
      axios.get("/users").then((data) => {
        this.users = data.data;
      });
    },
    /*
     * Gets all the boardgames from the api
     */
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
