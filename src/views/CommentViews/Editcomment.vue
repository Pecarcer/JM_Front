<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Editar Comentario</b-navbar-brand>
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
              <label>Usuario</label>
              <input
                type="text"
                name="score"
                v-model="comment.authorNick"
                class="form-control form-control-lg"
                disabled
              />
            </div>

            <div class="form-group">
              <label>Comentario</label>
              <b-form-textarea
                v-model="comment.commentary"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </div>

            <button class="btn btn-lg btn-block" @click="saveCommentChanges()">
              Editar
            </button>
            <b-button class="btn btn-lg btn-block" to="/debtors">
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
    title: "Editar Comentario | JuegosMesapp",
  },
  data() {
    return {
      showAlert: false,
      comment: [],
    };
  },
  created() {
    this.currentUser = JSON.parse(localStorage.user).user;
    if (this.currentUser.role != "Admin") {
      this.$router.push("/comments");
    } else {
      axios
        .get(`/comments/edit/${this.$route.params.id}`)
        .then((response) => {
          this.comment = response.data[0];
        });
    }
  },
  methods: {
    saveCommentChanges() {
      let self = this;
      axios
        .post(
          `/comments/update/${this.$route.params.id}`,
          this.comment
        )
        .then(self.$router.push("/comments"))
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
