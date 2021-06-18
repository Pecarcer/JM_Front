<template>
  <div id="app">
    <vue-confirm-dialog></vue-confirm-dialog>
      <div v-if="isLogged">
        <b-button v-b-toggle.sidebar-1 class="btnmenu" variant="success">Menu</b-button>
        <b-sidebar id="sidebar-1" backdrop title="Menu" shadow>
          <div class="px-3 py-2">
          <b-col class="btnsidebar"><b-button block variant="primary" size="lg" to="/">Inicio</b-button></b-col>
          <b-col class="btnsidebar"><b-button block variant="primary" size="lg" to="/myprofile">Mi Perfil</b-button></b-col>
          <br>
          <b-col class="btnsidebar"><b-button block variant="success" size="lg" to="/users">Administrar Usuarios</b-button></b-col>
          <b-col class="btnsidebar"><b-button block variant="success" size="lg" to="/boardgames">Administrar Juegos</b-button></b-col>
          <b-col class="btnsidebar"><b-button block variant="success" size="lg" to="/reviews">Administrar Reseñas</b-button></b-col>
          <b-col class="btnsidebar"><b-button block variant="success" size="lg" to="/games">Administrar Partidas</b-button></b-col>
          <b-col class="btnsidebar"><b-button block variant="success" size="lg" to="/comments">Administrar Comentarios</b-button></b-col>
          <b-col class="btnsidebar"><b-button block variant="success" size="lg" to="/likes">Administrar Likes</b-button></b-col>
          <b-col class="btnsidebar"><b-button block variant="success" size="lg" to="/posts">Administrar Posts</b-button></b-col>
          <br>
          <b-col class="btnsidebar"><b-button block @click="logout()" variant="danger" size="lg">Salir</b-button></b-col>
          <b-img fluid height="50%" src="@/assets/greendice.png"/>
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

.navbar.navbar-dark.bg-dark {
  background-color: green !important;
  border-radius: 25px 0px 0px 25px;
}

.green-bg {
  background-color: green;
}

</style>
