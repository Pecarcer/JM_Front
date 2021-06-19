<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Editar Post</b-navbar-brand>
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
              <label>Autoria</label>
              <select
                v-model="post.poster"
                class="form-control form-control-lg"
              >
                <option v-for="item in users" :value="item.id" :key="item.id">{{
                  item.nick
                }}</option>
              </select>
            </div>

            <div class="form-group">
              <label>Título</label>
              <input
                type="text"
                name="score"
                v-model="post.title"
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-group">
              <label>Texto</label>
              <b-form-textarea
                v-model="post.post_text"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </div>

            <button class="btn btn-lg btn-block" @click="savePostChanges()">
              Editar
            </button>
            <b-button class="btn btn-lg btn-block" to="/posts">
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
    title: "Editar Post | JuegosMesapp",
  },
  data() {
    return {
      posterNick: "",
      post: [],
      title: "",
      post_text: "",
      users: [],
      showAlert: false,
    };
  },
  created() {
    this.currentUser = JSON.parse(localStorage.user).user;
    if (this.currentUser.role != "Admin") {
      this.$router.push("/");
    } else {
      axios
        .get(`http://127.0.0.1:8000/api/posts/edit/${this.$route.params.id}`)
        .then((response) => {
          this.post = response.data[0];
        });
      this.getUsers();
    }
  },
  methods: {
    savePostChanges() {
      let self = this;
      axios
        .post(
          `http://127.0.0.1:8000/api/posts/update/${this.$route.params.id}`,
          this.post
        )
        .then(self.$router.push("/posts"))
        .catch((err) => {
          console.log(err);
          this.showAlert = true;
        });
    },
    getUsers() {
      axios.get("/users").then((data) => {
        this.users = data.data;
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
