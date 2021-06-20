<template>
  <div>
    <b-row>
      <b-col></b-col>
      <b-col>
        <b-alert variant="danger" :show="showAlert">
          Datos incorrectas o ya registrados
        </b-alert>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col>
        <div class="card">
          <form @submit.prevent="register">
            <h3>Registro</h3>

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
              <label>Confirma tu contraseña</label>
              <input
                type="password"
                class="form-control form-control-lg"
                name="password_confirmation"
                v-model="password_confirmation"
              />
            </div>

            <button type="submit" class="btn btn-lg btn-block">
              Registrarse
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
export default {
  metaInfo: {
    title: "Registro | JuegosMesapp",
  },
  data() {
    return {
      email: "",
      password: "",
      nick: "",
      password_confirmation: "",
      fullname: "",
      showAlert: false,
    };
  },

  methods: {
    /*
     *registers a new user based on the credentials
     */
    register() {
      this.$store
        .dispatch("register", {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          fullname: this.fullname,
          nick: this.nick,
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
