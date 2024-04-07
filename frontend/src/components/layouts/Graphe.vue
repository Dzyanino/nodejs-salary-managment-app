<template>
  <div class="flip-card my-16">
    <div class="flip-card-inner bg-white rounded-lg elevation-16">
      <div class="flip-card-front">
        <canvas id="graphe" class="px-4 py-1">
        </canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { $get } from "../../plugins/axios"

const dest = ref(null);
const items = ref([]);

onMounted( async () => {
  dest.value = document.getElementById("graphe");
  items.value = await $get("maxies");
  // console.log(items.value[0].minSalaire);

  new Chart(dest.value, {
    type: "doughnut",
    data: {
      labels: ["SALAIRE MINIMUM", "SALAIRE MAXIMUM", "MONTANT TOTAL"],
      datasets: [{
        label: "",
        data: [items.value[0].minSalaire, items.value[0].maxSalaire, items.value[0].totalSalaire],
        backgroundColor: [
          "#FFECB3",
          "#B2DFDB",
          "#F0F4C3"
        ],
        borderColor: [
          "#ff0000",
          "#00e64d",
          "#0099ff"
        ],
        borderWidth: 3
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
})
</script>

<style scoped>

.flip-card {
  background-color: transparent;
  perspective: 1000px;
}

.flip-card-inner {
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card .flip-card-inner {
  transform: rotateY(20deg);
}

.flip-card-front {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
</style>
