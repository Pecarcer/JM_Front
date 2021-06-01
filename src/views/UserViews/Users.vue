<template>
  <div>
    <h4 class="text-center">Usuarios</h4>
    <br />
    <b-container>
      <b-col></b-col>
      <b-col>
        <b-table-simple striped hover borderless class="table table-bordered">
          <thead>
            <tr>
              <th class="leftth">ID</th>
              <th>Nick</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Full name</th>
              <th>Avatar</th>
              <th class="rightth">Acciones</th>
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
            </tr>
          </tbody>
        </b-table-simple>
      </b-col>
      <b-col></b-col>
    </b-container>

    <button type="button" class="btn btn-info">
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
      url: "http://127.0.0.1:8000/api/users"
    };
  },
  methods: {
    getUsers() {
      axios.get(this.url).then((data) => {
        this.users = data.data;
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
        message: "Are you sure?",
        button: {
          no: "No",
          yes: "Yes",
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
};
</script>

<style scoped>
th,.tablefooter{
  text-align: center;
  color: white;
  background: green;
}
.rightth{
  border-top-right-radius: 25px;
}
.leftth{
  border-top-left-radius:25px;
}
.bottomleft{
  border-bottom-left-radius: 25px;
}
.bottomright{
  border-bottom-right-radius: 25px;

}
col{
  border: none;
}
table{
  border: none;
}
</style>
