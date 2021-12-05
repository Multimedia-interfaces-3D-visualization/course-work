export const getUniqueSet = (books = [], field, isArray = false) => {
  let allData = [];
  if (isArray) {
    allData = books.map((x) => x[field]).flat();
  } else {
    allData = books.map((x) => x[field]);
  }
  const uniqueData = [...new Set(allData)];
  return uniqueData.filter((data) => !!data);
};
