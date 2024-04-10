<template>
  <v-container fluid>
    <v-responsive class="align-center text-center">
      <v-row class="align-center mb-2 mb-md-0">
        <v-col cols="12" md="6">
          <v-text-field single-line hide-details clearable flat rounded="pill" v-model="search" variant="solo"
            bg-color="white" label="Rechercher" prepend-inner-icon="mdi-magnify"
            class="border rounded-pill"></v-text-field>
        </v-col>
        <v-col cols="12" md="3" offset-md="3" class="d-flex justify-end">
          <v-btn prepend-icon="mdi-plus" color="primary" @click="displayAddDialog()">Ajouter</v-btn>
        </v-col>
      </v-row>
      <v-data-table hover fixed-header id="tableau" :headers="tableHeaders" :items="tableItems" :search="search"
        height="500" class="border rounded-lg">

        <template v-slot:headers>
          <tr>
            <template v-for="header in tableHeaders" :key="header.value">
              <th class="text-button">{{ header.title }}</th>
            </template>
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

                <v-list class="rounded-lg">
                  <v-list-item link prepend-icon="mdi-pencil"
                    @click="displayEditDialog(item.numEns)">Editer</v-list-item>
                  <v-divider></v-divider>
                  <v-list-item link prepend-icon="mdi-delete" class="text-red-accent-4"
                    @click="displayDeleteDialog(item.numEns)">Supprimer</v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </template>

        <template v-slot:no-data>
          <tr>
            <td>Rien n'a été trouvé</td>
          </tr>
        </template>
      </v-data-table>

      <v-dialog v-model="dialogEditer" scrollable persistent max-width="650px" transition="dialog-bottom-transition">
        <v-card class="px-2 py-4" rounded="lg">
          <v-card-title primary-title>Editer</v-card-title>
          <v-card-item>
            <v-row class="pt-2">

              <v-col cols="12">
                <v-text-field rounded="lg" variant="outlined" label="Nom" v-model="nomEnseignant"></v-text-field>
              </v-col>

              <v-col cols="12" md="5">
                <v-text-field rounded="lg" variant="outlined" label="Nombre d'heures"
                  v-model="nbHeureEnseignant"></v-text-field>
              </v-col>

              <v-col cols="12" md="6" offset="0" offset-md="1">
                <v-text-field rounded="lg" variant="outlined" label="Taux horaire"
                  v-model="tauxHoraireEnseignant"></v-text-field>
              </v-col>

            </v-row>
          </v-card-item>
          <v-card-actions class="justify-end">
            <v-btn flat color="secondary" @click="dialogEditer = false">Annuler</v-btn>
            <v-btn flat color="primary" @click="editerEnseignant(choosen.numEns)">Confirmer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogSupprimer" scrollable persistent max-width="650px" transition="dialog-bottom-transition">
        <v-card class="px-2 py-4" rounded="lg">
          <v-card-title primary-title>Supprimer</v-card-title>
          <v-card-item>
            <p>Voulez-vous supprimer cette ligne ?</p>
            <v-row class="pt-2">
              <v-col cols="12">
                <v-table class="border-t border-b py-2">
                  <tr>
                    <td>{{ choosen.nom }}</td>
                    <td>{{ choosen.nbHeure }}</td>
                    <td>{{ choosen.tauxHoraire }}</td>
                    <td>{{ choosen.nbHeure * choosen.tauxHoraire }}</td>
                  </tr>
                </v-table>
              </v-col>
            </v-row>
          </v-card-item>
          <v-card-actions class="justify-end">
            <v-btn flat color="secondary" @click="dialogSupprimer = false">Annuler</v-btn>
            <v-btn flat color="error" @click="supprimerEnseignant(choosen.numEns)">Confirmer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogAjouter" scrollable persistent max-width="850px" transition="dialog-bottom-transition">
        <v-card class="px-2 py-4" rounded="lg">
          <v-card-title primary-title>Ajouter</v-card-title>
          <v-card-item>
            <v-row class="pt-2">

              <v-col cols="12">
                <v-text-field rounded="lg" variant="outlined" label="Nom" v-model="nomNew"></v-text-field>
              </v-col>

              <v-col cols="12" md="5">
                <v-text-field rounded="lg" variant="outlined" label="Nombre d'heures"
                  v-model="nbHeureNew"></v-text-field>
              </v-col>

              <v-col cols="12" md="6" offset="0" offset-md="1">
                <v-text-field rounded="lg" variant="outlined" label="Taux horaire"
                  v-model="tauxHoraireNew"></v-text-field>
              </v-col>

            </v-row>
          </v-card-item>
          <v-card-actions class="justify-end">
            <v-btn flat color="secondary" @click="dialogAjouter = false">Annuler</v-btn>
            <v-btn flat color="primary" @click="ajouterEnseignant()">Confirmer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { $get, $post, $delete } from "../../plugins/axios"

const tableHeaders = [
  { title: "Nom", value: "nom", sortable: true, width: "30%" },
  { title: "Nombre d'heures", value: "nbHeure", sortable: true, width: "20%" },
  { title: "Taux horaire", value: "tauxHoraire", sortable: true, width: "20%" },
  { title: "Salaire", value: "salaire", width: "20%" },
  { title: "Action", value: "salaire", width: "10%" }
];

const tableItems = ref([]);
const maxies = ref([]);

const search = ref(null);

let message = null;

const dialogEditer = ref(false);
const dialogSupprimer = ref(false);
const dialogAjouter = ref(false);

const choosen = ref([]);
const nomEnseignant = ref(null);
const nbHeureEnseignant = ref(null);
const tauxHoraireEnseignant = ref(null);

const nomNew = ref(null);
const nbHeureNew = ref(null);
const tauxHoraireNew = ref(null);

const retrieve = async () => {
  tableItems.value = await $get("enseignants");
  maxies.value = await $get("maxies");
}
onMounted(async () => {
  retrieve();
});


const prepareData = (idEnseignant) => {
  choosen.value = tableItems.value.filter(item => {
    return item.numEns == idEnseignant;
  })
  choosen.value = choosen.value.shift();
}

const displayEditDialog = (idEnseignant) => {
  prepareData(idEnseignant);
  nomEnseignant.value = choosen.value.nom;
  nbHeureEnseignant.value = choosen.value.nbHeure;
  tauxHoraireEnseignant.value = choosen.value.tauxHoraire;
  dialogEditer.value = true;
};
const displayDeleteDialog = (idEnseignant) => {
  prepareData(idEnseignant);
  dialogSupprimer.value = true;
}
const displayAddDialog = () => {
  nomNew.value = null;
  nbHeureNew.value = null;
  tauxHoraireNew.value = null;

  dialogAjouter.value = true;
}


const editerEnseignant = async (idEnseignant) => {
  message = await $post("edit-enseignant", {
    numEns: idEnseignant,
    nom: nomEnseignant.value,
    nbHeure: nbHeureEnseignant.value,
    tauxHoraire: tauxHoraireEnseignant.value
  });

  dialogEditer.value = false;
  retrieve();
  console.log(message.message);
};

const supprimerEnseignant = async (idEnseignant) => {
  message = await $delete("remove-enseignant/" + idEnseignant);
  dialogSupprimer.value = false;
  retrieve();
  console.log(message.message);
};

const ajouterEnseignant = async () => {
  message = await $post("add-enseignant", {
    nom: nomNew.value,
    nbHeure: nbHeureNew.value,
    tauxHoraire: tauxHoraireNew.value
  });

  dialogAjouter.value = false;
  retrieve();
  console.log(message.message);
}
</script>
