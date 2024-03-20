import type { Chart, TooltipModel } from 'chart.js'
import { MAIN_COLOR, METRIC_FORMATTER, METRIC_LABELS } from './chart-utils'
import dateFormatter from '#components/charts/VisitorsLineChart/chart.date-formatter'

type Tooltip = TooltipModel<'line'>

type TooltipContext = {
    chart: Chart,
    tooltip: Tooltip
};

type MetricKey = keyof typeof METRIC_LABELS
type Query = { [key: string]: string }
type GraphData = {
    labels: string[]
    interval: string
    full_intervals: { [key: string]: boolean } | null
    comparison_labels: string[] | null
}
const renderBucketLabel = function (query: Query, graphData: GraphData, label: string, comparison = false) {
    let isPeriodFull = graphData.full_intervals?.[label]
    if (comparison) {
        isPeriodFull = true
    }

    const formattedLabel = dateFormatter({
        interval: graphData.interval, longForm: true, period: query.period, isPeriodFull
    })(label)

    if (query.period === 'realtime') {
        return dateFormatter({
            interval: graphData.interval, longForm: true, period: query.period
        })(label)
    }

    if (graphData.interval === 'hour' || graphData.interval === 'minute') {
        const date = dateFormatter({ interval: 'date', longForm: true, period: query.period })(label)
        return `${date}, ${formattedLabel}`
    }

    return formattedLabel
}

const calculatePercentageDifference = function (oldValue: number, newValue: number) {
    if (oldValue === 0 && newValue > 0) {
        return 100
    } else if (oldValue === 0 && newValue === 0) {
        return 0
    } else {
        return Math.round((newValue - oldValue) / oldValue * 100)
    }
}

const buildTooltipData = function (query: Query, graphData: GraphData, metric: MetricKey, tooltipModel: Tooltip) {
    const data = tooltipModel.dataPoints.find(dataPoint => dataPoint.dataset.yAxisID === 'y')
    const comparisonData = tooltipModel.dataPoints.find(dataPoint => dataPoint.dataset.yAxisID === 'yComparison')

    const label = data && renderBucketLabel(query, graphData, graphData.labels[data.dataIndex])
    const comparisonLabel = (comparisonData && graphData.comparison_labels)
        ? renderBucketLabel(query, graphData, graphData.comparison_labels[comparisonData.dataIndex], true)
        : ''

    const value = typeof data?.raw === 'number' ? data.raw : 0
    const comparisonValue = typeof comparisonData?.raw === 'number' ? comparisonData.raw : 0
    const comparisonDifference = label && comparisonLabel && calculatePercentageDifference(comparisonValue, value)

    const metricFormatter = METRIC_FORMATTER[metric]
    const formattedValue = metricFormatter(value)
    const formattedComparisonValue = comparisonData && metricFormatter(comparisonValue)

    return { label, formattedValue, comparisonLabel, formattedComparisonValue, comparisonDifference }
}

const getOrCreateTooltip = (chart: Chart) => {
    let tooltipEl = chart.canvas.parentNode?.querySelector('div')

    if (!tooltipEl) {
        tooltipEl = document.createElement('div')
        tooltipEl.style.background = 'rgba(25, 30, 56)'
        tooltipEl.style.padding = '10px 12px'
        tooltipEl.style.borderRadius = '5px'
        tooltipEl.style.opacity = '1'
        tooltipEl.style.pointerEvents = 'none'
        tooltipEl.style.position = 'absolute'

        const table = document.createElement('table')
        table.style.margin = '0px'

        tooltipEl.appendChild(table)
        chart.canvas.parentNode?.appendChild(tooltipEl)
    }

    return tooltipEl
}

export function GraphTooltip (graphData: GraphData, metric: MetricKey, query: Query) {
    return (context: TooltipContext) => {
        const { chart, tooltip } = context
        const tooltipEl = getOrCreateTooltip(chart)

        // Hide if no tooltip
        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = '0'
            return
        }

        const primaryColor = `rgba(${MAIN_COLOR})`
        if (tooltip.body) {
            const tooltipData = buildTooltipData(query, graphData, metric, tooltip)

            tooltipEl.innerHTML = `
        <aside class="text-gray-100 flex flex-col text-sm">
          <div class="flex justify-between items-center">
            <span class="font-semibold mr-4 text-sm">${METRIC_LABELS[metric]}</span>
            ${tooltipData.comparisonDifference
                ? `<div class="inline-flex items-center space-x-1">
              ${tooltipData.comparisonDifference > 0 ? `<span class="font-medium text-sm text-green-500">&uarr;</span><span>${tooltipData.comparisonDifference}%</span>` : ''}
              ${tooltipData.comparisonDifference < 0 ? `<span class="font-medium text-sm text-red-400">&darr;</span><span>${tooltipData.comparisonDifference * -1}%</span>` : ''}
              ${tooltipData.comparisonDifference === 0 ? '<span class="font-medium text-sm">〰 0%</span>' : ''}
            </div>`
                : ''}
          </div>

          ${tooltipData.label
                ? `<div class="flex flex-col">
            <div class="flex flex-row justify-between items-center">
              <span class="flex items-center mr-4">
                <div class="w-3 h-3 mr-1 rounded-full" style="background-color: ` + primaryColor + `"></div>
                <span>${tooltipData.label}</span>
              </span>
              <span class="text-sm font-semibold">${tooltipData.formattedValue}</span>
            </div>`
                : ''}

            ${tooltipData.comparisonLabel
                ? `<div class="flex flex-row justify-between items-center">
              <span class="flex items-center mr-4">
                <div class="w-3 h-3 mr-1 rounded-full bg-gray-500"></div>
                <span>${tooltipData.comparisonLabel}</span>
              </span>
              <span class="text-sm font-semibold">${tooltipData.formattedComparisonValue}</span>
            </div>`
                : ''}
          </div>

          ${graphData.interval === 'month' ? '<span class="font-medium italic">Click to view month</span>' : ''}
          ${graphData.interval === 'date' ? '<span class="font-medium italic">Click to view day</span>' : ''}
        </aside>
      `
        }
        const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas
        // Display, position, and set styles for font
        tooltipEl.style.opacity = '1'
        tooltipEl.style.left = positionX + tooltip.caretX + 'px'
        tooltipEl.style.top = (positionY + tooltip.caretY) + 10 + 'px'
    }
}
