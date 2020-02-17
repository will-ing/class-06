'strict'

// create the element
// modify the element
// append the element

// Pat will need to be able to add and remove locations from the daily projections report,

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm']

var dayOfWeek = ['sun', 'mon', 'tues', 'wed', 'thur', 'fri', 'sat']

var storeArr = []; // used to store objects in an arr. func ttlByHour needs this to run its loop.

var table = document.getElementById('tableOne') // finds id to reference

function numberOfCookiesNeeded(arr){ //sums up an array
  var i = 0;
  var ttl = 0;
  while (i < arr.length){
    ttl = ttl + arr[i];
    i++;
  }
  return(ttl);
}

var createStore = function(name, maxCustomers, minCustomers, avgCookies){ // constr func to build objects based on imputed properties
  this.name = name;
  this.maxCustomers = maxCustomers;
  this.minCustomers = minCustomers;
  this.avgCookies = avgCookies;
  this.cookiesSold = [];
  this.customerPerHour = [];
  storeArr.push(this); // pushes all properties to arr

}
// creates seattle object
var seattle = new createStore('seattle', 65, 23, 6.3);// creates store object and its properties using constructor
var tokyo = new createStore('tokyo', 24, 3, 1.2);
var dubai = new createStore('dubai', 28, 11, 3.7);
var paris = new createStore('paris', 38, 20, 2.3);
var lima = new createStore('lima', 16, 2, 4.6);

function createHead(){ //creates head of table
  var rowOne = document.createElement('tr'); 
  table.appendChild(rowOne); // this makes the rows
  var head = document.createElement('th');
  head.textContent = 'Store Name'; // identify what goes in the head
  rowOne.appendChild(head); 
    for (var j = 0; j < hours.length; j++){ //this will make the head with the values of the hours arr
      var head = document.createElement('th');
      head.textContent = hours[j]; // identify what goes in the head
      rowOne.appendChild(head); // adds it to the head
    }
    var head = document.createElement('th');
    head.textContent = 'Total Cookies'; // identify what goes in the head
    rowOne.appendChild(head); 
}

createStore.prototype.custGenerator = function (){
  var custPerHour = Math.floor((Math.random() * (this.maxCustomers - this.minCustomers) + this.minCustomers));
  this.customerPerHour.push(custPerHour);  
  // console.log(custPerHour)
  return(this.customerPerHour)
}

createStore.prototype.cookiesPurchased = function(){
  var i  =  0;
  while (i < hours.length){
    var cookiesUPH = this.custGenerator()[i] * this.avgCookies;
    this.cookiesSold.push(Math.floor(cookiesUPH));
    i++ //increments var to loop through hour arr
  }
  // console.log(this.cookiesSold)
  return(this.cookiesUPH);
}


// pushes total of cookies sold per store to the end of the arr.
function totalByStore(stor){
  stor.cookiesSold.push(numberOfCookiesNeeded(stor.cookiesSold));
}


function rowRow(allTheCookies){// creates rows based on stores entered
  var rowOne = document.createElement('tr'); // create table row as rowOne
  table.appendChild(rowOne); // row is appended
  var rows = document.createElement('td'); // creates an element for table data
  rows.textContent = allTheCookies.name; // assigns first row "hour ttls"
  rowOne.appendChild(rows); // add 'rows' content to first <td> in row
  for (var k = 0; k < allTheCookies.cookiesSold.length; k++){ 
    var rows = document.createElement('td');
    rows.textContent = allTheCookies.cookiesSold[k]; 
    rowOne.appendChild(rows); 
  }
}

function ttlByHour(){
  var tableTwo = document.getElementById('tableTwo')
  var rowOne = document.createElement('tr'); // create table row as rowOne
  tableTwo.appendChild(rowOne); // row is appended
  var rows = document.createElement('td'); // creates an element for table data
  rows.textContent = 'Hour Totals'; // assigns first row "hour ttls"
  rowOne.appendChild(rows); // add 'rows' content to first <td> in row
  for (var w = 0; w < hours.length; w++) {// loops through hours arr for ttl hrs
    var ttl = 0 // ttl holds sum by hour and then assigns it to hour the loop is on
    for (var q = 0; q < storeArr.length; q++){ // loops through storeArr for stores that are created and creates <td> for the row.
      ttl = ttl + storeArr[q].cookiesSold[w]; // adds stores combined ttl per hour on each hour
    }
    var rows = document.createElement('td'); // creates an element for table column
    rows.textContent = ttl; // assigns it ttl
    rowOne.appendChild(rows); // adds values of ttl to HTML table
  }
  var rows = document.createElement('td');
  rows.textContent = overAllTtl();
  rowOne.appendChild(rows);
}

function overAllTtl(){ // needs to get total for all hours and stores; prototype maybe? --brocken--
  var ttlCookies = numberOfCookiesNeeded(seattle.cookiesSold) +
  numberOfCookiesNeeded(tokyo.cookiesSold) +
  numberOfCookiesNeeded(dubai.cookiesSold) +
  numberOfCookiesNeeded(paris.cookiesSold) +
  numberOfCookiesNeeded(lima.cookiesSold); // works; should refactor to loop
  return(ttlCookies);
  // Need to print on last cell of the page
  
}

function dry(arr) {
  for (var t = 0; t < arr.length; t++){
    arr[t].cookiesPurchased(); // generates random number of cookies by hour and stores in each object arr
    totalByStore(arr[t]); // Sums up arr of random cookie sales and adds it ot the end of the arr
    rowRow(arr[t]) // displays the store argument entered and displays the name of the store followed by the cookies sold by hour
  }
}

createHead(); // func makes header of table

dry(storeArr); // runs 3 func in to loop for rows




// Create a new HTML form to accept the information for a new cookie stand. 

function enterStore(event){
  event.preventDefault();

  var name = event.target.store.value; // this is targeting the value of the input
  var maxCust = parseInt(event.target.max.value);
  var minCust = parseInt(event.target.min.value);
  var avgCookies = parseInt(event.target.avgSold.value);
  var newStore = new createStore(name, maxCust, minCust, avgCookies);

  newStore.cookiesPurchased();
  totalByStore(newStore);
  rowRow(newStore);
  
  console.log('did it work?', storeArr);
}

var bestFormEver = document.getElementById('nameForm');

bestFormEver.addEventListener('submit', enterStore)

ttlByHour(); // Last row  on table with hourly ttl