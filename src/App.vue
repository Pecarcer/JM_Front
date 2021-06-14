<template>
  <div id="app">
    <vue-confirm-dialog></vue-confirm-dialog>
      <div v-if="isLogged">
        <b-button v-b-toggle.sidebar-1 class="btnmenu">Menu</b-button>
        <b-sidebar id="sidebar-1" backdrop title="Menu" shadow>
          <div class="px-3 py-2">
          <b-col class="btnsidebar"><b-button block variant="outline-primary" size="lg" to="/">Inicio</b-button></b-col>
          <b-col class="btnsidebar"><b-button block variant="outline-primary" size="lg" to="/users">Usuarios</b-button></b-col>
          <b-col class="btnsidebar"><b-button block variant="outline-primary" size="lg" to="/boardgames">Juegos</b-button></b-col>
          <b-col class="btnsidebar"><b-button block variant="outline-primary" size="lg" to="/reviews">Reseñas</b-button></b-col>
          <b-col class="btnsidebar"><b-button block variant="outline-primary" size="lg" to="/rooms">Salas</b-button></b-col>
          <b-col class="btnsidebar"><b-button block variant="outline-primary" size="lg" to="/games">Partidas</b-button></b-col>
          <b-col class="btnsidebar"><b-button block variant="outline-primary" size="lg" to="/myprofile">Perfil</b-button></b-col>
          <b-col class="btnsidebar"><b-button block variant="outline-primary" size="lg" to="/about">About</b-button></b-col>
          <b-col class="btnsidebar"><b-button block @click="logout()" variant="danger" size="lg">Logout</b-button></b-col>
          </div>
        </b-sidebar>
      </div>
      <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  computed: {
    ...mapGetters([
      'isLogged'
    ])
  },

  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

.btnmenu{
  float: left;
  margin: 10px;
  background-color: green;
}

.btnsidebar{
  margin: 5px;
}

router-link{
  color: white;
}

#sidebar-1{
  background-color: green;
}

</style>
