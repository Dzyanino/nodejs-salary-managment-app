<template>
  <v-container fluid>
    <v-responsive>
      <v-row class="d-flex align-center">
        <v-col cols="12" md="4">
          <Graphe />
        </v-col>
        <v-col cols="12" md="8">
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
