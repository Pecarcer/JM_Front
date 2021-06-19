<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Comentarios</b-navbar-brand>
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
              <b-form-checkbox value="authorNick">Autor</b-form-checkbox>
              <b-form-checkbox value="commentary">Comentario</b-form-checkbox>
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
          class="table rounded-circle"
          :filter="filter"
          :filter-included-fields="filterOn"
          show-empty
          @filtered="onFiltered"
        >
          <template v-slot:cell(acciones)="data">
            <div class="btn-group" role="group">
              <button
                class="btn btn-primary"
                @click="editComment(data.item.id)"
              >
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

            <template v-slot:cell(created_at)="data">
              {{ data.item.created_at | moment("DD/MM/YYYY") }}
            </template>

          <template v-slot:cell(verResena)="data">
            <button class="btn btn-success" @click="visitReview(data.item.review_id)">
              Ver
            </button>
          </template>
        </b-table>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import "../../store/index.js";

export default {
  metaInfo: {
    title: "Comentarios | JuegosMesapp",
  },
  data() {
    return {
      items: [],
      url: "/comments",
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
          tdClass: "thead",
        },
        {
          key: "authorNick",
          sortable: true,
          label: "Autor",
          tdClass: "thead",
        },
        {
          key: "commentary",
          sortable: false,
          tdClass: "thead",
          label: "Comentario"
        },
     
        {
          key: "created_at",
          sortable: true,
          label: "Fecha",
          tdClass: "thead",
        },
           {
          key: "verResena",
          sortable: false,
          label: "Reseña",
          tdClass: "thead",
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
    getComments() {
      axios.get(this.url).then((data) => {
        this.items = data.data;
      });
    },

    editComment(idToEdit) {
      this.$router.push("/comments/edit/" + idToEdit);
    },

    deleteComment(idToDelete) {
      axios
        .delete("/comments/delete/" + idToDelete)
        .then(() => {
          this.getComments();
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
            this.deleteComment(idToDelete);
          }
        },
      });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.rows = filteredItems.length;
      this.currentPage = 1;
    },
    visitReview(idToVisit) {
      this.$router.push("/reviews/profile/" + idToVisit);
    },
  },

  created() {
    this.currentUser = JSON.parse(localStorage.user).user;
    if (this.currentUser.role != "Admin") { this.$router.push("/"); } else {
    this.getComments();
    this.rows = this.items.length;}    
  },

  computed: {
    /*rows() {
      return this.items.length;
    },*/

    rows: {
      get: function() {
        return this.items.length;
      },

      set: function(newValue) {
        this.items.length = newValue;
      },
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
