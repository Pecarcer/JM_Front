<template>
  <form>
    <p class="h4 text-center mb-4">Añadir User</p>
    <br />
    <div class="grey-text">
      <div class="four wide field">
        <input v-model="nick" type="text" placeholder="Nick" />
      </div>
      <div class="four wide field">
        <input type="email" v-model="email" placeholder="Email" />
      </div>
      <div class="four wide field">
        <input type="password" v-model="password" placeholder="Contraseña" />
      </div>
      <div class="four wide field">
        <input
          type="password"
          v-model="password_confirmation"
          placeholder="Confirma Contraseña"
        />
      </div>
      <div class="four wide field">
        <input type="text" v-model="fullname" placeholder="Nombre Completo" />
      </div>
      <div class="four wide field">
        <select v-model="role">
          <option value="user" selected>Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
    </div>
    <br />
    <div class="text-center">
      <button color="primary" @click="saveUser()">Añadir</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "AddUser",

  data() {
    return {
      nick: "",
      email: "",
      role: "",
      password: "",
      password_confirmation: "",
      fullname: "",
    };
  },
  methods: {
    saveUser() {
      let self = this;
      axios
        .post("http://127.0.0.1:8000/api/users/add", {
          nick: this.nick,
          email: this.email,
          role: this.role,
          password: this.password,
          password_confirmation: this.password_confirmation,
          fullname: this.fullname,
        })
        .then(
          self.$router.push('/users')
        )
        .catch((e) => {
          alert(e);
        });
    },
  },
};
</script>

<style scoped></style>
