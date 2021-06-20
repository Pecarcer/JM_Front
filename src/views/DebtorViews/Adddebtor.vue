<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Añadir Deudor</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-navbar-brand right>
            {{ this.currentUser.nick }}
          </b-navbar-brand>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-row>
      <b-col></b-col>
      <b-col>
        <div class="card">
          <div class="form-group">
            <label>Usuario</label>
            <select v-model="user" class="form-control form-control-lg">
              <option v-for="item in users" :value="item.id" :key="item.id">{{
                item.nick
              }}</option>
            </select>
          </div>

          <div class="form-group">
            <label>Meses de retraso</label>
            <input
              type="text"
              name="score"
              v-model="months_overdue"
              class="form-control form-control-lg"
            />
          </div>

          <button class="btn btn-lg btn-block" @click="saveDebtor">
            Añadir
          </button>

          <b-button class="btn btn-lg btn-block volver" to="/boardgames">
            Volver
          </b-button>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  metaInfo: {
    title: "Añadir Deudor | JuegosMesapp",
  },

  data() {
    return {
      user: "",
      months_overdue: "",
      users: [],
    };
  },
  methods: {
    /*
     * Saves the new debtor
     */
    saveDebtor() {
      let self = this;
      axios
        .post("/debtors/add", {
          user: this.user,
          months_overdue: this.months_overdue,
        })
        .then(self.$router.push("/debtors"))
        .catch((e) => {
          alert(e);
        });
    },
    /*
    * Gets all the users
    @param idToDelete the id of the element to delete
    */
    getUsers() {
      axios.get("/users").then((data) => {
        this.users = data.data;
      });
    },
  },
  created() {
    this.currentUser = JSON.parse(localStorage.user).user;
    if (this.currentUser.role != "Admin") {
      this.$router.push("/users");
    } else {
      this.getUsers();
    }
  },
};
</script>

<style scoped>
.card {
  margin: 35px;
  border: 0;
}
button {
  background-color: green;
  color: white;
}
.volver {
  margin-top: 5px;
}
</style>
