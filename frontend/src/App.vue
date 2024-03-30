<template>
  <v-app>
    <v-app-bar scroll-behavior="elevate" class="bg-white">
      <template v-slot:prepend>
        <v-app-bar-nav-icon class="hidden-sm-and-up rounded" @click.stop="navigation = !navigation">
        </v-app-bar-nav-icon>
      </template>
      <v-app-bar-title class="d-none d-sm-flex text-button">Gestion des salaires des enseignants</v-app-bar-title>
      <!-- <template v-slot:append>
        <v-list-item class="rounded d-none d-sm-flex">
          <a class="text-black text-decoration-none text-button" href="#tableau">Tableau</a>
        </v-list-item>
        <v-list-item class="rounded d-none d-sm-flex">
          <a class="text-black text-decoration-none text-button" href="#graphe">Graphe</a>
        </v-list-item>
      </template> -->
    </v-app-bar>

    <v-navigation-drawer temporary v-model="navigation" class="bg-white">
      <v-list-item class="hidden-sm-and-up">
        <v-list-item-title class="text-overline text-wrap">
          Gestion des salaires des enseignants
        </v-list-item-title>
        <v-list-item-subtitle class="text-overline">
          Sujet N° 11
        </v-list-item-subtitle>
      </v-list-item>
      <v-divider class="mt-2 hidden-sm-and-up"></v-divider>
      <v-list-item link prepend-icon="mdi-table" class="py-4">
        <a href="#tableau" class="text-decoration-none text-overline">Tableau</a>
      </v-list-item>
      <v-list-item link prepend-icon="mdi-chart-bar" class="py-4">
        <a href="#graphe" class="text-decoration-none text-overline">Graphe</a>
      </v-list-item>
    </v-navigation-drawer>

    <v-main class="bg-teal-lighten-4">
      <Index />
    </v-main>

  </v-app>
</template>

<script setup>
import { ref } from "vue";
import Index from "./components/Index.vue";

const navigation = ref(false);
</script>
