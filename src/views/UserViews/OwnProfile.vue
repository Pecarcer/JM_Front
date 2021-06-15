<template>
  <!--<h1>Este es tu propio perfil</h1>-->
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Mi perfil</b-navbar-brand>
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
      <b-row class="info">
        <b-col></b-col>
        <b-col>
          <b-card
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            bg-variant="success"
          >
            <b-card-text>
              Nick <span class="valor">{{ this.currentUser.nick }} </span>
            </b-card-text>
          </b-card>

          <b-card
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            bg-variant="success"
          >
            <b-card-text>
              Nombre Completo <br /><br /><span class="valor"
                >{{ this.currentUser.fullname }}
              </span>
            </b-card-text>
          </b-card>

          <b-card
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            bg-variant="success"
          >
            <b-card-text>
              Rol <span class="valor">{{ this.currentUser.role }} </span>
            </b-card-text>
          </b-card>

          <b-card
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            bg-variant="success"
          >
            <b-card-text>
              Usuario desde
              <span class="valor"
                >{{ this.currentUser.created_at | moment("DD/MM/YYYY") }}
              </span>
            </b-card-text>
          </b-card>
          <b-button type="button" to="/editMyself" class="newbtn">
            Editar Datos
          </b-button>
        </b-col>
        <b-col></b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-table
            striped
            hover
            :items="reviews"
            :fields="fields"
            caption-top
            thead-class="green-bg text-white rounded-top"
          >
            <template #table-caption>Reseñas del Usuario</template>

            <template v-slot:cell(verJuego)="data">
                <button
                class="btn btn-success"
                @click="visitGamePage(data.boardgame_id)"
              >
                Ver Juego
              </button>
            </template>

      <template v-slot:cell(created_at)="data">
             {{ data.item.created_at | moment("DD/MM/YYYY") }}
            </template>

          </b-table>




          <div class="divider div-transparent div-stopper"></div>
          Partidas creadas por el Usuario





          <div class="divider div-transparent div-stopper"></div>
          Partidas en las que participó el usuario
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import "../../store/index.js";

export default {
  metaInfo: {
    title: "Mi perfil | JuegosMesapp",
  },
  data() {
    return {
      reviews: [],
      gamesByUser: [],
      gamesWithUser: [],
      fields: [
        {
          key: "id",
          tdClass: "text-center"
        },
        {
          key: "boardgameName",
          sortable: true,
          label: "Juego",
          tdClass: "text-center"
        },
        {
          key: "score",
          sortable: true,
          label: "Nota",
          tdClass: "text-center"
        },
        {
          key: "opinion",
          tdClass: "text-center"
        },
        {
          key: "created_at",
          sortable: true,
          label: "Fecha",
          tdClass: "text-center"
        },
        {
          key: "verJuego",
          tdClass: "text-center",
          label: "",
        },
      ],
    };
  },

  methods: {
    getReviews() {
      this.idToSearch = this.currentUser.id;
      this.urlReviews = "http://127.0.0.1:8000/api/reviews/madeby/";
      this.urlReviews = this.urlReviews.concat(this.idToSearch.toString());

      axios.get(this.urlReviews).then((data) => {
        this.reviews = data.data;
        console.log(data);
      });
    },
    getGamesByUser() {},
    getGamesWithUser() {},
  },

  created() {
    this.currentUser = JSON.parse(localStorage.user).user;
    this.getReviews();
    //this.getGamesByUser();
    //this.getGamesWithUser();
  },

  computed: {},
  mounted() {},
};
</script>

<style scoped>
.info {
  margin: 15px;
}

.mb-2 {
  border-radius: 50px;
}
.valor {
  background-color: white;
  padding: 10px;
  border-radius: 25px;
}
.newbtn {
  text-align: center;
  color: white;
  background: green;
  margin: 20px;
}

.divider {
  position: relative;
  margin-top: 20px;
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

.tablefooter,
.newbtn {
  text-align: center;
  color: white;
  background: green;
  margin: 20px;
}

col {
  border: none;
}
table {
  border: none;
}

.navbar.navbar-dark.bg-dark {
  background-color: green !important;
  border-radius: 25px 0px 0px 25px;
}

.thead {
  max-width: 300px;
  padding: 20px;
}

.green-bg {
  background-color: green;
}
</style>
