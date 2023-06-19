<template>
    <div class="relative h-96 w-full z-0">
        <canvas id="main-graph-canvas" class="mt-4 select-none cursor-pointer"/>
    </div>
</template>

<script setup>
import { Chart, LineController, CategoryScale, PointElement, LineElement, LinearScale } from 'chart.js'

Chart.register(LineController, CategoryScale, PointElement, LineElement, LinearScale)

const graphData = {
  plot: [2, 2, 0, 2, 2, 2, 1],
  comparison_plot: null,
  present_index: 6
}

const buildDashedDataset = function (plot, presentIndex) {
  if (!presentIndex) {
    return []
  }

  const dashedPart = plot.slice(presentIndex - 1, presentIndex + 1)
  const dashedPlot = (new Array(presentIndex - 1)).concat(dashedPart)

  return [{
    data: dashedPlot,
    borderDash: [3, 3],
    borderColor: 'rgba(101,116,205)',
    pointHoverBackgroundColor: 'rgba(71, 87, 193)',
    yAxisID: 'y'
  }]
}

const buildComparisonDataset = function (comparisonPlot) {
  if (!comparisonPlot) {
    return []
  }

  return [{
    data: comparisonPlot,
    borderColor: 'rgba(60,70,110,0.2)',
    pointBackgroundColor: 'rgba(60,70,110,0.2)',
    pointHoverBackgroundColor: 'rgba(60, 70, 110)',
    yAxisID: 'yComparison'
  }]
}

const buildMainPlotDataset = function (plot, presentIndex) {
  const data = presentIndex ? plot.slice(0, presentIndex) : plot

  return [{
    data,
    borderColor: 'rgba(101,116,205)',
    pointBackgroundColor: 'rgba(101,116,205)',
    pointHoverBackgroundColor: 'rgba(71, 87, 193)',
    yAxisID: 'y'
  }]
}

const buildDataSet = (plot, comparisonPlot, presentIndex, ctx, label) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 300)
  const prevGradient = ctx.createLinearGradient(0, 0, 0, 300)
  gradient.addColorStop(0, 'rgba(101,116,205, 0.2)')
  gradient.addColorStop(1, 'rgba(101,116,205, 0)')
  prevGradient.addColorStop(0, 'rgba(101,116,205, 0.075)')
  prevGradient.addColorStop(1, 'rgba(101,116,205, 0)')

  const defaultOptions = {
    label,
    borderWidth: 3,
    pointBorderColor: 'transparent',
    pointHoverRadius: 4,
    backgroundColor: gradient,
    fill: true
  }

  const dataset = [
    ...buildMainPlotDataset(plot, presentIndex),
    ...buildDashedDataset(plot, presentIndex),
    ...buildComparisonDataset(comparisonPlot)
  ]

  return dataset.map(item => Object.assign(item, defaultOptions))
}

onMounted(() => {
  const graphEl = document.getElementById('main-graph-canvas')
  const ctx = graphEl.getContext('2d')
  const dataSet = buildDataSet(graphData.plot, graphData.comparison_plot, graphData.present_index, ctx, 'Visitors')

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: graphData.plot,
      datasets: dataSet
    },
    options: {
      animation: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false,
          position: 'average'
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: { line: { tension: 0 }, point: { radius: 0 } },
        scale: {
          ticks: { precision: 0, maxTicksLimit: 8 }
        }
      }
    }
  })
  console.log(chart)
})
</script>
