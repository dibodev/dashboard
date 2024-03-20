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
import { buildDataSet, METRIC_FORMATTER } from '#components/charts/VisitorsLineChart/chart-utils.js'
import { GraphTooltip } from '#components/charts/VisitorsLineChart/chart-tooltip.js'
import graphData from '#components/analytics/datas/main-graph.json'
import dateFormatter from '#components/charts/VisitorsLineChart/chart.date-formatter'

Chart.register(...registerables)

interface XTicks {
    maxTicksLimit: number
    precision: number
    callback: (val: number) => string
    color: string
    getLabelForValue(val: number): string
}

const handleCLick = (e: any) => {
    console.log(e)
}

const query = {
    period: '7d'
}

const metric = 'visitors'

/* REFS */
const chart = ref()

const renderChart = () => {
    const graphEl = document.getElementById('main-graph-canvas') as HTMLCanvasElement
    if (graphEl && graphData.plot.length) {
        const ctx = graphEl.getContext('2d')
        if (!ctx) {
            throw new Error('Could not get context')
        }
        const datasets = buildDataSet(graphData.plot, graphData.comparison_plot, graphData.present_index, ctx, 'Visitors')

        const config = {
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
                            maxTicksLimit: 8,
                            precision: 0,
                            callback: METRIC_FORMATTER[metric],
                            color: 'rgb(243, 244, 246)'
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: {
                            maxTicksLimit: 8,
                            precision: 0,
                            callback: function (val: number): string {
                                const label = (this as XTicks).getLabelForValue(val)

                                if (label === '__blank__') {
                                    return ''
                                }

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
                                    })(label)

                                    const hour = dateFormatter({
                                        interval: graphData.interval as 'date',
                                        longForm: false,
                                        period: query.period,
                                        shouldShowYear: hasMultipleYears
                                    })(label)

                                    return `${date}, ${hour}`
                                }

                                if (graphData.interval === 'minute' && query.period !== 'realtime') {
                                    return dateFormatter({
                                        isPeriodFull: false,
                                        shouldShowYear: false,
                                        interval: 'hour',
                                        longForm: false,
                                        period: query.period
                                    })(label)
                                }

                                return dateFormatter({
                                    interval: graphData.interval as 'date',
                                    isPeriodFull: false,
                                    longForm: false,
                                    period: query.period,
                                    shouldShowYear: hasMultipleYears
                                })(label)
                            },
                            color: 'rgb(243, 244, 246)'
                        }
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                }
            }
        }

        chart.value = new Chart(ctx, config as ChartConfiguration)
    }
}

onMounted(() => {
    renderChart()
})
</script>
