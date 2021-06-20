<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Añadir Post</b-navbar-brand>
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
            <label>Título</label>
            <input
              type="text"
              name="score"
              v-model="title"
              class="form-control form-control-lg"
            />
          </div>

          <div class="form-group">
            <label>Texto</label>
            <b-form-textarea
              v-model="post_text"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </div>

          <button class="btn btn-lg btn-block" @click="savePost()">
            Añadir
          </button>

          <b-button class="btn btn-lg btn-block volver" to="/posts">
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
    title: "Posts | JuegosMesapp",
  },

  data() {
    return {
      poster: "",
      post_text: "",
      title: "",
      users: [],
    };
  },
  methods: {
        /*
    * Saves the new post
    */
    savePost() {
      let self = this;
      axios
        .post("/posts/add", {
          poster: this.currentUser.id,
          post_text: this.post_text,
          title: this.title,
        })
        .then(self.$router.push("/posts"))
        .catch((e) => {
          alert(e);
        });
    },
    /*
    * gets all users from api
    */
    getUsers() {
      axios.get("/users").then((data) => {
        this.users = data.data;
      });
    },
  },
  created() {
    this.currentUser = JSON.parse(localStorage.user).user;
    if (this.currentUser.role != "Admin") {
      this.$router.push("/");
    } else {
      this.getUsers();
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
