<template>
  <q-page class="constrain-more q-pa-md">
       <template>
          <q-card class="card-post q-mb-md" 
              flat bordered
              v-for="movie in movies" 
              :key="movie.key"
            >
              <q-item>
                <q-item-section class="q-pt-md">
                  <div class="row">
                    <div class="col-11">
                      <q-item-label class="text-h6">{{movie.title}}</q-item-label>
                      <q-item-label caption>
                        {{movie.year}}
                      </q-item-label>
                    </div>
                    <div class="col-1">  
                      <q-btn flat round dense @click="promptToDelete(movie.key)" icon="eva-trash-outline" size="10px"/>  
                      <q-btn flat round dense @click="updateMovie(movie.key)" icon="eva-edit-outline" size="10px"/>
                    </div>
                  </div>  
                </q-item-section>
              </q-item>

              <q-separator />
              <q-card-section v-if="movie.description">
                <div class="text-caption text-black">Description: {{movie.description}}</div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="text-caption text-black">Rating: {{movie.rating}}</div>
              </q-card-section>
            </q-card>
        </template>
  </q-page>
</template>

<script>
import { db } from '../boot/firebase'

export default {
  name: 'PageMovieList',
  data(){
    return{
        movies: []
    }
  },
  created () {
    db.collection('movies').onSnapshot((snapshotChange) => {
      this.movies = []
      snapshotChange.forEach((doc) => {
        this.movies.push({
          key: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          year: doc.data().year,
          rating: doc.data().rating
        })
      })
    })
  },

  methods:{
      promptToDelete(id) {
        this.$q.dialog({
          title: 'Confirm',
          message: 'Really delete?',
          ok: { push: true },
          cancel: { color: 'negative' },
          persistent: true
        }).onOk(() => {
          this.deleteMovie(id)
        })
      }, 
    updateMovie(id) {
      this.$router.push('/movie-create/' + id);
    },
    deleteMovie (id) {
      db.collection('movies').doc(id).delete().then(() => {
      console.log('Movie deleted!')
    })
  }
  }
}
</script>
