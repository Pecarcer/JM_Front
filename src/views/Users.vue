<template>
  <div>
    <h4 class="text-center">Usuarios</h4>
    <br />
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nick</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Full name</th>
          <th>Avatar</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.nick }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.fullname }}</td>
          <td>{{ user.avatar }}</td>

          <td>
            <div class="btn-group" role="group">
              <router-link
                :to="{ name: 'edituser', params: { id: user.id } }"
                class="btn btn-primary"
                >Editar
              </router-link>
              <button class="btn btn-danger" @click="confirmarDelete(user.id)">
                Borrar
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <button
      type="button"
      class="btn btn-info"
     >
      <router-link to="/adduser">Añadir Usuario</router-link>
    </button>
  </div>
</template>

<script>

import axios from "axios";

export default { 

  data() {
    return {
      users: [],
      url: "http://127.0.0.1:8000/api/users",
    };
  },
  methods: {
    getUsers() {
      axios.get(this.url).then((data) => {
        this.users = data.data;
      });
    },

    deleteUser(idToDelete) {
      axios
        .delete( this.url + "/delete/" + idToDelete)
        .then(() => {
          this.getUsers();
        })
        .catch((e) => {
          alert(e);
        });
    },
     confirmarDelete(idToDelete){
      this.$confirm(
        {
          message: 'Are you sure?',
          button: {
            no: 'No',
            yes: 'Yes'
          },
          callback: confirm => {
            if(confirm){
              this.deleteUser(idToDelete)
            }
          }
        }
      )
    }
  },
  created() {
    this.getUsers();
  },
};
</script>
