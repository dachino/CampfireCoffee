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
  totalCup: 0,  //Total cup sold for the day
  totalPnd: 0,  //Total pounds to-go sold for the day
  totalNetPnd: 0,  //Total pounds of beans sold altogether for the day
  totalCust: 0, //Total number of customers for the day
  randomCustHr: function() {
    for (var i = 0; i < hours.length; i++) {
      this.numCustHr[i] = Math.floor(Math.random() * (this.maxCustRate - this.minCustRate) + this.minCustRate);
    }
  },
  cupHr: function() {
    for (var i = 0; i < hours.length; i++) {
      this.numCupHr[i] = parseFloat((this.numCustHr[i] * this.avgCup).toFixed(2));
    }
  },
  totalCupCalc: function() {
    for (var i = 0; i < hours.length; i++) {
      this.totalCup += this.numCupHr[i];
      this.totalCup = parseFloat(this.totalCup.toFixed(2));
    }
  },
  pndHr: function() {
    for (var i = 0; i < hours.length; i++) {
      this.numPndHr[i] = parseFloat((this.numCustHr[i] * this.avgPnd).toFixed(2));
    }
  },
  totalPndCalc: function() {
    for (var i = 0; i < hours.length; i++) {
      this.totalPnd += this.numPndHr[i];
      this.totalPnd = parseFloat(this.totalPnd.toFixed(2));
    }
  },
  PndPerCup: function() {
    for (var i = 0; i < hours.length; i++) {
      this.numPndPerCup[i] = parseFloat((this.numCupHr[i] / 16).toFixed(2));
    }
  },
  netPndCalc: function() {
    for (var i = 0; i < hours.length; i++) {
      this.netPnd[i] = parseFloat((this.numPndHr[i] + this.numPndPerCup[i]).toFixed(2));
    }
  },
  totalNetPndCalc: function() {
    for (var i = 0; i < hours.length; i++) {
      this.totalNetPnd += this.netPnd[i];
      this.totalNetPnd = parseFloat(this.totalNetPnd.toFixed(2));
    }
  },
  totalCustCalc: function() {
    for (var i = 0; i < hours.length; i++) {
      this.totalCust += this.numCustHr[i];
    }
  }
}

// Calling out all the methods for Pike Place Market object
pikePlaceMarket.randomCustHr();
pikePlaceMarket.cupHr();
pikePlaceMarket.totalCupCalc();
pikePlaceMarket.pndHr();
pikePlaceMarket.totalPndCalc();
pikePlaceMarket.PndPerCup();
pikePlaceMarket.netPndCalc();
pikePlaceMarket.totalNetPndCalc();
pikePlaceMarket.totalCustCalc();

// Adding the Pike Place information to data.html
var sectionEl = document.getElementsByTagName('section');
var ulEl = document.createElement('ul');
ulEl.textContent = pikePlaceMarket.name;
sectionEl[0].appendChild(ulEl);
var ilEl = document.createElement('li');
ilEl.textContent = '6:00am: 86.4 lbs [23 customers, 27.6 cups (1.4 lbs), 85 lbs to-go]';
