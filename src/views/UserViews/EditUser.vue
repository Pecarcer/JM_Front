<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Editar Usuario</b-navbar-brand>
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
              <!--
              <div class="form-group">
                <label>Nueva Contraseña</label>
                <input
                  type="password"
                  class="form-control form-control-lg"
                  name="password"
                  v-model="user.password"
                />
              </div>
              <div class="form-group">
                <label>Confirma la nueva Contraseña</label>
                <input
                  type="password"
                  class="form-control form-control-lg"
                  name="password_confirmation"
                  v-model="user.password_confirmation"
                />
              </div>-->

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

              <button
                type="submit"
                class="btn btn-lg btn-block"
                @click="saveUserChanges()"
              >
                Editar
              </button>
              <b-button class="btn btn-lg btn-block" to="/users">
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
  metaInfo: {
    title: "Editar Usuario | JuegosMesapp",
  },
  data() {
    return {
      user: {},
      showAlert: false,
    };
  },
  created() {
    this.currentUser = JSON.parse(localStorage.user).user;
    if (this.currentUser.role != "Admin") {
      this.$router.push("/users");
    } else {
      axios.get(`/users/edit/${this.$route.params.id}`).then((response) => {
        this.user = response.data;
        //console.log(response.data);
      });
    }
  },
  methods: {
    /*
     * saves changes done on the user of the profile
     */
    saveUserChanges() {
      let self = this;
      axios
        .post(`/users/update/${this.$route.params.id}`, this.user)
        .then(self.$router.push("/users"))
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
