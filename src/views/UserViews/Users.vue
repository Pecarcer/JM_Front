<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Usuarios</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- poner avatar y nombre-->
          </b-nav-item-dropdown>
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
                <b-button class="btnlimpiar bg-success text-white" :disabled="!filter" @click="filter = ''"
                  >Limpiar</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col lg="6" class="my-1">
          <b-form-group
            v-model="sortDirection"
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
              <b-form-checkbox value="nick">Nick</b-form-checkbox>
              <b-form-checkbox value="email">Email</b-form-checkbox>
              <b-form-checkbox value="fullname">Nombre</b-form-checkbox>
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
          <b-form-group >
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
          id="table-transition-example"
          thead-class="green-bg text-white rounded-top"
          striped
          hover
          borderless
          :per-page="perPage"
          :current-page="currentPage"
          :items="items"
          :fields="fields"
          class="table rounded-circle"
          :tbody-transition-props="transProps"
          :filter="filter"
          :filter-included-fields="filterOn"
          @filtered="onFiltered"
        >
          <template v-slot:cell(acciones)="data">
            <div class="btn-group" role="group">
              <button class="btn btn-primary" @click="editUser(data.item.id)">
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
        </b-table>
      </b-row>
    </b-container>

    <b-button type="button" to="/adduser" class="newbtn">
      Añadir Usuario
    </b-button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [],
      url: "http://127.0.0.1:8000/api/users",
      perPage: 5,
      currentPage: 1,
      transProps: { name: "flip-list" },
      pageOptions: [5, 10, 15, 20, 100],
      fields: [
        {
          key: "id",
          sortable: true,
          tdClass: "thead",
        },
        {
          key: "nick",
          sortable: true,
          label: "Nick",
          tdClass: "thead",
        },
        {
          key: "email",
          sortable: true,
          tdClass: "thead",
        },
        {
          key: "role",
          sortable: true,
          label: "Rol",
          tdClass: "thead",
        },
        {
          key: "fullname",
          sortable: true,
          label: "Nombre Completo",
          tdClass: "thead",
        },
        {
          key: "avatar",
          sortable: false,
          tdClass: "thead",
        },
        {
          key: "acciones",
          sortable: false,
          label: "Acciones",
          tdClass: "thead",
        },
      ],
      filter: null,
      filterOn: [],
    };
  },

  methods: {
    getUsers() {
      axios.get(this.url).then((data) => {
        this.items = data.data;
      });
    },
    editUser(idToEdit) {
      this.$router.push("/users/edit/" + idToEdit);
    },

    deleteUser(idToDelete) {
      axios
        .delete("/users/delete/" + idToDelete)
        .then(() => {
          this.getUsers();
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
            this.deleteUser(idToDelete);
          }
        },
      });
    },
    onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
  },
  created() {
    this.getUsers();
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

/*
.cuadritobusqueda {
  background-color: green;
  color: white;
}*/

.green-bg {
  background-color: green;
}

.pag {
  background: green;
  color: white;
}

btn{
  background-color: green;
}
</style>
