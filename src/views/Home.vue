<template>
  <div class="home">
    <div v-if="isLogged">
<p>bienvenido</p>

    </div>
    <div class="md-card md-primary md-theme-demo-light" v-else>
      <div >
      <br /><br /><br />
      <h1>¡Hola!</h1>
      <h2>
        ¡Para acceder a la página debes identificarte primero!
      </h2>
      <br />
      <p>
        ¡Si no tienes cuenta, puedes acerte una haciendo click
        <router-link to="/register">aquí!</router-link>
      </p>
      <p>
        ¡Si tienes cuenta, identificate
        <router-link to="/login">aquí!</router-link>
      </p>
    </div>
    </div>
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
