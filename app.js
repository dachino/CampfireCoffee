var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var pikePlaceMarket = {
  name: "Pike Place Market",
  minCustRate: 14,
  maxCustRate: 35,
  avgCup: 1.2,
  avgPnd: 0.34
}

function randCustHr(store) {
  return Math.floor(Math.random() * (store.maxCustRate - store.minCustRate) + store.minCustRate);
}

// function numCustHr() {
//   for (var i = 0; i < this.hrsOpen; i++) {
//     this.numCustHr[i] = randCustHr();
//   }
//
//   numCupHr: function() {
//     return this.numCustHr() * this.avgCup;
//   }
//   numCupTotal: function() {
//     var total =
//     for (var i = 0; i < array.length; i++) {
//       total
//     }
//     return total;
//   }
// };
