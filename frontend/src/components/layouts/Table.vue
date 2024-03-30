<template>
  <v-container fluid>
    <v-responsive class="align-center text-center">
      <v-data-table id="tableau" :headers="tableHeaders" :items="tableItems" class="elevation-1 rounded">
        <template v-slot:headers>
          <tr>
            <template v-for="header in tableHeaders" :key="header.value">
              <th class="text-button text-left border-e">{{ header.title }}</th>
            </template>
          </tr>
        </template>

        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.nom }}</td>
            <td>{{ item.nbHeure }}</td>
            <td>{{ item.tauxHoraire }}</td>
            <td>{{ item.nbHeure * item.tauxHoraire }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { $get } from "../../plugins/axios"

const tableHeaders = ref([
  { title: "Nom", value: "nom", sortable: true },
  { title: "Nombre d'heures", value: "nbHeure", sortable: true },
  { title: "Taux horaire", value: "tauxHoraire", sortable: true },
  { title: "Salaire", value: "salaire" },
  { title: "Action", value: "action" },
]);

const tableItems = ref([]);


onMounted(() => {
  tableItems.value = $get("enseignants");
})
</script>
