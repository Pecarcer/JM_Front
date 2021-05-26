<template>
  <div>
    <h4 class="text-center">Juegos de Mesa</h4>
    <br />
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Creador</th>
          <th>Publicación</th>
          <th>Jugadores Min.</th>
          <th>Jugadores Max</th>
          <th>Duración</th>
          <th>Edad Mín.</th>
          <th>Editorial</th>
          <th>Imagen</th>
          <th>Acciones</th>


        </tr>
      </thead>
      <tbody>
        <tr v-for="boardgame in boardgames" :key="boardgame.id">
          <td>{{ boardgame.id }}</td>
          <td>{{ boardgame.title }}</td>
          <td>{{ boardgame.creator }}</td>
          <td>{{ boardgame.release }}</td>
          <td>{{ boardgame.min_num_players }}</td>
          <td>{{ boardgame.max_num_players}}</td>
          <td>{{ boardgame.playing_time }}</td>
          <td>{{ boardgame.ages }}</td>
          <td>{{ boardgame.publisher }}</td>
          <td>{{ boardgame.image }}</td>

          <td>
            <div class="btn-group" role="group">
              <button class="btn btn-primary" @click="editBoardgame(boardgame.id)">
                Editar
              </button>
              <button class="btn btn-danger" @click="confirmarDelete(boardgame.id)">
                Borrar
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <button type="button" class="btn btn-info">
      <router-link to="/addboardgame">Añadir Juego</router-link>
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      boardgames: [],
      url: "http://127.0.0.1:8000/api/boardgames",
    };
  },
  methods: {
    getBoardgames() {
      axios.get(this.url).then((data) => {
        this.boardgames = data.data;
      });
    },
    editBoardgame(idToEdit) {
      this.$router.push('/boardgames/edit/'+idToEdit)
    },

    deleteBoardgame(idToDelete) {
      axios
        .delete("/boardgames/delete/" + idToDelete)
        .then(() => {
          this.getBoardgames();
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
            this.deleteBoardgame(idToDelete);
          }
        },
      });
    },
  },
  created() {
    this.getBoardgames();
  },
};
</script>
