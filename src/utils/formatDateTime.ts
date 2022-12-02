export default (date: Date, locale = 'en-US') =>
  date && date.toString() !== 'Invalid Date'
    ? date.toLocaleDateString(locale, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
    : ''
