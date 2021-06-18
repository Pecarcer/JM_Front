<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Editar Deudor</b-navbar-brand>
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
      <b-row>
        <b-col></b-col>
        <b-col class="alert">
          <b-alert variant="danger" :show="showAlert">
            Credenciales incorrectas
          </b-alert>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col>
          <div class="card">            


                <div class="form-group">
                <label>Usuario</label>
                <input
                  type="text"
                  name="score"
                  v-model="debtor.debtorNick"
                  class="form-control form-control-lg"
                  disabled
                />
              </div>

              <div class="form-group">
                <label>Meses de retraso</label>
                <input
                  type="text"
                  name="score"
                  v-model="debtor.months_overdue"
                  class="form-control form-control-lg"
                />
              </div>


              <button class="btn btn-lg btn-block" @click="saveDebtorChanges()">
                Editar
              </button>
               <b-button class="btn btn-lg btn-block" to="/debtors">
                Volver
              </b-button>
          </div>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
      metaInfo: {
    title: "Editar Deudor | JuegosMesapp",
  },
  data() {
    return {
      showAlert: false,
      debtor: []
    };
  },
  created() {
    this.currentUser = JSON.parse(localStorage.user).user;
    if (this.currentUser.role != "Admin") {
      this.$router.push("/debtors");
    } else {
      axios
        .get(`http://127.0.0.1:8000/api/debtors/edit/${this.$route.params.id}`)
        .then((response) => {
          this.debtor = response.data[0];
        });

    }
  },
  methods: {
    saveDebtorChanges() {
      let self = this;
      axios
        .post(
          `http://127.0.0.1:8000/api/debtors/update/${this.$route.params.id}`,
          this.debtor
        )
        .then(self.$router.push("/debtors"))
        .catch((err) => {
          console.log(err);
          this.showAlert = true;
        });
    },
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
</style>
