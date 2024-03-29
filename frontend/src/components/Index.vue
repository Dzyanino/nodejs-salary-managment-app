<template>
  <v-container fluid>
      <v-responsive>
          <v-row class="">
            <v-col cols="12" md="5">
              <Graphe />
            </v-col>
            <v-col cols="12" md="7">
              <Table />
            </v-col>
          </v-row>
      </v-responsive>
  </v-container>
</template>

<script setup>
import Table from './layouts/Table.vue';
import Graphe from './layouts/Graphe.vue';
</script>
