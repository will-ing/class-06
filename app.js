'strict'

// create the element
// modify the element
// append the element

// Pat will need to be able to add and remove locations from the daily projections report,


var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm']

// var dayOfWeek = ['sun', 'mon', 'tues', 'wed', 'thur', 'fri', 'sat']

function numberOfCookiesNeeded(arr){ //sums up an array
  var i = 0;
  var ttl = 0;
  while (i < arr.length){
    ttl = ttl + arr[i];
    i++;
  }
  console.log(ttl);
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
var tableHead = ['Name', 'Max customer', 'Min Customer', 'Avg cookies sold'];

var createStore = function(name, maxCustomers, minCustomers, avgCookies, cookiesSold){
  this.name = name;
  this.maxCustomers = maxCustomers;
  this.minCustomers = minCustomers;
  this.avgCookies = avgCookies;
  this.cookiesSold = cookiesSold;
  storeArr.push(name)
  

}
// creates seattle object
var seattle = new createStore('Seattle', 65, 23, 6.3, []);
var tokyo = new createStore('Tokyo', 24, 3, 1.2,[]);
var dubai = new createStore('Dubai', 28, 11, 3.7, []);
var paris = new createStore('Paris', 38, 20, 2.3, []);
var lima = new createStore('Lima', 16, 2, 4.6, []);

// var table = document.getElementById('tableOne') // get the element
// var rowOne = document.createElement('tr'); // create the element

// table.appendChild(rowOne);//creates row in table

// var head = document.createElement('th') // creates header
// head.textContent = 'store name'; // modify content
// rowOne.appendChild(head); // append the element

// var rowTwo = document.createElement('tr')
// table.appendChild(row);

// var cellOne = document.createElement('td')


function createHead(){
  var table = document.getElementById('tableOne')
  var rowOne = document.createElement('tr');
  table.appendChild(rowOne); // this makes the rows
  var head = document.createElement('th');
  head.textContent = 'Store Name'; // identify what goes in the head
  rowOne.appendChild(head); 
    for (j = 0; j < hours.length; j++){ //this will make the head with the values of the tableHead arr
      var head = document.createElement('th');
      head.textContent = hours[j]; // identify what goes in the head
      rowOne.appendChild(head); // adds it to the head
    }
}


function rowRow(allTheCookies){
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





createHead();
cookiesPurchased(seattle);
rowRow(seattle);
cookiesPurchased(tokyo);
rowRow(tokyo);
cookiesPurchased(dubai);
rowRow(dubai);
cookiesPurchased(paris);
rowRow(paris);
cookiesPurchased(lima);
rowRow(lima);

// try a loop




// object locations : Seattle, Tokyo, Dubai, Paris, Lima




  

  

