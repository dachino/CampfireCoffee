var pikePlaceMarket = {
  name: "Pike Place Market",
  minCustRate: 14,
  maxCustRate: 35,
  avgCup: 1.2,
  avgPnd: 0.34,
  numCustHr: function() {
    return Math.floor(Math.random() * (this.maxCustRate - this.minCustRate) + this.minCustRate);
  },
  numCupHr: function() {
    return this.numCustHr() * this.avgCup;
  }
};
