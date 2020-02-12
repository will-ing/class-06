'strict'

// create the element
// modify the element
// append the element

// Pat will need to be able to add and remove locations from the daily projections report,


var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm']

var dayOfWeek = ['sun', 'mon', 'tues', 'wed', 'thur', 'fri', 'sat']

function numberOfCookiesNeeded(arr){ //sums up an array
  var i = 0;
  var ttl = 0;
  while (i < arr.length){
    ttl = ttl + arr[i];
    i++;
  }
  return(ttl);
}

// generates cookies purchased by hour
function cookiesPurchased(enterStore){ // enter the store that the const built
  var cookiesUPH = 0 // starts the loop
  while (cookiesUPH < hours.length) { // when cookiesUPH is less than hours arr run loop
    var cookiesPerHour = Math.floor((Math.random() * (enterStore.maxCustomers - enterStore.minCustomers) + enterStore.minCustomers)) * Math.floor(enterStore.avgCookies); // creates random cookies per hour var that multiplies random number and avgCookies
    hours[cookiesUPH] += ' ' + cookiesPerHour; // creates concatenation for hours arr & cookiesPerHour var
    enterStore.cookiesSold.push(cookiesPerHour); // pushes random number to arr in each store object
    cookiesUPH++ //increments var to loop through hour arr
  }
  return(enterStore.cookiesPerHour);
}

var storeArr = [];

var createStore = function(name, maxCustomers, minCustomers, avgCookies, cookiesSold){
  this.name = name;
  this.maxCustomers = maxCustomers;
  this.minCustomers = minCustomers;
  this.avgCookies = avgCookies;
  this.cookiesSold = cookiesSold;
  storeArr.push(name)
  

}
// creates seattle object
var seattle = new createStore('seattle', 65, 23, 6.3, []);
var tokyo = new createStore('tokyo', 24, 3, 1.2,[]);
var dubai = new createStore('dubai', 28, 11, 3.7, []);
var paris = new createStore('paris', 38, 20, 2.3, []);
var lima = new createStore('lima', 16, 2, 4.6, []);

function createHead(){ //creates head of table
  var table = document.getElementById('tableOne')
  var rowOne = document.createElement('tr');
  table.appendChild(rowOne); // this makes the rows
  var head = document.createElement('th');
  head.textContent = 'Store Name'; // identify what goes in the head
  rowOne.appendChild(head); 
    for (j = 0; j < hours.length; j++){ //this will make the head with the values of the hours arr
      var head = document.createElement('th');
      head.textContent = hours[j]; // identify what goes in the head
      rowOne.appendChild(head); // adds it to the head
    }
    var head = document.createElement('th');
      head.textContent = 'Total Cookies'; // identify what goes in the head
      rowOne.appendChild(head); 
}


function rowRow(allTheCookies){// creates rows based on store entered
  var table = document.getElementById('tableOne')
  var rowOne = document.createElement('tr');
  table.appendChild(rowOne); 
  var rows = document.createElement('td');
  rows.textContent = allTheCookies.name; 
  rowOne.appendChild(rows); 
  for (k = 0; k < allTheCookies.cookiesSold.length; k++){
    var rows = document.createElement('td');
    rows.textContent = allTheCookies.cookiesSold[k]; 
    rowOne.appendChild(rows); 
  }

}
// pushes total of cookies sold to the end of the arr.
function totalByStore(stor){
  stor.cookiesSold.push(numberOfCookiesNeeded(stor.cookiesSold));
}

function ttlByHour(){
  var table = document.getElementById('tableOne') // select table one
  var rowOne = document.createElement('tr'); // create table row as rowOne
  table.appendChild(rowOne); // row is appended
  var ttl = 0 // ttl holds sum by hour
  for ( w = 0; w < hours.length; w++) // loops through hours arr for ttl hrs
    for (q = 0; q < storeArr.length; q++){
      var ttl = ttl + storeArr[w].cookiesSold[w]; // grabs first index for storeArr and cookiesSold to add in to ttl.
    }
    
    var rows = document.createElement('td'); // creates an element for table column
    rows.textContent = ttl; // assigns it ttl
    rowOne.appendChild(rows); // adds values of ttl to HTML table
}

createHead();

cookiesPurchased(seattle);
totalByStore(seattle);
rowRow(seattle);

cookiesPurchased(tokyo);
totalByStore(tokyo);
rowRow(tokyo);

cookiesPurchased(dubai);
totalByStore(dubai);
rowRow(dubai);

cookiesPurchased(paris);
totalByStore(paris);
rowRow(paris);

cookiesPurchased(lima);
totalByStore(lima);
rowRow(lima);

ttlByHour();





