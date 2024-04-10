<template>
  <div class="flip-card my-16">
    <div class="flip-card-inner border rounded-xl bg-white">
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

const retrieve = async () => {
  items.value = await $get("maxies");
  items.value = items.value.shift();
}
onMounted(async () => {
  dest.value = document.getElementById("graphe");
  await retrieve();
  new Chart(dest.value, {
    type: "doughnut",
    data: {
      labels: ["SALAIRE MINIMUM", "SALAIRE MAXIMUM", "MONTANT TOTAL"],
      datasets: [{
        data: [items.value.minSalaire, items.value.maxSalaire, items.value.totalSalaire],
        backgroundColor: [
          "#FFECB3",
          "#B2DFDB",
          "#F0F4C3"
        ],
        borderColor: [
          "rgba(0, 0, 0, 0.1)"
        ],
        borderWidth: 3
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      aspectRation: 1,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
})
</script>

<style scoped>
.flip-card {
  background-color: transparent;
  perspective: 1500px;
}

.flip-card-inner {
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(20deg);
}

.flip-card-front {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
</style>
