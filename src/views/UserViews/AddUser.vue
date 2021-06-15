<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Añadir Usuario</b-navbar-brand>
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
          <form>
            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                v-model="email"
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-group">
              <label>Nombre Completo</label>
              <input
                type="text"
                name="fullname"
                v-model="fullname"
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-group">
              <label>Nick</label>
              <input
                type="text"
                name="nick"
                v-model="nick"
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                class="form-control form-control-lg"
                name="password"
                v-model="password"
              />
            </div>
            <div class="form-group">
              <label>Confirma la contraseña</label>
              <input
                type="password"
                class="form-control form-control-lg"
                name="password_confirmation"
                v-model="password_confirmation"
              />
            </div>

            <div class="form-group">
              <label>Selecciona rol</label>
              <select v-model="role" class="form-control form-control-lg">
                <option value="user" selected>Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <button type="submit" class="btn btn-lg btn-block" @click="saveUser()">
              Añadir
            </button>
            <b-button class="btn btn-lg btn-block" to="/users">
              Volver
            </b-button>
          </form>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "AddUser",

  data() {
    return {
      nick: "",
      email: "",
      role: "",
      password: "",
      password_confirmation: "",
      fullname: "",
    };
  },
  methods: {
    saveUser() {
      let self = this;
      axios
        .post("/users/add", {
          nick: this.nick,
          email: this.email,
          role: this.role,
          password: this.password,
          password_confirmation: this.password_confirmation,
          fullname: this.fullname,
        })
        .then(self.$router.push("/users"))
        .catch((e) => {
          alert(e);
        });
    },
  },
    created() {
    this.currentUser = JSON.parse(localStorage.user).user;
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
