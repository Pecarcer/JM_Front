<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Editar mis datos</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-navbar-brand right>
            {{ this.user.nick }}
          </b-navbar-brand>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col class="alert">
          <b-alert variant="danger" :show="showAlert">
            Hubo un problema :(
          </b-alert>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col>
          <div class="card">
            
              <div class="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  v-model="user.email"
                  class="form-control form-control-lg"
                />
              </div>

              <div class="form-group">
                <label>Nombre Completo</label>
                <input
                  type="text"
                  name="fullname"
                  v-model="user.fullname"
                  class="form-control form-control-lg"
                />
              </div>

              <div class="form-group">
                <label>Nick</label>
                <input
                  type="text"
                  name="nick"
                  v-model="user.nick"
                  class="form-control form-control-lg"
                />
              </div>

              <span v-if="currentUser.role=='Admin'">
              <div class="form-group">
                <label>Selecciona rol</label>
                <select
                  v-model="user.role"
                  class="form-control form-control-lg"
                >
                  <option value="User" selected>Usuario</option>
                  <option value="Admin">Administrador</option>
                </select>
              </div>
              </span>

              <button
                type="submit"
                class="btn btn-lg btn-block"
                @click="saveUserChanges()"
              >
                Editar
              </button>
              <b-button class="btn btn-lg btn-block" to="/myprofile">
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
    title: "Mi perfil | JuegosMesapp",
  },
  data() {
    return {
      user: {},
      showAlert: false,
      currentUserId: "",
      currentUser:''
    };
  },
  created() {
    this.currentUserId = JSON.parse(localStorage.user).user.id;
    this.currentUser = JSON.parse(localStorage.user);

    this.url = "/users/edit/";
    this.url = this.url.concat(this.currentUserId.toString());

    axios
      .get(this.url)
      .then((response) => {
        this.user = response.data;
      });
  },
  methods: {
    saveUserChanges() {
      let self = this;

      this.idToUpdate = this.currentUserId;
      this.url = "/users/update/";
      this.url = this.url.concat(this.idToUpdate.toString());

      axios
        .post(this.url, this.user)
        .then(self.$router.push("/myprofile"))
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
