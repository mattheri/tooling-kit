const formateDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString();
};

export default formateDate;
