<!--
<template>
  <div id="app">
    <div id="nav"  v-if="isLogged">
      <router-link to="/">Home</router-link> |
      <router-link to="/about" v-if="isLogged">About</router-link>
      <router-link to="/login" v-else>Login</router-link>
      |
      <button type="button" @click="logout()" v-if="isLogged">
        Logout
      </button>
    </div>
    <router-view/>
  </div>
</template>-->

<template>
<div id="app">
    <div v-if="isLogged">
        <b-button v-b-toggle.sidebar-1 class="btnmenu">Menu</b-button>
        <b-sidebar id="sidebar-1" backdrop title="Menu" shadow>
          <div class="px-3 py-2">
          <b-col class="btnsidebar"><b-button block ><router-link to="/">Home</router-link></b-button></b-col>
          <b-col class="btnsidebar"><b-button block><router-link to="/about">About</router-link></b-button></b-col>
          <b-col class="btnsidebar"><b-button block><router-link to="/">Usuarios</router-link></b-button></b-col>
          <b-col class="btnsidebar"><b-button block><router-link to="/">Juegos</router-link></b-button></b-col>
          <b-col class="btnsidebar"><b-button block><router-link to="/">Reseñas</router-link></b-button></b-col>
          <b-col class="btnsidebar"><b-button block><router-link to="/">Salas</router-link></b-button></b-col>
          <b-col class="btnsidebar"><b-button block><router-link to="/">Partidas</router-link></b-button></b-col>
          <b-col class="btnsidebar"><b-button block><router-link to="/">Perfil</router-link></b-button></b-col>
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
