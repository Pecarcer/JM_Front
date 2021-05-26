<template>
  <form>
    <p class="h4 text-center mb-4">Editar User</p>
    <br />
    <div class="grey-text">
      <div class="four wide field">
        <input v-model="user.nick" type="text" />
      </div>
      <div class="four wide field">
        <input type="email" v-model="user.email" />
      </div>
      <div class="four wide field">
        <input type="password" v-model="user.password" />
      </div>
      <div class="four wide field">
        <input
          type="password"
          v-model="user.password_confirmation"
          placeholder="Confirma Contraseña"
        />
      </div>
      <div class="four wide field">
        <input type="text" v-model="user.fullname" />
      </div>
      <div class="four wide field">
        <select v-model="user.role">
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
    </div>
    <br />
    <div class="text-center">
      <button color="primary" @click="saveUserChanges()">Guardar</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    axios
      .get(`http://127.0.0.1:8000/api/users/edit/${this.$route.params.id}`)
      .then((response) => {
        this.user = response.data;
        console.log(response.data);
      });
  },
  methods: {
    saveUserChanges() {
      let self = this;
      axios
        .post(
          `http://127.0.0.1:8000/api/users/update/${this.$route.params.id}`,
          this.user
        )
        .then(self.$router.push("/users"));
    },
  },
};
</script>
