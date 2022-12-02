export default (date: Date, locale = 'en-US') =>
  date && date.toString() !== 'Invalid Date'
    ? new Date(date).toLocaleDateString(locale, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : ''
