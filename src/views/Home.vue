<template>
  <v-container>
    <div class="p-6 space-y-4">
      <h1 class="font-bold text-2xl">Available Movies</h1>
      <v-row>
        <v-col
          cols="2"
          v-for="(movie, i) in availableMovies"
          :key="`available-movie-${i}`"
        >
          <v-card>
            <v-img :src="movie.image" height="280px"></v-img>

            <v-card-title> {{ movie.title }} </v-card-title>

            <v-card-subtitle> </v-card-subtitle>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text :to="`/booking/${movie.id}`">
                Book Now
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import movies from "../data/movies";

export default {
  name: "Home",
  data: () => ({
    availableMovies: movies,
    upcomingMovies: [],
  }),
  components: {},
};
</script>
