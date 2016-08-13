var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
var coffeeShop = [];  //Array for storing the coffee shop objects

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
  this.ulEl = document.getElementById(this.name);
  this.liEl = [];

  // Calculate all the necessary data to output
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
      this.numEmp[i] = Math.ceil(this.numCustHr[i] / 30)
    }
    this.totalCup = parseFloat(this.totalCup.toFixed(2));
    this.totalPnd = parseFloat(this.totalPnd.toFixed(2));
    this.totalNetPnd = parseFloat(this.totalNetPnd.toFixed(2));
  };

  // Outputting the shop information to data.html
  this.render = function() {
    console.log("Number of employees needed at " + this.name + " for each hour:",this.numEmp);
    for (var i = 0; i < hours.length; i++) {
      this.liEl[i] = document.createElement('li');
      this.liEl[i].textContent = hours[i] + ': ' + this.netPnd[i] + ' lbs [' + this.numCustHr[i] + ' customers, ' + this.numCupHr[i] + ' cups (' + this.numPndPerCup[i] + ' lbs), ' + this.numPndHr[i] + ' lbs to-go]';
      this.ulEl.appendChild(this.liEl[i]);
    }
    this.liEl[15] = document.createElement('li');
    this.liEl[15].textContent = 'Total customers at Pike Place Market: ' + this.totalCust;
    this.ulEl.appendChild(this.liEl[15]);
    this.liEl[16] = document.createElement('li');
    this.liEl[16].textContent = 'Total cups sold at Pike Place Market: ' + this.totalCup;
    this.ulEl.appendChild(this.liEl[16]);
    this.liEl[17] = document.createElement('li');
    this.liEl[17].textContent = 'Total to-go pound packages sold at Pike Place Market: ' + this.totalPnd;
    this.ulEl.appendChild(this.liEl[17]);
    this.liEl[18] = document.createElement('li');
    this.liEl[18].textContent = 'Total pounds of beans needed at Pike Place Market: ' + this.totalNetPnd;
    this.ulEl.appendChild(this.liEl[18]);
  };
}

//Creating the coffee shop objects
coffeeShop[0] = new CoffeeShop("Pike Place Market", 14, 35, 1.2, 0.34);
coffeeShop[1] = new CoffeeShop("Capitol Hill", 12, 28, 3.2, 0.03);
coffeeShop[2] = new CoffeeShop("Seattle Public Library", 9, 45, 2.6, 0.02);
coffeeShop[3] = new CoffeeShop("South Lake Union", 5, 18, 1.3, 0.04);
coffeeShop[4] = new CoffeeShop("Sea-Tac Airport", 28, 44, 1.1, 0.41);

for (var i = 0; i < coffeeShop.length; i++) {
  coffeeShop[i].calculations();
  coffeeShop[i].render();
}
