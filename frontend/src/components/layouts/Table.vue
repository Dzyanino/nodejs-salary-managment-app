<template>
  <v-container fluid>
    <v-responsive class="align-center text-center">
      <v-data-table id="tableau" :headers="headers" class="elevation-1 rounded">
        <template v-slot:headers>
          <tr>
            <template v-for="header in headers" :key="header.value">
              <th class="text-button text-center">{{ header.title }}</th>
            </template>
          </tr>
        </template>
      </v-data-table>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const headers = ref([
  { title: "Nom", value: "nom", sortable: true },
  { title: "Nombre d'heures", value: "nbHeure", sortable: true },
  { title: "Taux horaire", value: "tauxHoraire", sortable: true },
  { title: "Salaire", value: "salaire" },
  { title: "Action", value: "action" },
]);
</script>
