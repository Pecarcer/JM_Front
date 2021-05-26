<template>
  <div id="app">
    <vue-confirm-dialog></vue-confirm-dialog>
      <div v-if="isLogged">
        <b-button v-b-toggle.sidebar-1 class="btnmenu">Menu</b-button>
        <b-sidebar id="sidebar-1" backdrop title="Menu" shadow>
          <div class="px-3 py-2">
          <b-col class="btnsidebar"><b-button block ><router-link to="/">Home</router-link></b-button></b-col>
          <b-col class="btnsidebar"><b-button block><router-link to="/users">Usuarios</router-link></b-button></b-col>
          <b-col class="btnsidebar"><b-button block><router-link to="/boardgames">Juegos</router-link></b-button></b-col>
          <b-col class="btnsidebar"><b-button block><router-link to="/reviews">Reseñas</router-link></b-button></b-col>
          <b-col class="btnsidebar"><b-button block><router-link to="/rooms">Salas</router-link></b-button></b-col>
          <b-col class="btnsidebar"><b-button block><router-link to="/games">Partidas</router-link></b-button></b-col>
          <b-col class="btnsidebar"><b-button block><router-link to="/myprofile">Perfil</router-link></b-button></b-col>
          <b-col class="btnsidebar"><b-button block><router-link to="/about">About</router-link></b-button></b-col>

          <b-col class="btnsidebar"><b-button block @click="logout()">Logout</b-button></b-col>
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
}

.btnsidebar{
  margin: 5px;
}

router-link{
  color: white;
}
</style>
