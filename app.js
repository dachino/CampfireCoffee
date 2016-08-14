var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
var coffeeShop = [];  //Array for storing the coffee shop objects
var beansTableEl = document.getElementById("beans");
var baristasTableEl = document.getElementById("baristas");

//Function that will create the table header
function tableHeader(tableName) {
  var trEl = document.createElement('tr');
  var thEl = [];
  thEl[0] = document.createElement('th');
  thEl[1] = document.createElement('th');
  thEl[0].textContent = "Locations";
  if (tableName === beans) {
    thEl[1].textContent = "Daily Location Totals";
  } else {
    thEl[1].textContent = "Total Employee Hours";
  }
  trEl.appendChild(thEl[0]);
  trEl.appendChild(thEl[1]);
  for (var i = 0; i < hours.length; i++) {
    thEl[i + 2] = document.createElement('th');
    thEl[i + 2].textContent = hours[i];
    trEl.appendChild(thEl[i + 2]);
  }
  if (tableName === beans) {
    beansTableEl.appendChild(trEl);
  } else {
    baristasTableEl.appendChild(trEl);
  }
}

//Constructor Function to create coffee shop objects
function CoffeeShop(name, minCustRate, maxCustRate, avgCup, avgPnd) {
  this.name = name;
  this.minCustRate = minCustRate;
  this.maxCustRate = maxCustRate;
  this.avgCup = avgCup;
  this.avgPnd = avgPnd;
  this.numCustHr = [];  //Number of customers for each hour
  this.numCupHr = [];  //Projected cups sold for each hour
  this.numPndHr = [];  //Projected pounds to-go sold for each hour
  this.numPndPerCup = []; //Projected pounds of beans used for cup for each hour
  this.netPnd = [];   //Projected pounds of beans used for both for each hour
  this.numEmp = [];  //Number of employees needed for each hour
  this.totalCup = 0;  //Total cup sold for the day
  this.totalPnd = 0;  //Total pounds to-go sold for the day
  this.totalNetPnd = 0;  //Total pounds of beans sold altogether for the day
  this.totalCust = 0; //Total number of customers for the day
  this.totalEmpHrs = 0; //Total number of employee hours for the day

  //Method to calculate the necessary data to output
  this.calculations = function() {
    for (var i = 0; i < hours.length; i++) {
      this.numCustHr[i] = Math.floor(Math.random() * (this.maxCustRate - this.minCustRate) + this.minCustRate);
      this.totalCust += this.numCustHr[i];
      this.numCupHr[i] = parseFloat((this.numCustHr[i] * this.avgCup).toFixed(2));
      this.totalCup += this.numCupHr[i];
      this.numPndHr[i] = parseFloat((this.numCustHr[i] * this.avgPnd).toFixed(2));
      this.totalPnd += this.numPndHr[i];
      this.numPndPerCup[i] = parseFloat((this.numCupHr[i] / 16).toFixed(2));
      this.netPnd[i] = parseFloat((this.numPndHr[i] + this.numPndPerCup[i]).toFixed(2));
      this.totalNetPnd += this.netPnd[i];
      this.numEmp[i] = Math.ceil((this.numCupHr[i] + this.numPndHr[i])/ 30);
      this.totalEmpHrs += this.numEmp[i];
    }
    this.totalCup = parseFloat(this.totalCup.toFixed(2));
    this.totalPnd = parseFloat(this.totalPnd.toFixed(2));
    this.totalNetPnd = parseFloat(this.totalNetPnd.toFixed(2));
  };

  //Method to output the shop information to data.html
  this.render = function(tableName) {
    var trEl = document.createElement('tr');
    var tdEl = [];
    for (var i = 0; i < hours.length + 2; i++) {
      tdEl[i] = document.createElement('td');
    }
    tdEl[0].textContent = this.name;
    trEl.appendChild(tdEl[0]);
    if (tableName === beans) {
      tdEl[1].textContent = this.totalNetPnd;
      trEl.appendChild(tdEl[1]);
      for (var i = 0; i < hours.length; i++) {
        tdEl[i + 2].textContent = this.netPnd[i];
        trEl.appendChild(tdEl[i + 2]);
      }
      beansTableEl.appendChild(trEl);
    } else {
      tdEl[1].textContent = this.totalEmpHrs;
      trEl.appendChild(tdEl[1]);
      for (var i = 0; i < hours.length; i++) {
        tdEl[i + 2].textContent = this.numEmp[i];
        trEl.appendChild(tdEl[i + 2]);
      }
      baristasTableEl.appendChild(trEl);
    }
  }
};

//Function that will create a totals row
function tableTotal(tableName) {
  var trEl = document.createElement('tr');
  var tdEl = [];
  tdEl[0] = document.createElement('td');
  tdEl[0].textContent = "Totals";
  trEl.appendChild(tdEl[0]);
  tdEl[1] = document.createElement('td');
  if (tableName === beans) {
    tdEl[1].textContent = parseFloat((coffeeShop[0].totalNetPnd + coffeeShop[1].totalNetPnd + coffeeShop[2].totalNetPnd + coffeeShop[3].totalNetPnd + coffeeShop[4].totalNetPnd).toFixed(2));
    trEl.appendChild(tdEl[1]);
    for (var i = 0; i < hours.length; i++) {
      tdEl[i + 2] = document.createElement('td');
      var hourlyTotals = 0;
      for (var j = 0; j < coffeeShop.length; j++) {
        hourlyTotals += coffeeShop[j].netPnd[i];
      }
      tdEl[i + 2].textContent = parseFloat(hourlyTotals.toFixed(2));
      trEl.appendChild(tdEl[i + 2]);
    }
    beansTableEl.appendChild(trEl);
  } else {
    tdEl[1].textContent = parseFloat((coffeeShop[0].totalEmpHrs + coffeeShop[1].totalEmpHrs + coffeeShop[2].totalEmpHrs + coffeeShop[3].totalEmpHrs + coffeeShop[4].totalEmpHrs).toFixed(2));
    trEl.appendChild(tdEl[1]);
    for (var i = 0; i < hours.length; i++) {
      tdEl[i + 2] = document.createElement('td');
      var hourlyTotals = 0;
      for (var j = 0; j < coffeeShop.length; j++) {
        hourlyTotals += coffeeShop[j].numEmp[i];
      }
      tdEl[i + 2].textContent = parseFloat(hourlyTotals.toFixed(2));
      trEl.appendChild(tdEl[i + 2]);
    }
    baristasTableEl.appendChild(trEl);
  }
}


//Creating the coffee shop objects and creating the table of information
coffeeShop[0] = new CoffeeShop("Pike Place Market", 14, 35, 1.2, 0.34);
coffeeShop[1] = new CoffeeShop("Capitol Hill", 12, 28, 3.2, 0.03);
coffeeShop[2] = new CoffeeShop("Seattle Public Library", 9, 45, 2.6, 0.02);
coffeeShop[3] = new CoffeeShop("South Lake Union", 5, 18, 1.3, 0.04);
coffeeShop[4] = new CoffeeShop("Sea-Tac Airport", 28, 44, 1.1, 0.41);

tableHeader(beans);
tableHeader(baristas);
for (var i = 0; i < coffeeShop.length; i++) {
  coffeeShop[i].calculations();
  coffeeShop[i].render(beans);
  coffeeShop[i].render(baristas);
}
tableTotal(beans);
tableTotal(baristas);
