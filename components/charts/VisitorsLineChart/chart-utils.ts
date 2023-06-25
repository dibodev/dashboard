// Define necessary constants
const THOUSAND = 1000
const MILLION = 1_000_000
const BILLION = 1_000_000_000
const TRILLION = 1_000_000_000_000

// Define colors
export const MAIN_COLOR = '101,116,205'
const HOVER_COLOR = '71, 87, 193'
const COMPARISON_COLOR = '60,70,110'

// Define function for padding a number with leading zeros
function pad (num: number, size: number): string {
  return ('000' + num).slice(size * -1)
}

// Function for formatting a number as a string with K, M, B, or T suffix
function numberFormatter (num: number): string | number {
  if (num >= THOUSAND && num < MILLION) {
    const thousands = num / THOUSAND
    return formatNumber(thousands, 'k')
  } else if (num >= MILLION && num < BILLION) {
    const millions = num / MILLION
    return formatNumber(millions, 'M')
  } else if (num >= BILLION && num < TRILLION) {
    const billions = num / BILLION
    return formatNumber(billions, 'B')
  } else {
    return num
  }
}

// Helper function to format numbers with K, M, B, T suffixes
function formatNumber (value: number, suffix: string): string {
  if (Number.isInteger(value) || value >= 100) {
    return Math.floor(value) + suffix
  } else {
    return (Math.floor(value * 10) / 10) + suffix
  }
}

// Function for formatting duration in seconds
function durationFormatter (duration: number): string {
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

export const METRIC_LABELS = {
  visitors: 'Visitors',
  pageviews: 'Pageviews',
  views_per_visit: 'Views per Visit',
  visits: 'Visits',
  bounce_rate: 'Bounce Rate',
  visit_duration: 'Visit Duration',
  conversions: 'Converted Visitors'
}

// Define different formatters for different metrics
export const METRIC_FORMATTER = {
  visitors: numberFormatter,
  pageviews: numberFormatter,
  visits: numberFormatter,
  views_per_visit: (number: number) => number,
  bounce_rate: (number: number) => `${number}%`,
  visit_duration: durationFormatter,
  conversions: numberFormatter
}

// Function for building the main plot dataset
function buildMainPlotDataset (plot: number[], presentIndex?: number) {
  const data = presentIndex ? plot.slice(0, presentIndex) : plot

  return [{
    data,
    borderColor: `rgba(${MAIN_COLOR})`,
    pointBackgroundColor: `rgba(${MAIN_COLOR})`,
    pointHoverBackgroundColor: `rgba(${HOVER_COLOR})`,
    yAxisID: 'y'
  }]
}

// Function for building the dashed dataset
function buildDashedDataset (plot: number[], presentIndex?: number) {
  if (!presentIndex) { return [] }

  const dashedPart = plot.slice(presentIndex - 1, presentIndex + 1)
  const dashedPlot = (new Array(presentIndex - 1)).concat(dashedPart)

  return [{
    data: dashedPlot,
    borderDash: [3, 3],
    borderColor: `rgba(${MAIN_COLOR})`,
    pointHoverBackgroundColor: `rgba(${HOVER_COLOR})`,
    yAxisID: 'y'
  }]
}

// Function for building the comparison dataset
function buildComparisonDataset (comparisonPlot: number[] | null) {
  if (!comparisonPlot) { return [] }

  return [{
    data: comparisonPlot,
    borderColor: `rgba(${COMPARISON_COLOR}, 0.2)`,
    pointBackgroundColor: `rgba(${COMPARISON_COLOR}, 0.2)`,
    pointHoverBackgroundColor: 'rgba(60, 70, 110)',
    yAxisID: 'yComparison'
  }]
}

// Function for building the dataset
export function buildDataSet (
  plot: number[],
  comparisonPlot: number[] | null,
  presentIndex: number | undefined,
  ctx: CanvasRenderingContext2D,
  label: string
) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 300)
  const prevGradient = ctx.createLinearGradient(0, 0, 0, 300)

  gradient.addColorStop(0, `rgba(${MAIN_COLOR}, 0.2)`)
  gradient.addColorStop(1, `rgba(${MAIN_COLOR}, 0)`)

  prevGradient.addColorStop(0, `rgba(${MAIN_COLOR}, 0.075)`)
  prevGradient.addColorStop(1, `rgba(${MAIN_COLOR}, 0)`)

  const defaultOptions = {
    label,
    borderWidth: 3,
    pointBorderColor: 'transparent',
    pointHoverRadius: 4,
    backgroundColor: gradient,
    fill: 'start'
  }

  const dataset = [
    ...buildMainPlotDataset(plot, presentIndex),
    ...buildDashedDataset(plot, presentIndex),
    ...buildComparisonDataset(comparisonPlot)
  ]

  return dataset.map(item => ({ ...item, ...defaultOptions }))
}
