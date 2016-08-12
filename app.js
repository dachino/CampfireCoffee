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
  numEmp: [],  //Number of employees needed for each hour
  ulEl: document.getElementById('pikePlace'),

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
    }
    this.totalCup = parseFloat(this.totalCup.toFixed(2));
  },
  pndHr: function() {
    for (var i = 0; i < hours.length; i++) {
      this.numPndHr[i] = parseFloat((this.numCustHr[i] * this.avgPnd).toFixed(2));
    }
  },
  totalPndCalc: function() {
    for (var i = 0; i < hours.length; i++) {
      this.totalPnd += this.numPndHr[i];
    }
    this.totalPnd = parseFloat(this.totalPnd.toFixed(2));
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
    }
    this.totalNetPnd = parseFloat(this.totalNetPnd.toFixed(2));
  },
  totalCustCalc: function() {
    for (var i = 0; i < hours.length; i++) {
      this.totalCust += this.numCustHr[i];
    }
  },
  numEmpCalc: function() {
    for (var i = 0; i < hours.length; i++) {
      if ((this.numCustHr[i] / 30) >= 1) {
        this.numEmp[i] = 2;
      } else {
        this.numEmp[i] = 1;
      }
    }
  },
  render: function() {
    // Calling out all the methods for Pike Place Market object
    this.randomCustHr();
    this.cupHr();
    this.totalCupCalc();
    this.pndHr();
    this.totalPndCalc();
    this.PndPerCup();
    this.netPndCalc();
    this.totalNetPndCalc();
    this.totalCustCalc();
    this.numEmpCalc();
    console.log("Number of employees needed for each hour:",this.numEmp);

    // Adding the Pike Place information to data.html
    var liEl = [];
    for (var i = 0; i < hours.length; i++) {
      liEl[i] = document.createElement('li');
      liEl[i].textContent = hours[i] + ': ' + this.netPnd[i] + 'lbs [' + this.numCustHr[i] + ' customers, ' + this.numCupHr[i] + ' cups (' + this.numPndPerCup[i] + ' lbs), ' + this.numPndHr[i] + ' lbs to-go]';
      this.ulEl.appendChild(liEl[i]);
    }
  }
}
pikePlaceMarket.render();
