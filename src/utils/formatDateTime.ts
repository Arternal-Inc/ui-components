export default (
  date: Date,
  locale = "en-US",
  timeZone?: string,
  timeZoneName?:
    | "short"
    | "long"
    | "shortOffset"
    | "longOffset"
    | "shortGeneric"
    | "longGeneric"
) =>
  date && date.toString() !== "Invalid Date"
    ? date.toLocaleDateString(locale, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone,
        timeZoneName,
      })
    : "";
