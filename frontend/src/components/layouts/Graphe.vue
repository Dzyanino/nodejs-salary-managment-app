<template>
    <canvas id="graphe" class="bg-white">
    </canvas>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const dest = document.getElementById("graphe");

  new Chart(dest, {
    type: "doughnut",
    data: {
      labels: ["SALAIRE MINIMUM", "SALAIRE MAXIMUM", "MONTANT TOTAL"],
      datasets: [{
        label: "",
        data: [15, 25, 5],
        backgroundColor: [
          "#ffb3b3",
          "#66ff99",
          "#80ccff"
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
#chart {
  transform: rotateY(5deg);
}
</style>
