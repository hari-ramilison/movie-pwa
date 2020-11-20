<template>
  <q-page class="constrain-more q-pa-md"> 
    <div class="q-pa-md">
      <q-card flat bordered dense>
        <q-card-section>
        <div class="text-h6">{{pageTitle}}</div>
        </q-card-section>
        <q-separator />
        <form @submit.prevent="submitMovie"> 
        <q-card-section>
                <div class="q-ma-md">
                    <q-input v-model="movieToSubmit.title" class="col col-sm-6" label="Title *" dense/>
                </div>
                <div class="q-ma-md">
                    <q-input v-model="movieToSubmit.description" class="col col-sm-6" label="Description" dense/>
                </div>
                <div class="q-ma-md">
                    <q-input v-model="movieToSubmit.year" class="col col-sm-6" label="Year *" dense/>
                </div>
                <div class="q-ma-md">
                    <q-input v-model="movieToSubmit.rating" class="col col-sm-6" label="Rating" dense/>
                </div>
        </q-card-section>
        <q-card-actions align="center">
        <div class="row justify-center q-mt-lg">
            <q-btn
                type="submit" 
                :disable="!movieToSubmit.title || !movieToSubmit.year"
                color="black"
                rounded
                :label="labelbutton"
                unelevated
            /> 
        </div>
        </q-card-actions>
        </form>    
      </q-card>
    </div>   
  </q-page>
</template>
<script>
import {uid} from 'quasar'
import { db } from '../boot/firebase'

export default {
  name: 'PageMovieCreate',
  data(){
    return{
      id: "",    
      movieToSubmit:{
        description:'',
        title: '',
        year:'',
        rating: ''
      },
      pageTitle: "Add New Movie",
      isUpdate: false,
      labelbutton: "Add movie"
    }
  },
  created() {
    if (this.$route.params.pk) {
      this.id = this.$route.params.pk
      this.pageTitle = "Edit Movie"
      this.labelbutton = "Update Movie"
      this.isUpdate = true;
      let dbRef = db.collection('movies').doc(this.$route.params.pk)
      dbRef.get().then((doc) => {
        this.movieToSubmit = doc.data()
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  methods:{
    submitMovie() {
      if(!this.isUpdate){
        this.addMovie(this.movieToSubmit)
        this.$router.push('/movie-list')
      } else{
        this.updateMovie(this.id, this.movieToSubmit)
        this.$router.push('/movie-list')
      }
    },
    addMovie(){
      event.preventDefault()
      db.collection('movies').add(this.movieToSubmit).then(() => {
        console.log('Movie successfully created!')
        this.movieToSubmit.title = ''
        this.movieToSubmit.description = ''
        this.movieToSubmit.year = ''
        this.movieToSubmit.rating = ''
      }).catch((error) => {
        console.log(error)
      })
    },
    updateMovie(uid, movieUpdated) {
      event.preventDefault()
      db.collection('movies').doc(uid)
        .update(movieUpdated).then(() => {
          console.log('Movie successfully updated!')
        }).catch((error) => {
          console.log(error)
        })
      }      
  },
  watch:{
    '$route' (to, from){
        if(to['path'] === "/movie-create"){
            Object.assign(this.$data, this.$options.data())
        }
    }
    },
}
 </script> 