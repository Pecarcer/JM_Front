<template>
  <div class="home">
    <div v-if="isLogged">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand>Inicio</b-navbar-brand>
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
          
          <b-col>
            <div class="header">
              <h2>¡Bienvenido!</h2>
              <h4>¡Echa un vistazo a las últimas novedades!</h4>
            </div>

            <div>
              <div id="itemList">
                <div class="blogPost" v-for="item in items" :key="item.id">
                  <div>
                    <h4>{{ item.title }}</h4>
                    {{ item.post_text }} <br />
                    Por {{ item.posterNick }} <br />
                    Publicado en {{ item.created_at | moment("DD/MM/YYYY") }}
                  </div>
                  <div class="divider div-transparent div-stopper"></div>
                </div>
              </div>
            </div>
          </b-col>
         
        </b-row>
      </b-container>
    </div>

    <div class="md-card md-primary md-theme-demo-light" v-else>
      <div>
        <br /><br /><br />
        <h1>¡Hola!</h1>
        <h2>
          ¡Para acceder a la página debes identificarte primero!
        </h2>
        <br />
        <p>
          ¡Si no tienes cuenta, puedes hacerte una haciendo click
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
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  metaInfo: {
    title: "Inicio | JuegosMesapp",
  },
  data() {
    return {
      items: [],
      url: "http://127.0.0.1:8000/api/posts",
      currentPage: 1,
      perPage: 3,
      rows: 1,
    };
  },
  computed: {
    ...mapGetters(["isLogged"]),
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    getPosts() {
      if (this.isLogged) {
        axios.get(this.url).then((data) => {
          this.items = data.data;
        });
      }
    },
  },
  created() {
    this.getPosts();
    this.rows = this.items.length;
    this.currentUser = JSON.parse(localStorage.user).user;
  },
};
</script>

<style scoped>
.navbar.navbar-dark.bg-dark {
  background-color: green !important;
  border-radius: 25px 0px 0px 25px;
}
.blogPost {
  margin: 25px;
  padding: 15px;
}

.divider {
  position: relative;
  margin-top: 90px;
  height: 1px;
}

.div-transparent:before {
  content: "";
  position: absolute;
  top: 0;
  left: 5%;
  right: 5%;
  width: 90%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    transparent,
    rgb(48, 49, 51),
    transparent
  );
}

.div-stopper:after {
  content: "";
  position: absolute;
  z-index: 1;
  top: -6px;
  left: calc(50% - 7px);
  width: 14px;
  height: 12px;
  background-color: white;
  border-left: 1px solid rgb(48, 49, 51);
  border-right: 1px solid rgb(48, 49, 51);
}

.header {
  padding: 20px;
  margin: 10px;
}
</style>
