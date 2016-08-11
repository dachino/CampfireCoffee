var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var pikePlaceMarket = {
  name: "Pike Place Market",
  minCustRate: 14,
  maxCustRate: 35,
  avgCup: 1.2,
  avgPnd: 0.34,
  numCustHr: [],  //Number of customers for each hour
  numCupHr: [],  //Projected cups sold for each hour
  numPndHr: [],  //Projected pounds to-go sold for each hour
  numPndPerCup: [], //Projected pounds of beans used for cup for each hour
  netPnd: [],   //Projected pounds of beans used for both for each hour
  totalCup: 0,  //Total cup sold
  totalPnd: 0,  //Total pounds to-go sold
  totalNetPnd: 0,  //Total pounds of beans sold altogether
  randomCustHr: function() {
    for (var i = 0; i < hours.length; i++) {
      this.numCustHr[i] = Math.floor(Math.random() * (this.maxCustRate - this.minCustRate) + this.minCustRate);
    }
  },
  randomCustHr: function() {
    for (var i = 0; i < hours.length; i++) {
      this.numCustHr[i] = Math.floor(Math.random() * (this.maxCustRate - this.minCustRate) + this.minCustRate);
    }
  },
  cupHr: function() {
    for (var i = 0; i < hours.length; i++) {
      this.numCupHr[i] = this.numCustHr[i] * this.avgCup;
    }
  },
  totalCupCalc: function() {
    for (var i = 0; i < hours.length; i++) {
      this.totalCup += this.numCupHr[i];
    }
  },
  pndHr: function() {
    for (var i = 0; i < hours.length; i++) {
      this.numPndHr[i] = this.numCustHr[i] * this.avgPnd;
    }
  },
  totalPndCalc: function() {
    for (var i = 0; i < hours.length; i++) {
      this.totalPnd += this.numPndHr[i];
    }
  },
  PndPerCup: function() {
    for (var i = 0; i < hours.length; i++) {
      this.numPndPerCup[i] = this.numCupHr[i] / 16;
    }
  },
  netPndCalc: function() {
    for (var i = 0; i < hours.length; i++) {
      this.netPnd[i] = this.numPndHr[i] + this.numPndPerCup[i];
    }
  },
  totalNetPndCalc: function() {
    for (var i = 0; i < hours.length; i++) {
      this.totalNetPnd += this.netPnd[i];
    }
  }
}


pikePlaceMarket.randomCustHr();
pikePlaceMarket.cupHr();
pikePlaceMarket.totalCupCalc();
pikePlaceMarket.pndHr();
pikePlaceMarket.totalPndCalc();
pikePlaceMarket.PndPerCup();
pikePlaceMarket.netPndCalc();
pikePlaceMarket.totalNetPndCalc();
