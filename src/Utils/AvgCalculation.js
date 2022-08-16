const avgCalculation = (arrayList) => {
  let totalValues = 0;
  arrayList.map((yl) => {
    totalValues = totalValues + yl;
  });
  return totalValues / arrayList.length;
};

export default avgCalculation;
