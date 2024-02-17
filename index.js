import {trinReturn} from "./data.js"

const items = [
    {name: 'Bike', price:100},
    {name: 'TV', price:200},
    {name: 'Album', price:10},
    {name: 'Book', price:5},
    {name: 'Phone', price:500},
    {name: 'Computer', price:1000},
];

// 1. Filter and show the product that will be bought when you don't have much money (Cheap one)
const cheapProducts = items.filter(item => item.price < 10);
console.log("Cheap products:", cheapProducts);

// 2. Filter and show the product that will be expensive in the array
const expensiveProducts = items.filter(item => item.price > 500);
console.log("Expensive products:", expensiveProducts);

// 3. Calculate the full price of all products combined
const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
console.log("Total price of all products combined:", totalPrice);

// 4. Calculate the full price of all products combined and remove products that are under $10
const totalPriceAboveTen = items
    .filter(item => item.price >= 10)
    .reduce((acc, item) => acc + item.price, 0);
console.log("Total price of products above $10:", totalPriceAboveTen);


const itemWithBAtFirstPosition = items.find(item => item.name.toLowerCase().charAt(0) === 'b');
console.log("Item with 'b' at first position:", itemWithBAtFirstPosition);
