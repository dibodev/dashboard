import { DateTime } from 'luxon'

interface FormatterOptions {
  period: string; // 'realtime' | '12mo' | 'day' | '7d'
  interval: string; // 'month' | 'week' | 'date' | 'hour' | 'minute'
  isBucketPartial: boolean;
  shouldShowYear: boolean;
}

interface DateFormatterConfig {
  interval: string; // 'month' | 'week' | 'date' | 'hour' | 'minute'
  longForm: boolean;
  period: string; // 'realtime' | '12mo' | 'day' | '7d'
  isPeriodFull?: boolean;
  shouldShowYear?: boolean;
}

export function formatDayShort (date: DateTime, includeYear = false): string {
  if (includeYear) {
    return date.toFormat('d LLL yy')
  } else {
    return date.toFormat('d LLL')
  }
}

export function formatMonthYYYY (date: DateTime): string {
  return date.toFormat('LLLL yyyy')
}

export function parseUTCDate (dateString: string): DateTime {
  return DateTime.fromISO(dateString, { zone: 'utc' })
}

const is12HourClock = function (): boolean {
  const browserDateFormat = Intl.DateTimeFormat(navigator.language, { hour: 'numeric' })
  return !!browserDateFormat.resolvedOptions().hour12
}

const intervalFormatters: Record<string, {
  long: (isoDate: string, options: FormatterOptions) => string;
  short: (isoDate: string, options: FormatterOptions) => string;
}> = {
  month: {
    long (isoDate, options) {
      const formatted = this.short(isoDate, options)
      return options.isBucketPartial ? `Partial of ${formatted}` : formatted
    },
    short (isoDate) {
      return formatMonthYYYY(parseUTCDate(isoDate))
    }
  },
  week: {
    long (isoDate, options) {
      const formatted = this.short(isoDate, options)
      return options.isBucketPartial ? `Partial week of ${formatted}` : `Week of ${formatted}`
    },
    short (isoDate, options) {
      return formatDayShort(parseUTCDate(isoDate), options.shouldShowYear)
    }
  },
  date: {
    long (isoDate) {
      return parseUTCDate(isoDate).toFormat('ccc, d LLL')
    },
    short (isoDate, options) {
      return formatDayShort(parseUTCDate(isoDate), options.shouldShowYear)
    }
  },
  hour: {
    long (isoDate, options) {
      return this.short(isoDate, options)
    },
    short (isoDate) {
      if (is12HourClock()) {
        return parseUTCDate(isoDate).toFormat('ha')
      } else {
        return parseUTCDate(isoDate).toFormat('HH:mm')
      }
    }
  },
  minute: {
    long (isoDate, options) {
      if (options.period === 'realtime') {
        const minutesAgo = Math.abs(parseInt(isoDate))
        return minutesAgo === 1 ? '1 minute ago' : `${minutesAgo} minutes ago`
      } else {
        return this.short(isoDate, options)
      }
    },
    short (isoDate, options) {
      if (options.period === 'realtime') { return `${isoDate}m` }

      if (is12HourClock()) {
        return parseUTCDate(isoDate).toFormat('h:mma')
      } else {
        return parseUTCDate(isoDate).toFormat('HH:mm')
      }
    }
  }
}

export default function dateFormatter (config: DateFormatterConfig): (isoDate: string) => string {
  const displayMode = config.longForm ? 'long' : 'short'
  const options: FormatterOptions = {
    period: config.period,
    interval: config.interval,
    isBucketPartial: !(config.isPeriodFull ?? true),
    shouldShowYear: config.shouldShowYear ?? false
  }
  return function (isoDate: string) {
    return intervalFormatters[config.interval][displayMode](isoDate, options)
  }
}
