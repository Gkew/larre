export const SORTOPTION = {
  // AToZ: 0,
  Ascending: 1,
  Descending: 2,
}

const getSortFilter = (array, option) => {
  switch (option) {
    // case "0": return array.sort((a, b) => a.name.localeCompare(b.name));
    case "1": return array.sort((a, b) => a.price - b.price)
    case "2": return array.sort((a, b) => b.price - a.price)
    default:
      return array.sort((a, b) => a.name.localeCompare(b.name));
  }
}

const getCategoryFilter = (array, category) => {
  if (category === "all") return array;
  else return array.filter(x => x.categoriesID === category);
}


export default { getSortFilter, getCategoryFilter }

