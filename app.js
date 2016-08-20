var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
var allCoffeeShops = [];  //Array for storing the coffee shop objects
var dailyTotalBeans = 0;    //Total lb of beans needed daily for all the shops
var dailyTotalEmp = 0;      //Total employee hours needed daily for all the shops
var hourlyTotalBeans = [];  //Total lb of beans needed hourly for all the shops
var hourlyTotalEmp = [];    //Total employee hours needed hourly for all the shops
var beansTableEl = document.getElementById('beans');
var baristasTableEl = document.getElementById('baristas');

//Constructor function to create coffee shop objects
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
};

//Prototype method to calculate the necessary data to output
CoffeeShop.prototype.calculations = function() {
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
    this.numEmp[i] = Math.ceil((this.numCupHr[i] + this.numPndHr[i]) / 30);
    this.totalEmpHrs += this.numEmp[i];
  }
  this.totalCup = parseFloat(this.totalCup.toFixed(2));
  this.totalPnd = parseFloat(this.totalPnd.toFixed(2));
  this.totalNetPnd = parseFloat(this.totalNetPnd.toFixed(2));
};

//Function that will output the table header onto data.html
function renderTableHeader(tableElement, secondColHeader) {
  var trEl = document.createElement('tr');
  var thEl = [];
  thEl[0] = document.createElement('th');
  thEl[0].classList.add('firstCol');
  thEl[1] = document.createElement('th');
  thEl[1].classList.add('secondCol');
  thEl[0].textContent = 'Locations';
  thEl[1].textContent = secondColHeader;
  trEl.appendChild(thEl[0]);
  trEl.appendChild(thEl[1]);
  for (var i = 0; i < hours.length; i++) {
    thEl[i + 2] = document.createElement('th');
    thEl[i + 2].textContent = hours[i];
    trEl.appendChild(thEl[i + 2]);
  }
  tableElement.appendChild(trEl);
}

//Prototype method to output the shop information to data.html
CoffeeShop.prototype.render = function(tableElement, totals, hourly) {
  var trEl = document.createElement('tr');
  var tdEl = [];
  for (var i = 0; i < hours.length + 2; i++) {
    tdEl[i] = document.createElement('td');
  }
  tdEl[0].textContent = this.name;
  trEl.appendChild(tdEl[0]);
  tdEl[1].textContent = totals;
  trEl.appendChild(tdEl[1]);
  for (i = 0; i < hours.length; i++) {
    tdEl[i + 2].textContent = hourly[i];
    trEl.appendChild(tdEl[i + 2]);
  }
  tableElement.appendChild(trEl);
};

//Function to add up the totals for all the stores combined
function totalCalc() {
  dailyTotalBeans = 0;    //Reset values
  dailyTotalEmp = 0;
  hourlyTotalBeans = [];
  hourlyTotalEmp = [];
  for (var i = 0; i < allCoffeeShops.length; i++) {
    dailyTotalBeans += allCoffeeShops[i].totalNetPnd;
    dailyTotalEmp += allCoffeeShops[i].totalEmpHrs;
  }
  dailyTotalBeans = parseFloat(dailyTotalBeans.toFixed(2));
  dailyTotalEmp = parseFloat(dailyTotalEmp.toFixed(2));
  for (i = 0; i < hours.length; i++) {
    var beanTemp = 0;
    var empTemp = 0;
    for (var j = 0; j < allCoffeeShops.length; j++) {
      beanTemp += (allCoffeeShops[j].netPnd[i]);
      empTemp += (allCoffeeShops[j].numEmp[i]);
    }
    hourlyTotalBeans.push(parseFloat(beanTemp.toFixed(2)));
    hourlyTotalEmp.push(parseFloat(empTemp.toFixed(2)));
  }
}

//Function that will output the totals row onto data.html
function renderTotal(tableElement, dailyTotal, hourlyTotal) {
  var trEl = document.createElement('tr');
  trEl.classList.add('totalsRow');
  var tdEl = [];
  tdEl[0] = document.createElement('td');
  tdEl[0].textContent = 'Totals';
  trEl.appendChild(tdEl[0]);
  tdEl[1] = document.createElement('td');
  tdEl[1].textContent = dailyTotal;
  trEl.appendChild(tdEl[1]);
  for (var i = 0; i < hours.length; i++) {
    tdEl[i + 2] = document.createElement('td');
    tdEl[i + 2].textContent = hourlyTotal[i];
    trEl.appendChild(tdEl[i + 2]);
  }
  tableElement.appendChild(trEl);
}

//Creating the coffee shop objects
allCoffeeShops[0] = new CoffeeShop('Pike Place Market', 14, 35, 1.2, 0.34);
allCoffeeShops[1] = new CoffeeShop('Capitol Hill', 12, 28, 3.2, 0.03);
allCoffeeShops[2] = new CoffeeShop('Seattle Public Library', 9, 45, 2.6, 0.02);
allCoffeeShops[3] = new CoffeeShop('South Lake Union', 5, 18, 1.3, 0.04);
allCoffeeShops[4] = new CoffeeShop('Sea-Tac Airport', 28, 44, 1.1, 0.41);

renderTableHeader(beansTableEl, 'Daily Location Totals');
renderTableHeader(baristasTableEl, 'Total Employee Hours');

//Master render function that will run the other render functions for table body and totals row
function renderMaster (shopNum) {
  for (i = shopNum; i < allCoffeeShops.length; i++) {
    allCoffeeShops[i].calculations();
    allCoffeeShops[i].render(beansTableEl, allCoffeeShops[i].totalNetPnd, allCoffeeShops[i].netPnd);
    allCoffeeShops[i].render(baristasTableEl, allCoffeeShops[i].totalEmpHrs, allCoffeeShops[i].numEmp);
  }
  totalCalc();
  renderTotal(beansTableEl, dailyTotalBeans, hourlyTotalBeans);
  renderTotal(baristasTableEl, dailyTotalEmp, hourlyTotalEmp);
}
renderMaster(0);

//Code for the Coffee Kiosk Form
var coffeeStoreForm = document.getElementById('coffeeStoreForm');

function genNewCoffeeShop(event) {
  event.preventDefault();
  var newName = event.target.name.value;
  var newMinCustRate = parseFloat(event.target.minCustRate.value);
  var newMaxCustRate = parseFloat(event.target.maxCustRate.value);
  var newAvgCup = parseFloat(event.target.avgCup.value);
  var newAvgPnd = parseFloat(event.target.avgPnd.value);
  allCoffeeShops.push(new CoffeeShop(newName, newMinCustRate, newMaxCustRate, newAvgCup, newAvgPnd));
  beansTableEl.removeChild(document.getElementsByClassName('totalsRow')[0]);    //Removes the Totals row
  baristasTableEl.removeChild(document.getElementsByClassName('totalsRow')[0]);  //Removes the Totals row
  renderMaster(allCoffeeShops.length - 1);      //Rerun the master render function
}

coffeeStoreForm.addEventListener('submit', genNewCoffeeShop);
