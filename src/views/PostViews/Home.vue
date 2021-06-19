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
              <br />
              <b-img fluid height="70%" width="100%" src="@/assets/icon2.png" />
              <b-img fluid height="70%" width="100%" src="@/assets/icon.png" />
              <b-img fluid height="70%" width="100%" src="@/assets/icon3.png" />
              <b-img fluid height="70%" width="100%" src="@/assets/icon4.png" />
              <b-img fluid height="70%" width="100%" src="@/assets/icon5.png" />
              <b-img fluid height="70%" width="100%" src="@/assets/icon6.png" />
            </div>

            <div id="itemList">
              <div class="blogPost" v-for="item in items" :key="item.id">
                <b-card
                  :header="item.title"
                  Success
                  header-tag="header"
                  header-text-variant="white"
                  class="text-center"
                  border-variant="success"
                  header-bg-variant="success"
                >
                  <b-card-text>
                    {{ item.post_text }} <br /><br />
                    Por {{ item.posterNick }} el
                    {{ item.created_at | moment("DD/MM/YYYY") }}
                  </b-card-text>
                </b-card>
                <div class="divider div-transparent div-stopper"></div>
                <br />
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <!--
          <b-pagination
            @change="onPageChanged"
            :total-rows="totalRows"
            :per-page="perPage"
            v-model="currentPage"
            class="my-0"
          />-->
        </b-row>
      </b-container>
    </div>

    <div class="md-card md-primary md-theme-demo-light" v-else>
      <div>
        <br>
        <b-img width='500' height='300' src="@/assets/inicio.png" />
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
      url: "/posts",
      currentPage: 1,
      perPage: 3,
      totalRows: "",
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
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
    },
    paginate(page_size, page_number) {
      let itemsToParse = this.items;
      this.paginatedItems = itemsToParse.slice(
        page_number * page_size,
        (page_number + 1) * page_size
      );
    },
  },
  created() {
    this.currentUser = JSON.parse(localStorage.user).user;
    this.getPosts();
    this.totalRows = this.items.length;    
    this.paginate(this.perPage, 0);
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
