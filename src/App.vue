<template>
  <div id="app">
    <vue-confirm-dialog></vue-confirm-dialog>
    <div v-if="isLogged">
      <b-button v-b-toggle.sidebar-1 class="btnmenu" variant="success"
        >Menu</b-button
      >
      <b-sidebar id="sidebar-1" backdrop title="Menu" shadow>
        <div class="px-3 py-2">
          <b-col class="btnsidebar"
            ><b-button block variant="primary" size="lg" to="/"
              >Inicio</b-button
            ></b-col
          >
          <b-col class="btnsidebar"
            ><b-button block variant="primary" size="lg" to="/myprofile"
              >Mi Perfil</b-button
            ></b-col
          >
          <br />
          <b-col class="btnsidebar"
            ><b-button block variant="success" size="lg" to="/users"
              ><span v-if="this.currentUser.role == 'Admin'"
                >Admin. Usuarios</span
              >
              <span v-else>Ver Usuarios</span></b-button
            ></b-col
          >
          <b-col class="btnsidebar"
            ><b-button block variant="success" size="lg" to="/boardgames"
              ><span v-if="this.currentUser.role == 'Admin'"
                >Admin. Juegos</span
              >
              <span v-else>Ver Juegos</span></b-button
            ></b-col
          >
          <b-col class="btnsidebar"
            ><b-button block variant="success" size="lg" to="/reviews"
              ><span v-if="this.currentUser.role == 'Admin'"
                >Admin. Reseñas</span
              >
              <span v-else>Ver Reseñas</span></b-button
            ></b-col
          >
          <b-col class="btnsidebar"
            ><b-button block variant="success" size="lg" to="/games"
              ><span v-if="this.currentUser.role == 'Admin'"
                >Admin. Partidas</span
              >
              <span v-else>Ver Partidas</span></b-button
            ></b-col
          >
          <span v-if="this.currentUser.role == 'Admin'"
            ><b-col class="btnsidebar"
              ><b-button block variant="success" size="lg" to="/comments"
                >Admin. Comentarios</b-button
              ></b-col
            ></span
          >
          <span v-if="this.currentUser.role == 'Admin'"
            ><b-col class="btnsidebar"
              ><b-button block variant="success" size="lg" to="/posts"
                >Admin. Posts</b-button
              ></b-col
            ></span
          >
          <br />
          <b-col class="btnsidebar"
            ><b-button block @click="logout()" variant="danger" size="lg"
              >Salir</b-button
            ></b-col
          >
          <b-img fluid width="200%" src="@/assets/greendice.png" />
        </div>
      </b-sidebar>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      currentUser: "",
    };
  },

  computed: {
    ...mapGetters(["isLogged"]),
  },

  methods: {
    /*
     * logs out the current authenticated user
     */
    logout() {
      this.$store.dispatch("logout");
    },
  },
  created() {
    this.currentUser = JSON.parse(localStorage.user).user;
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*background-image: url('~@/assets/background.png');*/
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.btnmenu {
  float: left;
  margin: 10px;
  background-color: green;
}

.btnsidebar {
  margin: 5px;
}

router-link {
  color: white;
}

#sidebar-1 {
  background-color: green;
}

.navbar.navbar-dark.bg-dark {
  background-color: green !important;
  border-radius: 25px 0px 0px 25px;
}

.green-bg {
  background-color: green;
}
</style>
