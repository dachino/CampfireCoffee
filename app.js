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
      this.numEmp[i] = Math.ceil(this.numCustHr[i] / 30)
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
    console.log("Number of employees needed at Pike Place Market for each hour:",this.numEmp);

    // Adding the Pike Place information to data.html
    var liEl = [];
    for (var i = 0; i < hours.length; i++) {
      liEl[i] = document.createElement('li');
      liEl[i].textContent = hours[i] + ': ' + this.netPnd[i] + ' lbs [' + this.numCustHr[i] + ' customers, ' + this.numCupHr[i] + ' cups (' + this.numPndPerCup[i] + ' lbs), ' + this.numPndHr[i] + ' lbs to-go]';
      this.ulEl.appendChild(liEl[i]);
    }
    liEl[15] = document.createElement('li');
    liEl[15].textContent = 'Total customers at Pike Place Market: ' + this.totalCust;
    this.ulEl.appendChild(liEl[15]);
    liEl[16] = document.createElement('li');
    liEl[16].textContent = 'Total cups sold at Pike Place Market: ' + this.totalCup;
    this.ulEl.appendChild(liEl[16]);
    liEl[17] = document.createElement('li');
    liEl[17].textContent = 'Total to-go pound packages sold at Pike Place Market: ' + this.totalPnd;
    this.ulEl.appendChild(liEl[17]);
    liEl[18] = document.createElement('li');
    liEl[18].textContent = 'Total pounds of beans needed at Pike Place Market: ' + this.totalNetPnd;
    this.ulEl.appendChild(liEl[18]);
  }
}
pikePlaceMarket.render();


var capitolHill = {
  name: "Capitol Hill",
  minCustRate: 12,
  maxCustRate: 28,
  avgCup: 3.2,
  avgPnd: 0.03,
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
  ulEl: document.getElementById('capitolHill'),

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
      this.numEmp[i] = Math.ceil(this.numCustHr[i] / 30)
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
    console.log("Number of employees needed at Capitol Hill for each hour:",this.numEmp);

    // Adding the Capitol Hill information to data.html
    var liEl = [];
    for (var i = 0; i < hours.length; i++) {
      liEl[i] = document.createElement('li');
      liEl[i].textContent = hours[i] + ': ' + this.netPnd[i] + ' lbs [' + this.numCustHr[i] + ' customers, ' + this.numCupHr[i] + ' cups (' + this.numPndPerCup[i] + ' lbs), ' + this.numPndHr[i] + ' lbs to-go]';
      this.ulEl.appendChild(liEl[i]);
    }
    liEl[15] = document.createElement('li');
    liEl[15].textContent = 'Total customers at Capitol Hill: ' + this.totalCust;
    this.ulEl.appendChild(liEl[15]);
    liEl[16] = document.createElement('li');
    liEl[16].textContent = 'Total cups sold at Capitol Hill: ' + this.totalCup;
    this.ulEl.appendChild(liEl[16]);
    liEl[17] = document.createElement('li');
    liEl[17].textContent = 'Total to-go pound packages sold at Capitol Hill: ' + this.totalPnd;
    this.ulEl.appendChild(liEl[17]);
    liEl[18] = document.createElement('li');
    liEl[18].textContent = 'Total pounds of beans needed at Capitol Hill: ' + this.totalNetPnd;
    this.ulEl.appendChild(liEl[18]);
  }
}
capitolHill.render();


var seattlePublicLib = {
  name: "Seattle Public Library",
  minCustRate: 9,
  maxCustRate: 45,
  avgCup: 2.6,
  avgPnd: 0.02,
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
  ulEl: document.getElementById('seattlePublicLib'),

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
      this.numEmp[i] = Math.ceil(this.numCustHr[i] / 30)
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
    console.log("Number of employees needed at Seattle Public Library for each hour:",this.numEmp);

    // Adding the Seattle Public Library information to data.html
    var liEl = [];
    for (var i = 0; i < hours.length; i++) {
      liEl[i] = document.createElement('li');
      liEl[i].textContent = hours[i] + ': ' + this.netPnd[i] + ' lbs [' + this.numCustHr[i] + ' customers, ' + this.numCupHr[i] + ' cups (' + this.numPndPerCup[i] + ' lbs), ' + this.numPndHr[i] + ' lbs to-go]';
      this.ulEl.appendChild(liEl[i]);
    }
    liEl[15] = document.createElement('li');
    liEl[15].textContent = 'Total customers at Seattle Public Library: ' + this.totalCust;
    this.ulEl.appendChild(liEl[15]);
    liEl[16] = document.createElement('li');
    liEl[16].textContent = 'Total cups sold at Seattle Public Library: ' + this.totalCup;
    this.ulEl.appendChild(liEl[16]);
    liEl[17] = document.createElement('li');
    liEl[17].textContent = 'Total to-go pound packages sold at Seattle Public Library: ' + this.totalPnd;
    this.ulEl.appendChild(liEl[17]);
    liEl[18] = document.createElement('li');
    liEl[18].textContent = 'Total pounds of beans needed at Seattle Public Library: ' + this.totalNetPnd;
    this.ulEl.appendChild(liEl[18]);
  }
}
seattlePublicLib.render();
