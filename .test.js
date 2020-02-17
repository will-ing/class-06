'use strict';

var table = document.getElementById('sales-data');
var allStores = [];
var storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

function CookieStand(name, minCust, maxCust, avgPerCust) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.cookiesPerHour = [];
  this.total = 0;
  this.avgPerCust = avgPerCust;
  allStores.push(this);
}
CookieStand.prototype.calculateCookiesPerHour = function () {
  for (var hour = 0; hour < storeHours.length; hour++) {
    this.cookiesPerHour[hour] = randomNumberOfCookies(this.minCust, this.maxCust, this.avgPerCust);
  }
}
CookieStand.prototype.calculateCookieSalesPerDay = function () {
  for (var i = 0; i < this.cookiesPerHour.length; i++) {
    console.log(this.total, 'current total', this.cookiesPerHour[i]);
    this.total += this.cookiesPerHour[i];
  }
}

function randomNumberOfCookies(min, max, avgPerCust) {
  var randomNumberOfCustomers = Math.floor(Math.random() * (max - min) + min);
  return Math.floor(randomNumberOfCustomers * avgPerCust);
}

// BUG REPORT: double loop combined with our loop on line 132 was changing values for our cookiesPerHour Array and causing stale data to be attached to our object
// function calculateCookiesPerHour() {
//   for (var store = 0; store < allStores.length; store++) {
//     for (var hour = 0; hour < storeHours.length; hour++) {
//       allStores[store].cookiesPerHour[hour] = randomNumberOfCookies(allStores[store].minCust, allStores[store].maxCust, allStores[store].avgPerCust)
//     }
//   }
// }

function render() {
  var child = table.lastChild;
  while (child) {
    table.removeChild(child);
    child = table.lastChild;
  }

  for (var i = 0; i < allStores.length; i++) {
    var row = document.createElement('tr');

    var cell = document.createElement('td');
    row.appendChild(cell);
    cell.textContent = allStores[i].name;

    for (var j = 0; j < allStores[i].cookiesPerHour.length; j++) {
      var cell1 = document.createElement('td');
      cell1.textContent = allStores[i].cookiesPerHour[j];
      row.appendChild(cell1);
    }

    var lastCell = document.createElement('td');
    row.appendChild(lastCell);
    lastCell.textContent = allStores[i].total;
    table.appendChild(row);
  }
  renderFooter(calcHourlyTotals());
}

function handleForm(event) {
  event.preventDefault();

  var name = event.target.name.value;
  var minCust = parseInt(event.target.minCust.value);
  var maxCust = parseInt(event.target.maxCust.value);
  var avg = parseInt(event.target.avgPerCust.value);

  var newStore = new CookieStand(name, minCust, maxCust, avg);
  newStore.calculateCookiesPerHour();
  newStore.calculateCookieSalesPerDay();
  render();
}

function calcHourlyTotals() {
  var results = { hourly: [], grand: 0 };
  var grand = 0;
  for (var hourNum = 0; hourNum < storeHours.length; hourNum++) {
    var hourly = 0;
    for (var storeNum = 0; storeNum < allStores.length; storeNum++) {
      hourly += allStores[storeNum].cookiesPerHour[hourNum];
      // grand += allStores[storeNum].cookiesPerHour[hourNum];
    }
    grand += hourly;
    results.hourly.push(hourly);
  }
  results.grand = grand;
  return results;
}

function addStoreTotals() {
  var total = 0;
  for (var i = 0; i < allStores.length; i++) {
    console.log(allStores[i].total);
    total += allStores[i].total;
  }
  return total;
}

function renderFooter(grandTotals) {
  var row = document.createElement('tr');
  var header = document.createElement('th');
  header.textContent = "Grand Totals";
  row.appendChild(header);

  for (var i = 0; i < grandTotals.hourly.length; i++) {
    var cell = document.createElement('td');
    cell.textContent = grandTotals.hourly[i];
    row.appendChild(cell);
  }
  var total = document.createElement('td');
  total.textContent = grandTotals.grand;
  row.appendChild(total);
  table.appendChild(row);
}

var form1 = document.getElementById('form');
form1.addEventListener('submit', handleForm);

var seattle = new CookieStand('Seattle', 20, 30, 50);
var paris = new CookieStand('Paris', 10, 20, 5);

for (var i = 0; i < allStores.length; i++) {
  allStores[i].calculateCookiesPerHour();
  allStores[i].calculateCookieSalesPerDay();
}
render();
console.log(addStoreTotals());