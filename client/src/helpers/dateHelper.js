const getColorByDate = (dateString) => {
  const currentDate = new Date();
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  if (year === currentDate.getFullYear() &&
  month === currentDate.getMonth() &&
  day === currentDate.getDate()) {
    return 'yellow';
  }

  return date > currentDate ? 'green' : 'red';
};

export default getColorByDate;
