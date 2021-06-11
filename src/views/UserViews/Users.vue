<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Usuarios</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
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
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>

        <b-table
          striped
          hover
          borderless
          fixed
          :per-page="perPage"
          :current-page="currentPage"
          :items="items"
          :fields="fields"
          class="table table-bordered"
        >
          

          <template v-slot:cell(acciones)="data">
            <div class="btn-group" role="group">
              <button class="btn btn-primary" @click="editUser(data.item.id)">
                Editar
              </button>
              <button class="btn btn-danger" @click="confirmarDelete(data.item.id)">
                Borrar
              </button>
            </div>
          </template>

          <!--<td>
                <div class="btn-group" role="group">
                  <button class="btn btn-primary" @click="editUser(user.id)">
                    Editar
                  </button>
                  <button
                    class="btn btn-danger"
                    @click="confirmarDelete(user.id)"
                  >
                    Borrar
                  </button>
                </div>
              </td>
            </tr>

            <tr class="tablefooter">
              <th class="bottomleft"></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th class="bottomright"></th>
            </tr>-->
        </b-table>
      </b-col>
      <b-col> </b-col>
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
      fields: [
        {
          key: "id",
          sortable: true,
        },
        {
          key: "nick",
          sortable: true,
          label: "Nick",
        },
        {
          key: "email",
          sortable: true,
        },
        {
          key: "role",
          sortable: true,
          label: "Rol",
        },
        {
          key: "fullname",
          sortable: true,
          label: "Nombre Completo",
        },
        {
          key: "avatar",
          sortable: false,
        },
        {
          key: "acciones",
          sortable: false,
          label: "Acciones",
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

<style scoped>
th,
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
</style>
