const priceTTC = require("./utils");
const priceHT = [
    { name : "Apple", priceHT : 1.0, priceTTC : null },
    { name : "Orange", priceHT : 1.2, priceTTC : null },
    { name : "Rasberry", priceHT : 2.5, priceTTC : null },
];
const priceHT2 = [
    { name : "Apple", priceHT : 1.0, priceTTC : null },
    { name : "Orange", priceHT : 1.2, priceTTC : null },
    { name : "Rasberry", priceHT : null, priceTTC : null },
];



console.log(priceTTC.getPriceTTCObject(priceHT));
console.log(priceTTC.getPriceTTCObject(priceHT,0.3));
console.log(priceTTC.getPriceTTC(3.5,0.3));

// error
console.log(priceTTC.getPriceTTCObject([]));
console.log(priceTTC.getPriceTTCObject(priceHT2));

