<template>
  <div>
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
          <form @submit.prevent="login">
            <h3>Login</h3>
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
              <label>Contraseña</label>
              <input
                type="password"
                class="form-control form-control-lg"
                name="password"
                v-model="password"
              />
            </div>

            <button type="submit" class="btn btn-lg btn-block">
              Acceder
            </button>
            <b-button class="btn btn-lg btn-block" to="/">
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
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  metaInfo: {
    title: "Login | JuegosMesapp",
  },
  data() {
    return {
      email: "",
      password: "",
      showAlert: false,
    };
  },

  methods: {
    /*
     * tries to log on the user with the provided credentials
     */
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "Home" });
        })
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
.alert {
  margin: 5px;
}
</style>
