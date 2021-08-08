export function convertTime(unixtimestamp) {
  const date = new Date(unixtimestamp * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();

  return `${hours}:${minutes.substr(-2)}`;
}

export function convertDate(unixtimestamp) {
  const date = new Date(unixtimestamp * 1000);
  const day = date.getDate();
  const month = "0" + (date.getMonth() + 1);

  const year = date.getFullYear();

  return `${day}-${month.substr(-2)}-${year}`;
}
