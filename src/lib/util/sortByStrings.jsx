export const sortByStrings = (list, prop, mode = "a") => {
  const tmpList = [...list];
  const compare = (a, b) => {
    const upperA = a[prop].toUpperCase();
    const upperB = b[prop].toUpperCase();

    let comparison = 0;
    if (upperA > upperB) {
      comparison = 1;
    } else if (upperA < upperB) {
      comparison = -1;
    }
    return comparison;
  };
  if (mode === "a") {
    return tmpList.sort(compare);
  } else if (mode === "d") {
    return tmpList.sort(compare).reverse();
  }
};
