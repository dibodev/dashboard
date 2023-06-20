const THOUSAND = 1000
const HUNDRED_THOUSAND = 100000
const MILLION = 1000000
const HUNDRED_MILLION = 100000000
const BILLION = 1000000000
const HUNDRED_BILLION = 100000000000
const TRILLION = 1000000000000

export default function numberFormatter (num) {
  if (num >= THOUSAND && num < MILLION) {
    const thousands = num / THOUSAND
    if (thousands === Math.floor(thousands) || num >= HUNDRED_THOUSAND) {
      return Math.floor(thousands) + 'k'
    } else {
      return (Math.floor(thousands * 10) / 10) + 'k'
    }
  } else if (num >= MILLION && num < BILLION) {
    const millions = num / MILLION
    if (millions === Math.floor(millions) || num >= HUNDRED_MILLION) {
      return Math.floor(millions) + 'M'
    } else {
      return (Math.floor(millions * 10) / 10) + 'M'
    }
  } else if (num >= BILLION && num < TRILLION) {
    const billions = num / BILLION
    if (billions === Math.floor(billions) || num >= HUNDRED_BILLION) {
      return Math.floor(billions) + 'B'
    } else {
      return (Math.floor(billions * 10) / 10) + 'B'
    }
  } else {
    return num
  }
}

function pad (num, size) {
  return ('000' + num).slice(size * -1)
}

export function durationFormatter (duration) {
  const hours = Math.floor(duration / 60 / 60)
  const minutes = Math.floor(duration / 60) % 60
  const seconds = Math.floor(duration - (minutes * 60) - (hours * 60 * 60))
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`
  } else if (minutes > 0) {
    return `${minutes}m ${pad(seconds, 2)}s`
  } else {
    return `${seconds}s`
  }
}
export const METRIC_FORMATTER = {
  visitors: numberFormatter,
  pageviews: numberFormatter,
  visits: numberFormatter,
  views_per_visit: number => (number),
  bounce_rate: number => (`${number}%`),
  visit_duration: durationFormatter,
  conversions: numberFormatter
}

export const buildDashedDataset = function (plot, presentIndex) {
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

export const buildComparisonDataset = function (comparisonPlot) {
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

export const buildMainPlotDataset = function (plot, presentIndex) {
  const data = presentIndex ? plot.slice(0, presentIndex) : plot

  return [{
    data,
    borderColor: 'rgba(101,116,205)',
    pointBackgroundColor: 'rgba(101,116,205)',
    pointHoverBackgroundColor: 'rgba(71, 87, 193)',
    yAxisID: 'y'
  }]
}

export const buildDataSet = (plot, comparisonPlot, presentIndex, ctx, label) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 300)
  const prevGradient = ctx.createLinearGradient(0, 0, 0, 300)
  gradient.addColorStop(0, 'rgba(101,116,205, 0.2)')
  gradient.addColorStop(1, 'rgba(101,116,205, 0)')
  prevGradient.addColorStop(0, 'rgba(101,116,205, 0.075)')
  prevGradient.addColorStop(1, 'rgba(101,116,205, 0)')

  const defaultOptions = {
    label,
    borderWidth: 3,
    pointRadius: 4,
    pointHoverRadius: 4,
    backgroundColor: gradient,
    fill: 'start'
  }

  const dataset = [
    ...buildMainPlotDataset(plot, presentIndex),
    ...buildDashedDataset(plot, presentIndex),
    ...buildComparisonDataset(comparisonPlot)
  ]

  return dataset.map(item => Object.assign(item, defaultOptions))
}
