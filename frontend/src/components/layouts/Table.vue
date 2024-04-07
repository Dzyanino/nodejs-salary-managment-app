<template>
  <v-container fluid>
    <v-responsive class="align-center text-center">
      <v-data-table id="tableau" :headers="tableHeaders" :items="tableItems" class="elevation-1 rounded">
        <template v-slot:headers>
          <tr>
            <template v-for="header in tableHeaders" :key="header.value">
              <th class="text-button">{{ header.title }}</th>
            </template>
            <th class="text-button text-center">Action</th>
          </tr>
        </template>

        <template v-slot:item="{ item }">
          <tr>
            <td class="text-left">{{ item.nom }}</td>
            <td class="text-left">{{ item.nbHeure }}</td>
            <td class="text-left">{{ item.tauxHoraire }}</td>
            <td class="text-left">{{ item.nbHeure * item.tauxHoraire }}</td>
            <td class="text-center">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn flat variant="plain" icon="mdi-dots-vertical" size="small" v-bind="props"></v-btn>
                </template>

                <v-list>
                  <v-list-item link prepend-icon="mdi-pencil"
                    @click="displayEditDialog(item.numEns)">Editer</v-list-item>
                  <v-divider></v-divider>
                  <v-list-item link prepend-icon="mdi-delete" class="text-red-accent-4">Supprimer</v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </template>

        <!-- <template v-slot:footers>
          <p>{{ maxies[0].minSalaire }}</p>
        </template> -->
      </v-data-table>

      <v-dialog v-model="dialog" scrollable persistent max-width="500px" transition="dialog-bottom-transition">
        <v-card>
          <v-card-title primary-title>Editer</v-card-title>
          <v-card-item>
            <v-row class="pt-2">

              <v-col cols="12">
                <v-text-field variant="outlined" label="Nom" v-model="nomEnseignant"></v-text-field>
              </v-col>

              <v-col cols="12" md="5">
                <v-text-field variant="outlined" label="Nombre d'heures" v-model="nbHeureEnseignant"></v-text-field>
              </v-col>

              <v-col cols="12" md="6" offset="0" offset-md="1">
                <v-text-field variant="outlined" label="Taux horaire"  v-model="tauxHoraireEnseignant"></v-text-field>
              </v-col>

            </v-row>
          </v-card-item>
          <v-card-actions class="justify-end">
            <v-btn flat color="secondary" @click="dialog = false">Annuler</v-btn>
            <v-btn flat color="primary" @click="editerEnseignant(choosen.numEns)">Confirmer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { $get, $post } from "../../plugins/axios"

const tableHeaders = [
  { title: "Nom", value: "nom", sortable: true },
  { title: "Nombre d'heures", value: "nbHeure", sortable: true },
  { title: "Taux horaire", value: "tauxHoraire", sortable: true },
  { title: "Salaire", value: "salaire" }
];

const tableItems = ref([]);
const maxies = ref([]);

let message = null;

const choosen = ref([]);
const dialog = ref(false);
const nomEnseignant = ref(null);
const nbHeureEnseignant = ref(null);
const tauxHoraireEnseignant = ref(null);


onMounted(async () => {
  tableItems.value = await $get("enseignants");
  maxies.value = await $get("maxies");
});


const displayEditDialog = (idEnseignant) => {
  choosen.value = tableItems.value.filter(item => {
    return item.numEns == idEnseignant;
  })
  choosen.value = choosen.value.shift();

  nomEnseignant.value = choosen.value.nom;
  nbHeureEnseignant.value = choosen.value.nbHeure;
  tauxHoraireEnseignant.value = choosen.value.tauxHoraire;
  dialog.value = true;
};

const editerEnseignant = async (idEnseignant) => {
  message = await $post("edit-enseignant", {
    numEns: idEnseignant,
    nom: nomEnseignant.value,
    nbHeure: nbHeureEnseignant.value,
    tauxHoraire: tauxHoraireEnseignant.value
  });

  dialog.value = false;
  window.location.reload();
  console.log(message.message);
};
</script>
