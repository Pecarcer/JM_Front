<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Juego {{ currentBoardgame.title }}</b-navbar-brand>
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
              Nombre
              <span class="valor">{{ this.currentBoardgame.title }} </span>
            </b-card-text>
          </b-card>

          <b-card
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            bg-variant="success"
          >
            <b-card-text>
              Creador
              <span class="valor">{{ this.currentBoardgame.creator }} </span>
            </b-card-text>
          </b-card>

          <b-card
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            bg-variant="success"
          >
            <b-card-text>
              Jugadores
              <span class="valor">
                de {{ this.currentBoardgame.min_num_players }} a
                {{ this.currentBoardgame.max_num_players }}
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
              Duración
              <span class="valor"
                >{{ this.currentBoardgame.playing_time }}
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
              A partir de
              <span class="valor">{{ this.currentBoardgame.ages }} años </span>
            </b-card-text>
          </b-card>

          <b-card
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            bg-variant="success"
          >
            <b-card-text>
              Editorial
              <span class="valor">{{ this.currentBoardgame.publisher }} </span>
            </b-card-text>
          </b-card>
          <b-card
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            bg-variant="success"
          >
            <b-card-text>
              Publicado en
              <span class="valor"
                >{{ this.currentBoardgame.release | moment("DD/MM/YYYY") }}
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
                @click="visitGamePage(data.boardgame_id)"
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
      <b-row>
        <b-col></b-col>
        <b-col>
          <div>
            <div id="itemList">
              <div class="blogPost" v-for="item in reviews" :key="item.id">
                <b-card
                  :header="'Por ' + item.reviewerName" Success
                  header-tag="header"
                  :title="'Nota: ' + item.score + '/10 '"
                     class="text-center"
                     border-variant="success"
                     header-bg-variant="success"
                >
                  <b-card-text> "{{ item.opinion }}" <br> <span class="float-right">{{ item.created_at | moment("DD/MM/YYYY") }}</span></b-card-text>

                  <b-button @click="visitReview(item.id)" variant="primary">Ver comentarios</b-button>
                </b-card>
                <div class="divider div-transparent div-stopper"></div>
                <br>
              </div>
            </div>
          </div>
          <!--
          <div>
            <div id="itemList">
              <div class="blogPost" v-for="item in reviews" :key="item.id">
                <div>
                  <h4>escrito por {{ item.reviewerName }}</h4>
                  opinion {{ item.opinion }} <br />
                  score {{ item.score }} <br />
                  Publicado en {{ item.created_at | moment("DD/MM/YYYY") }}
                </div>
                <div class="divider div-transparent div-stopper"></div>
              </div>
            </div>
          </div> -->
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import "../../store/index.js";


export default {


  metaInfo: {
    title: "Juego de Mesa | JuegosMesapp",
  },
  data() {
    return {
      reviews: [],
      currentBoardgame: "",
    };
  },

  methods: {
    getReviews() {
      this.idToSearch = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
      );
      this.urlReviews = "http://127.0.0.1:8000/api/reviews/ofBoardgame/";
      this.urlReviews = this.urlReviews.concat(this.idToSearch.toString());

      axios.get(this.urlReviews).then((data) => {
        this.reviews = data.data;
      });
    },

    visitReview(idToVisit) {
      this.$router.push("/reviews/profile/" + idToVisit);
    },
  },

  created() {
    this.currentUser = JSON.parse(localStorage.user).user;

    axios
      .get(`http://127.0.0.1:8000/api/boardgames/edit/${this.$route.params.id}`)
      .then((response) => {
        this.currentBoardgame = response.data;
      });
    this.getReviews();
    this.getComments();
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
