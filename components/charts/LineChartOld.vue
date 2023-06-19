<template>
    <div>
        <canvas id="line-chart"/>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, LineController, CategoryScale, PointElement, LineElement, LinearScale } from 'chart.js'

Chart.register(LineController, CategoryScale, PointElement, LineElement, LinearScale)

const chart = ref(null)

onMounted(() => {
  const ctx = document.getElementById('line-chart').getContext('2d')

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: '#f87979',
        backgroundColor: '#f87979'
      },
      {
        label: 'Dataset 2',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: '#7CFC00',
        backgroundColor: '#7CFC00'
      }
    ]
  }
  const config = {
    type: 'line',
    data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        }
      }
    }
  }

  chart.value = new Chart(ctx, config)
})
</script>
