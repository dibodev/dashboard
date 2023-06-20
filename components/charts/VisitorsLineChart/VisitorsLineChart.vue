<template>
  <div class="relative h-96 w-full z-0">
    <canvas id="main-graph-canvas" class="mt-4 select-none cursor-pointer"/>
  </div>
</template>

<script lang="ts" setup>
import {
  Chart,
  registerables
} from 'chart.js'
import type { ChartConfiguration } from 'chart.js'
import { buildDataSet, METRIC_FORMATTER } from '~/components/charts/VisitorsLineChart/plausible-chart-utils.js'
import { GraphTooltip } from '~/components/charts/VisitorsLineChart/plausible-chart-tooltip.js'
import graphData from '~/components/analytics/datas/main-graph.json'
import dateFormatter from '~/components/charts/VisitorsLineChart/plausible-chart.date-formatter'
Chart.register(...registerables)

const handleCLick = (e: any) => {
  console.log(e)
}

const query = {
  period: '7d'
}

const metric = 'visitors'

const renderChart = () => {
  const graphEl = document.getElementById('main-graph-canvas')
  if (graphEl && graphData.plot.length) {
    const ctx = graphEl.getContext('2d')
    const datasets = buildDataSet(graphData.plot, graphData.comparison_plot, graphData.present_index, ctx, 'Visitors')

    const config: ChartConfiguration<any> = {
      type: 'line',
      data: {
        labels: graphData.labels,
        datasets
      },
      options: {
        animation: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
            mode: 'index',
            intersect: false,
            position: 'average',
            external: GraphTooltip(graphData, metric, query)
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: { line: { tension: 0 }, point: { radius: 0 } },
        onClick: handleCLick,
        scale: {
          ticks: { precision: 0, maxTicksLimit: 8 }
        },
        scales: {
          y: {
            min: 0,
            suggestedMax: 0,
            ticks: {
              callback: METRIC_FORMATTER[metric],
              color: 'rgb(243, 244, 246)'
            }
          },
          x: {
            grid: { display: false },
            ticks: {
              callback: function (val, _index, _ticks) {
                if (this.getLabelForValue(val) === '__blank__') { return '' }

                const hasMultipleYears =
                  graphData.labels
                    .filter(date => typeof date === 'string')
                    .map(date => date.split('-')[0])
                    .filter((value, index, list) => list.indexOf(value) === index)
                    .length > 1

                if (graphData.interval === 'hour' && query.period !== 'day') {
                  const date = dateFormatter({
                    isPeriodFull: false,
                    interval: 'date',
                    longForm: false,
                    period: query.period,
                    shouldShowYear: hasMultipleYears
                  })(this.getLabelForValue(val))

                  const hour = dateFormatter({
                    interval: graphData.interval as 'date',
                    longForm: false,
                    period: query.period,
                    shouldShowYear: hasMultipleYears
                  })(this.getLabelForValue(val))

                  return `${date}, ${hour}`
                }

                if (graphData.interval === 'minute' && query.period !== 'realtime') {
                  return dateFormatter({
                    isPeriodFull: false,
                    shouldShowYear: false,
                    interval: 'hour',
                    longForm: false,
                    period: query.period
                  })(this.getLabelForValue(val))
                }

                return dateFormatter({
                  interval: graphData.interval as 'date',
                  isPeriodFull: false,
                  longForm: false,
                  period: query.period,
                  shouldShowYear: hasMultipleYears
                })(this.getLabelForValue(val))
              },
              color: 'rgb(243, 244, 246)'
            }
          }
        }
      }
    }

    const chart = new Chart(ctx, config)
    console.log(chart)
  }
}

onMounted(() => {
  renderChart()
})
</script>
