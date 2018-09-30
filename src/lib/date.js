const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const parseDate = date => {
  const dateObject = new Date(date);
  const today = new Date();

  if (dateObject.getFullYear() !== today.getFullYear()) {
    return `${dateObject.getDate()}/${dateObject.getMonth() +
      1}/${dateObject.getFullYear()}`;
  }
  if (
    dateObject.getMonth() !== today.getMonth() ||
    dateObject.getDate() !== today.getDate()
  ) {
    return `${monthNames[dateObject.getMonth()]} ${dateObject.getDate()}`;
  }
  let hour = dateObject.getHours();
  let minute = dateObject.getMinutes();
  hour = hour > 9 ? hour : `0${hour}`;
  minute = minute > 9 ? minute : `0${minute}`;
  return `${hour}:${minute}`;
}