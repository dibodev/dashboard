<template>
  <div>
    <LineChart :chart-data="dataCollection" :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import LineChart from '~/components/charts/LineChart.vue'

const dataCollection = ref({
  labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#FC2525',
      data: [40, 39, 10, 50, 30, 70, 20, 60, 80, 40, 32, 40]
    }
  ]
})

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
})
</script>
