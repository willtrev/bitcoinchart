export function formatedDate(lastWeek: boolean) {


  const formatDate = (date: Date) => {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  if (!lastWeek) {
    const date = new Date();
    return formatDate(date);
  } else {
    const date = new Date();
    const lastSeven = new Date(date.getTime() - (7 * 24 * 60 * 60 * 1000));
    return formatDate(lastSeven);
  }


}


