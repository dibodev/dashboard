import dateFormatter from '~/components/charts/VisitorsLineChart/plausible-chart.date-formatter.ts'

export const METRIC_LABELS = {
  visitors: 'Visitors',
  pageviews: 'Pageviews',
  views_per_visit: 'Views per Visit',
  visits: 'Visits',
  bounce_rate: 'Bounce Rate',
  visit_duration: 'Visit Duration',
  conversions: 'Converted Visitors'
}

export const METRIC_FORMATTER = {
  visitors: number => (number),
  pageviews: number => (number),
  visits: number => (number),
  views_per_visit: number => (number),
  bounce_rate: number => (`${number}%`),
  visit_duration: number => (number),
  conversions: number => (number)
}

const renderBucketLabel = function (query, graphData, label, comparison = false) {
  let isPeriodFull = graphData.full_intervals?.[label]
  if (comparison) { isPeriodFull = true }

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

const buildTooltipData = function (query, graphData, metric, tooltipModel) {
  const data = tooltipModel.dataPoints.find(dataPoint => dataPoint.dataset.yAxisID === 'y')
  const comparisonData = tooltipModel.dataPoints.find(dataPoint => dataPoint.dataset.yAxisID === 'yComparison')

  const label = data && renderBucketLabel(query, graphData, graphData.labels[data.dataIndex])
  const comparisonLabel = comparisonData && renderBucketLabel(query, graphData, graphData.comparison_labels[comparisonData.dataIndex], true)

  const value = data?.raw || 0
  const comparisonValue = comparisonData?.raw || 0
  const comparisonDifference = label && comparisonLabel && calculatePercentageDifference(comparisonValue, value)

  const metricFormatter = METRIC_FORMATTER[metric]
  const formattedValue = metricFormatter(value)
  const formattedComparisonValue = comparisonData && metricFormatter(comparisonValue)

  return { label, formattedValue, comparisonLabel, formattedComparisonValue, comparisonDifference }
}

const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div')

  if (!tooltipEl) {
    tooltipEl = document.createElement('div')
    tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)'
    tooltipEl.style.borderRadius = '3px'
    tooltipEl.style.color = 'white'
    tooltipEl.style.opacity = 1
    tooltipEl.style.pointerEvents = 'none'
    tooltipEl.style.position = 'absolute'
    tooltipEl.style.transform = 'translate(-50%, 0)'
    tooltipEl.style.transition = 'all .1s ease'

    const table = document.createElement('table')
    table.style.margin = '0px'

    tooltipEl.appendChild(table)
    chart.canvas.parentNode.appendChild(tooltipEl)
  }

  return tooltipEl
}

export function GraphTooltip (graphData, metric, query) {
  return (context) => {
    const { chart, tooltip } = context
    const tooltipEl = getOrCreateTooltip(chart)

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0
      return
    }

    if (tooltip.body) {
      const tooltipData = buildTooltipData(query, graphData, metric, tooltip)

      tooltipEl.innerHTML = `
        <aside class="text-gray-100 flex flex-col">
          <div class="flex justify-between items-center">
            <span class="font-semibold mr-4 text-lg">${METRIC_LABELS[metric]}</span>
            ${tooltipData.comparisonDifference
        ? `<div class="inline-flex items-center space-x-1">
              ${tooltipData.comparisonDifference > 0 ? `<span class="font-semibold text-sm text-green-500">&uarr;</span><span>${tooltipData.comparisonDifference}%</span>` : ''}
              ${tooltipData.comparisonDifference < 0 ? `<span class="font-semibold text-sm text-red-400">&darr;</span><span>${tooltipData.comparisonDifference * -1}%</span>` : ''}
              ${tooltipData.comparisonDifference === 0 ? '<span class="font-semibold text-sm">〰 0%</span>' : ''}
            </div>`
: ''}
          </div>

          ${tooltipData.label
        ? `<div class="flex flex-col">
            <div class="flex flex-row justify-between items-center">
              <span class="flex items-center mr-4">
                <div class="w-3 h-3 mr-1 rounded-full" style="background-color: rgba(101,116,205)"></div>
                <span>${tooltipData.label}</span>
              </span>
              <span class="text-base font-bold">${tooltipData.formattedValue}</span>
            </div>`
: ''}

            ${tooltipData.comparisonLabel
        ? `<div class="flex flex-row justify-between items-center">
              <span class="flex items-center mr-4">
                <div class="w-3 h-3 mr-1 rounded-full bg-gray-500"></div>
                <span>${tooltipData.comparisonLabel}</span>
              </span>
              <span class="text-base font-bold">${tooltipData.formattedComparisonValue}</span>
            </div>`
: ''}
          </div>

          ${graphData.interval === 'month' ? '<span class="font-semibold italic">Click to view month</span>' : ''}
          ${graphData.interval === 'date' ? '<span class="font-semibold italic">Click to view day</span>' : ''}
        </aside>
      `
    }
    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1
    tooltipEl.style.left = positionX + tooltip.caretX + 'px'
    tooltipEl.style.top = positionY + tooltip.caretY + 'px'
    tooltipEl.style.font = tooltip.options.bodyFont.string
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px'
  }
}
