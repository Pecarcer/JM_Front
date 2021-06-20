<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Editar Reseña</b-navbar-brand>
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
              <label>Juego</label>
              <select
                v-model="review.boardgame_id"
                class="form-control form-control-lg"
              >
                <option :value="review.boardgame_id" selected>{{
                  review.boardgameName
                }}</option>
                <option
                  v-for="item in boardgames"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.title }}</option
                >
              </select>
            </div>

            <div class="form-group">
              <label>Usuario</label>
              <select
                v-model="review.reviewer"
                class="form-control form-control-lg"
              >
                <option v-for="item in users" :value="item.id" :key="item.id">{{
                  item.nick
                }}</option>
              </select>
            </div>

            <div class="form-group">
              <label>Nota</label>
              <input
                type="text"
                name="score"
                v-model="review.score"
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-group">
              <label>Opinion</label>
              <input
                type="text-field"
                name="opinion"
                v-model="review.opinion"
                class="form-control form-control-lg"
              />
            </div>

            <button class="btn btn-lg btn-block" @click="saveReviewChanges()">
              Editar
            </button>
            <b-button class="btn btn-lg btn-block" to="/reviews">
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
    title: "Editar Reseña | JuegosMesapp",
  },
  data() {
    return {
      review: "",
      reviewer: "",
      boardgame_id: "",
      score: "",
      opinion: "",
      users: [],
      boardgames: [],
      showAlert: false,
    };
  },
  created() {
    this.currentUser = JSON.parse(localStorage.user).user;
    if (this.currentUser.role != "Admin") {
      this.$router.push("/reviews");
    } else {
      axios.get(`/reviews/edit/${this.$route.params.id}`).then((response) => {
        this.review = response.data[0];
      });
      this.getUsers();
      this.getBoardgames();
    }
  },
  methods: {
    /*
     * Saves the changes done to the current review
     */
    saveReviewChanges() {
      let self = this;
      axios
        .post(`/reviews/update/${this.$route.params.id}`, this.review)
        .then(self.$router.push("/reviews"))
        .catch((err) => {
          console.log(err);
          this.showAlert = true;
        });
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
