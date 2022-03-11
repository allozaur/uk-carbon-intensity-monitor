export const formatDate = (date, locale = "en-GB") => {
  date = new Date(date)

  if (locale = "en-GB") {
    date = date.toLocaleDateString("en-GB")
  }

  return date
}

export const formatDateIso = (date) => {
  return date.toISOString();
}

export const formatTime = (date, locale = "en-GB") => {
  date = new Date(date)

  if (locale = "en-GB") {
    date = date.toLocaleTimeString("en-GB")
  }

  return date
}

export const parseTime = (from, to) => {
  if (formatDate(from) === formatDate(to))
    return `${formatDate(from)} ${formatTime(
      from
    )} - ${formatTime(to)}`;
  return `${formatDate(from)} ${formatTime(
    from
  )} - ${formatDate(to)} ${formatTime(to)}`;
};
