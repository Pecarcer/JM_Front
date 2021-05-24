<template>
  <form>
    <p class="h4 text-center mb-4">Añadir User</p>
    <br />
    <div class="grey-text">
      <div class="four wide field">
        <input type="text" name="nick" placeholder="Nick" />
      </div>
      <div class="four wide field">
        <input type="email" name="email" placeholder="Email" />
      </div>
      <div class="four wide field">
        <input type="password" name="password" placeholder="Contraseña" />
      </div>
      <div class="four wide field">
        <input
          type="password"
          name="conPassword"
          placeholder="Confirma Contraseña"
        />
      </div>
      <div class="four wide field">
        <input type="text" name="fullname" placeholder="Nombre Completo" />
      </div>
      <div class="four wide field">
        <select name="role">
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
      url: "http://127.0.0.1:8000/api/users/add",
      nick: "",
      email: "",
      role: "",
      password: "",
      fullname: "",
    };
  },
  methods:{
     saveUser(){
      axios.post(this.url,{ 
          'nick':this.nick,
          'email':this.email,
          'role':this.role,
          'password': this.password,
          'fullname': this.fullname
      }).then(
        console.log("Se añadió el user")
      )
      .catch(function (error) {
          console.log(error);
      });
  },
}
};
</script>

<style scoped></style>
