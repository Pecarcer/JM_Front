<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Usuarios</b-navbar-brand>
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
      <b-col></b-col>
      <b-col>
        <div class="cuadritobusqueda">
          <b-col lg="6" class="my-1">
            <b-form-group
              label="Filter"
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
                  placeholder="Type to Search"
                ></b-form-input>

                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''"
                    >Clear</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
        </div>
      </b-col>
      <br />
  <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          pills
        >
        </b-pagination>
      <b-col>
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
      </b-col>
      <b-row align-v="center">
      

        <div class="pag">
           Pag.
        <b-form-group>
         
          <b-form-select
            style="width: 75px"
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
            
          >
          </b-form-select>
        </b-form-group>
        </div>
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
      transProps: "flip-list",
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
  },
  created() {
    this.getUsers();
  },
  computed: {
    rows() {
      return this.items.length;
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
}
.rightth {
  border-top-right-radius: 25px;
}
.leftth {
  border-top-left-radius: 25px;
}
.bottomleft {
  border-bottom-left-radius: 25px;
}
.bottomright {
  border-bottom-right-radius: 25px;
}
col {
  border: none;
}
table {
  border: none;
}

.navbar.navbar-dark.bg-dark {
  background-color: green !important;
  border-radius: 25px;
}

.thead {
  max-width: 300px;
  padding: 20px;
}

.cuadritobusqueda {
  background-color: green;
  color: white;
  border-radius: 25px;
}

.green-bg {
  background-color: green;
  border-radius: 25px;
}

.form-group{
  padding: 20px;
}

.pag{
  background: green;
  color: white;
  border-radius: 50px;
}
</style>
