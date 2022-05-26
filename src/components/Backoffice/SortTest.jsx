import React from "react";
import BOProductDetails from "./BOProductDetails";

const ProductTable = (props) => {
  const { products } = props;
  const [sortedField, setSortedFiels] = useState(null);

  let sortedProducts = [...products];

  if (sortedField !== null) {
   sortedProducts.sort((a, b) => {
  if (a[sortConfig.key] < b[sortConfig.key]) {
    return sortConfig.direction === 'ascending' ? -1 : 1;
  }
  if (a[sortConfig.key] > b[sortConfig.key]) {
    return sortConfig.direction === 'ascending' ? 1 : -1;
  }
  return 0;
   });
    
    const requestSort = key => {
  let direction = 'ascending';
  if (sortConfig.key === key && sortConfig.direction === 'ascending') {
    direction = 'descending';
  }
  setSortConfig({ key, direction });
}
  return <></>;
};

export default ProductTable;
