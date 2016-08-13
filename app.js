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
  this.tableEl = document.getElementById("beans");
  this.trEl = [];
  this.thEl = [];
  this.tdEl = [];

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
    for (var i = 0; i < coffeeShop.length + 2; i++) {
      this.trEl[i] = document.createElement('tr');
        for (var j = 0; j < hours.length + 2; j++) {
          this.tdEl[j] = document.createElement('td');
          this.tdEl[j].textContent = "test";
          this.trEl[i].appendChild(this.tdEl[j]);
        }
      this.tableEl.appendChild(this.trEl[i]);
    }
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
