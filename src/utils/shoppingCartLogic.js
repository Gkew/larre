// Import a small wrapper fror localStorage
import store from './store';

let stateObject, stateProperty;

export function save() {
  // set localStorage from state
  store.cartContents = stateObject[stateProperty];
  // save to local storage
  store.save();
}

export function init(stateObj, stateProp) {
  // remember the state object and state property so that
  // we can change the state each time we save the cart
  stateObject = stateObj;
  stateProperty = stateProp;
  // set state from localStorage
  stateObj[stateProperty] = store.cartContents || [];
}

export function add(productToAdd, quantityToAdd = 1) {

  let row = stateObject[stateProperty]
    .find(row => row.product.id === productToAdd.id);
  console.log("row", row);
  console.log("whole cart?", stateObject[stateProperty]);
  if (row) {
    row.quantity += quantityToAdd
  }
  else {
    stateObject[stateProperty].push({
      product: productToAdd,
      quantity: quantityToAdd
    });
  }
  save();
}

export function remove(productToRemove) {
  let rowIndex = stateObject[stateProperty]
    .findIndex(row => row.product.id === productToRemove.id);
  if (rowIndex >= 0) {
    stateObject[stateProperty].splice(rowIndex, 1);
    save();
  }
}

export function empty() {
  stateObject[stateProperty] = [];
  save();
}