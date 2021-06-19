<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Reseña de {{currentReview.boardgameName}}</b-navbar-brand>
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
      <b-row class="info">
        <b-col>
          <b-card
            :header="'Reseña de ' + currentReview.reviewerName"
            header-text-variant="white"
            header-tag="header"
            :title="'Nota: ' + currentReview.score + '/10 '"
            class="text-center"
            border-variant="success"
            header-bg-variant="success"
          >
            <b-card-text>
              "{{ currentReview.opinion }}" <br />
              <span class="float-right">{{
                currentReview.created_at | moment("DD/MM/YYYY")
              }}</span></b-card-text
            >
          </b-card>
          <br />

          <div>
            <p>
              Likes:
              <span v-for="item in likes" :key="item.id">
                <button class="btn btn-primary separado" disabled>
                  {{ item.likeAuthor }}
                </button>
              </span>
            </p>

            <div v-if="!liked">
              <button class="btn btn-success" @click="addLike()">
                ¡Me gusta!
              </button>
            </div>
            <div v-else>
              <button class="btn btn-danger" @click="removeLike()">
                ¡Ya no me gusta!
              </button>
            </div>
          </div>

          <div class="divider div-transparent div-stopper"></div>
          <br />

          <div class="form-group">
            <input
              type="text"
              name="newCommentary"
              v-model="newCommentary"
              placeholder="Añade nuevo comentario..."
              class="form-control form-control-lg"
            />
          </div>
          <button type="submit" class="btn btn-success" @click="addComment()">
            Comentar
          </button>
          <div class="divider div-transparent div-stopper"></div>

          <br />

          <br />
          <p>Comentarios:</p>

          <div class="blogPost" v-for="item in comments" :key="item.id">
            <b-card
              class="text-center"
              border-variant="success"
              header-bg-variant="success"
            >
              <b-card-text>
                "{{ item.commentary }}" <br />
                <span class="float-right">
                  Por {{ item.commentAuthor }} en
                  {{ item.created_at | moment("DD/MM/YYYY") }}</span
                ></b-card-text
              >
            </b-card>
            
            <br />
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col> </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import "../../store/index.js";

export default {
  metaInfo: {
    title: "Reseñas | JuegosMesapp",
  },
  data() {
    return {
      currentReview: "",
      comments: "",
      likes: [],
      newCommentary: "",
      author: "",
      review_id: "",
      liked: false,
    };
  },

  methods: {
    getReview() {
      this.idToSearch = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
      );
      this.urlReview = "/reviews/getWithName/";
      this.urlReview = this.urlReview.concat(this.idToSearch.toString());

      axios.get(this.urlReview).then((data) => {
        this.currentReview = data.data[0];
      });
    },

    getComments() {
      this.idToSearch = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
      );
      this.urlComments = "/comments/on/";
      this.urlComments = this.urlComments.concat(this.idToSearch.toString());

      axios.get(this.urlComments).then((data) => {
        this.comments = data.data;
      });
    },

    getLikes() {
      this.idToSearch = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
      );
      this.urlLikes = "/likes/on/";
      this.urlLikes = this.urlLikes.concat(this.idToSearch.toString());

      axios.get(this.urlLikes).then((data) => {
        this.likes = data.data;
        this.checkUserLike();
      });
    },
    addLike() {
      this.review_id = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
      );

      axios
        .post("/likes/add", {
          user: this.currentUser.id,
          review: this.review_id,
        })
        .then(this.getLikes)
        .catch((e) => {
          alert(e);
        });
      this.getLikes();
      this.liked=true;
    },
    removeLike() {
      this.idToSearch = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
      );
      this.urlcheck = "/likes/check/";
      this.urlcheck = this.urlcheck.concat(this.currentUser.id.toString());
      this.urlcheck = this.urlcheck.concat("/");
      this.urlcheck = this.urlcheck.concat(this.idToSearch.toString());

      axios.get(this.urlcheck).then((data) => {
        this.likeToDelete = data.data[0];
           axios
        .delete("/likes/delete/" + this.likeToDelete.id)
        .then(() => {
          this.getLikes();
          this.liked=false;
        })
        .catch((e) => {
          alert(e);
        });
      });

   
    },

    addComment() {
      this.review_id = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
      );

      axios
        .post("/comments/add", {
          author: this.currentUser.id,
          review_id: this.review_id,
          commentary: this.newCommentary,
        })
        .then(this.getComments)
        .then((this.newCommentary = ""))
        .catch((e) => {
          alert(e);
        });
    },

    checkUserLike() {
      this.likes.forEach((like) => {
        if (like.user === this.currentUser.id) {          
          this.liked = true;
        }
        
      });
    },
  },

  created() {
    this.currentUser = JSON.parse(localStorage.user).user;
    this.getReview();
    this.getComments();
    this.getLikes();

  },
};
</script>

<style scoped>
.info {
  margin: 15px;
}

.mb-2 {
  border-radius: 50px;
}
.valor {
  background-color: white;
  padding: 10px;
  border-radius: 25px;
}
.newbtn {
  text-align: center;
  color: white;
  background: green;
  margin: 20px;
}

.divider {
  position: relative;
  margin-top: 20px;
  height: 1px;
}

.div-transparent:before {
  content: "";
  position: absolute;
  top: 0;
  left: 5%;
  right: 5%;
  width: 90%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    transparent,
    rgb(48, 49, 51),
    transparent
  );
}

.div-stopper:after {
  content: "";
  position: absolute;
  z-index: 1;
  top: -6px;
  left: calc(50% - 7px);
  width: 14px;
  height: 12px;
  background-color: white;
  border-left: 1px solid rgb(48, 49, 51);
  border-right: 1px solid rgb(48, 49, 51);
}

.tablefooter,
.newbtn {
  text-align: center;
  color: white;
  background: green;
  margin: 20px;
}

col {
  border: none;
}
table {
  border: none;
}

.navbar.navbar-dark.bg-dark {
  background-color: green !important;
  border-radius: 25px 0px 0px 25px;
}

.thead {
  max-width: 300px;
  padding: 20px;
}

.green-bg {
  background-color: green;
}
.separado {
  margin: 2px;
}
</style>
