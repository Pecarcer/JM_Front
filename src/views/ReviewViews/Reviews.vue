<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Reseñas</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-navbar-brand right>
            {{ this.currentUser.nick }}
          </b-navbar-brand>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <br />
    <b-container>
      <b-row>
        <b-col lg="6" class="my-1">
          <b-form-group
            label="Buscar"
            label-for="filter-input"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder=""
              ></b-form-input>

              <b-input-group-append>
                <b-button
                  class="btnlimpiar bg-success text-white"
                  :disabled="!filter"
                  @click="filter = ''"
                  >Limpiar</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col lg="6" class="my-1">
          <b-form-group
            label="Filtrar por"
            description="No marques ninguno para buscar en todos los registros"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
            v-slot="{ ariaDescribedby }"
          >
            <b-form-checkbox-group
              v-model="filterOn"
              :aria-describedby="ariaDescribedby"
              class="mt-1"
            >
              <b-form-checkbox value="author">Autor</b-form-checkbox>
              <b-form-checkbox value="boardgameName">Juego</b-form-checkbox>
              <b-form-checkbox value="opinion">Opinion</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            pills
          >
          </b-pagination>
        </b-col>
        <b-col>
          <b-form-group>
            <b-form-select
              style="width: 75px"
              id="per-page-select"
              v-model="perPage"
              :options="pageOptions"
              size="sm"
              class="float-right"
            >
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-table
          thead-class="green-bg text-white rounded-top"
          striped
          hover
          borderless
          :per-page="perPage"
          :current-page="currentPage"
          :items="items"
          :fields="fields"
          class="table rounded-circle text-center"
          :filter="filter"
          :filter-included-fields="filterOn"
          show-empty
          @filtered="onFiltered"
        >
          <template v-slot:cell(acciones)="data">
            <div class="btn-group" role="group">
              <button class="btn btn-primary" @click="editReview(data.item.id)">
                Editar
              </button>
              <button
                class="btn btn-danger"
                @click="confirmarDelete(data.item.id)"
              >
                Borrar
              </button>
            </div>
          </template>

          <template v-slot:cell(score)="data">
            {{ data.item.score }}/10
          </template>

          <template v-slot:cell(verResenas)="data">
            <button
              class="btn btn-success"
              @click="visitBoardgameProfile(data.item.boardgame_id)"
            >
              Ver
            </button>
          </template>
        </b-table>
      </b-row>
    </b-container>

    <b-button type="button" to="/addreview" class="newbtn">
      Añadir Reseña
    </b-button>
  </div>
</template>

<script>
import axios from "axios";
import "../../store/index.js";

export default {
  metaInfo: {
    title: "Reseñas | JuegosMesapp",
  },
  data() {
    return {
      items: [],
      url: "http://127.0.0.1:8000/api/reviews",
      perPage: 5,
      currentPage: 1,
      SortBy: "",
      pageOptions: [5, 10, 15, 20, 100],
      filter: null,
      filterOn: [],
      fields: [
        {
          key: "id",
          sortable: true,
          class: "text-center",
        },
        {
          key: "author",
          sortable: true,
          label: "Autoría",
          class: "text-center",
        },
        {
          key: "boardgameName",
          sortable: true,
          class: "text-center",
          label: "Juego",
        },
        {
          key: "score",
          sortable: true,
          label: "Nota",
          class: "text-center",
        },
        {
          key: "opinion",
          sortable: false,
          class: "text-center",
          label: "Crítica",
        },

        {
          key: "verResenas",
          sortable: false,
          label: "",
          class: "text-center",
        },
        {
          key: "acciones",
          sortable: false,
          label: "Acciones",
          tdClass: "thead",
        },
      ],
    };
  },

  methods: {
    getReviews() {
      axios.get(this.url).then((data) => {
        this.items = data.data;
      });
    },

    editReview(idToEdit) {
      this.$router.push("/reviews/edit/" + idToEdit);
    },

    deleteReview(idToDelete) {
      axios
        .delete("/reviews/delete/" + idToDelete)
        .then(() => {
          this.getReviews();
        })
        .catch((e) => {
          alert(e);
        });
    },
    confirmarDelete(idToDelete) {
      this.$confirm({
        message: "¿Estás seguro?",
        button: {
          no: "No",
          yes: "Sí",
        },
        callback: (confirm) => {
          if (confirm) {
            this.deleteReview(idToDelete);
          }
        },
      });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.rows = filteredItems.length;
      this.currentPage = 1;
    },
    visitBoardgameProfile(idToVisit) {
      this.$router.push("/boardgames/profile/" + idToVisit);
    },
  },

  created() {
    this.getReviews();
    this.rows = this.items.length;
    this.currentUser = JSON.parse(localStorage.user).user;
  },

  computed: {
    rows() {
      return this.items.length;
    },

    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    // Set the initial number of items
    this.rows = this.items.length;
  },
};
</script>

<style>
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

.pag {
  background: green;
  color: white;
}

btn {
  background-color: green;
}
b-button {
  background-color: green;
}
</style>
