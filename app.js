var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var pikePlaceMarket = {
  name: "Pike Place Market",
  minCustRate: 14,
  maxCustRate: 35,
  avgCup: 1.2,
  avgPnd: 0.34,
  numCustHr: [],  //Number of customers for each hour
  numCupHr: []  //Number of cups for each hour
}

function randomCustHr(store) {
  for (var i = 0; i < hours.length; i++) {
    store.numCustHr[i] = Math.floor(Math.random() * (store.maxCustRate - store.minCustRate) + store.minCustRate);
  }
}

function numCupHr(store) {
  for (var i = 0; i < hours.length; i++) {
    store.numCupHr[i] = store.numCustHr[i] * store.avgCup;
  }
}

//   numCupTotal: function() {
//     var total =
//     for (var i = 0; i < array.length; i++) {
//       total
//     }
//     return total;
//   }
// };

randomCustHr(pikePlaceMarket);
numCupHr(pikePlaceMarket);
