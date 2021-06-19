<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Perfil de {{ profileUser.nick }}</b-navbar-brand>
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
              Nick <span class="valor">{{ this.profileUser.nick }} </span>
            </b-card-text>
          </b-card>

          <b-card
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            bg-variant="success"
          >
            <b-card-text>
              Email <span class="valor">{{ this.profileUser.email }} </span>
            </b-card-text>
          </b-card>

          <b-card
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            bg-variant="success"
          >
            <b-card-text>
              Nombre <span class="valor">{{ this.profileUser.fullname }} </span>
            </b-card-text>
          </b-card>

          <b-card
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            bg-variant="success"
          >
            <b-card-text>
              Rol <span class="valor">{{ this.profileUser.role }} </span>
            </b-card-text>
          </b-card>

          <b-card
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            bg-variant="success"
          >
            <b-card-text>
              Registrado en
              <span class="valor"
                >{{ this.profileUser.created_at | moment("DD/MM/YYYY") }}
              </span>
            </b-card-text>
          </b-card>

          <div class="divider div-transparent div-stopper"></div>
        </b-col>
        <b-col></b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-table
            striped
            show-empty
            hover
            :items="reviews"
            :fields="fieldsReview"
            caption-top
            thead-class="green-bg text-white rounded-top"
          >
            <template #table-caption
              >Reseñas de {{ profileUser.nick }}
            </template>

            <template v-slot:cell(verJuego)="data">
              <button
                class="btn btn-success"
                @click="visitGamePage(data.item.boardgame_id)"
              >
                Ver Juego
              </button>
            </template>

            <template v-slot:cell(created_at)="data">
              {{ data.item.created_at | moment("DD/MM/YYYY") }}
            </template>
          </b-table>

          <b-table
            striped
            hover
            :items="gamesByUser"
            :fields="fieldsGamesByUser"
            caption-top
            show-empty
            thead-class="green-bg text-white rounded-top"
          >
            <template #table-caption
              >Partidas creadas por {{ profileUser.nick }}
            </template>
            <template v-slot:cell(date)="data">
              {{ data.item.date | moment("DD/MM/YYYY") }}
            </template>
          </b-table>

          <b-table
            striped
            hover
            :items="gamesWithUser"
            :fields="fieldsGamesWithUser"
            caption-top
            show-empty
            thead-class="green-bg text-white rounded-top"
          >
            <template #table-caption
              >Partidas en las que {{ profileUser.nick }} participó</template
            >
            <template v-slot:cell(date)="data">
              {{ data.item.date | moment("DD/MM/YYYY") }}
            </template>
          </b-table>
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
    title: "Perfiles | JuegosMesapp",
  },
  data() {
    return {
      reviews: [],
      gamesByUser: [],
      gamesWithUser: [],
      profileUser: "",
      fieldsReview: [
        {
          key: "id",
          tdClass: "text-center",
        },
        {
          key: "boardgameName",
          sortable: true,
          label: "Juego",
          tdClass: "text-center",
        },
        {
          key: "score",
          sortable: true,
          label: "Nota",
          tdClass: "text-center",
        },
        {
          key: "opinion",
          tdClass: "text-center",
        },
        {
          key: "created_at",
          sortable: true,
          label: "Fecha",
          tdClass: "text-center",
        },
        {
          key: "verJuego",
          tdClass: "text-center",
          label: "",
        },
      ],
      fieldsGamesByUser: [
        {
          key: "id",
          tdClass: "text-center",
        },
        {
          key: "boardgameName",
          sortable: true,
          label: "Juego",
          tdClass: "text-center",
        },
        {
          key: "date",
          sortable: true,
          label: "Fecha",
          tdClass: "text-center",
        },
      ],
      fieldsGamesWithUser: [
        {
          key: "id",
          tdClass: "text-center",
        },
        {
          key: "boardgameName",
          sortable: true,
          label: "Juego",
          tdClass: "text-center",
        },
        {
          key: "date",
          sortable: true,
          label: "Fecha",
          tdClass: "text-center",
        },
      ],
    };
  },

  methods: {
    getReviews() {
      this.idToSearch = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
      );
      this.urlReviews = "/reviews/madeby/";
      this.urlReviews = this.urlReviews.concat(this.idToSearch.toString());

      axios.get(this.urlReviews).then((data) => {
        this.reviews = data.data;
      });
    },
    getGamesByUser() {
      this.idToSearch = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
      );
      this.urlGamesByUser = "/games/madeby/";
      this.urlGamesByUser = this.urlGamesByUser.concat(
        this.idToSearch.toString()
      );

      axios.get(this.urlGamesByUser).then((data) => {
        this.gamesByUser = data.data;
      });
    },
    getGamesWithUser() {
      this.idToSearch = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
      );
      this.urlGamesWithUser = "/players/with/";
      this.urlGamesWithUser = this.urlGamesWithUser.concat(
        this.idToSearch.toString()
      );

      axios.get(this.urlGamesWithUser).then((data) => {
        this.gamesWithUser = data.data;
      });
    },
    visitGamePage(idToVisit) {
      this.$router.push("/boardgames/profile/" + idToVisit);
    },
  },

  created() {
    this.currentUser = JSON.parse(localStorage.user).user;
    axios
      .get(`/users/edit/${this.$route.params.id}`)
      .then((response) => {
        this.profileUser = response.data;
      });
    this.getReviews();
    this.getGamesByUser();
    this.getGamesWithUser();
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
