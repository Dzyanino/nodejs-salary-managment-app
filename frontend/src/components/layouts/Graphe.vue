<template>
  <div id="graphe" class="container mt-16 pt-16">
    <canvas id="yoo"></canvas>
  </div>
</template>

<script setup>
const dest = document.getElementById("yoo");

new Chart(dest, {
  type: "bar",
  data: {
    labels: ["Salaire minimum", "Salaire maximum", "Montant total"],
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
</script>
