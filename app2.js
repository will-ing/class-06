'strict'

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm']

var storeArr = []; // used to store objects in an arr. func ttlByHour needs this to run its loop.

var table = document.getElementById('tableOne') // finds id to reference

var createStore = function(name, maxCust, minCust, avgCook){
  this.name = name;
  this.maxCust = maxCust;
  this.minCust = minCust;
  this.avgCook = avgCook;
  this.cookiesPerHour = [];
  this.custArr = [];
  this.ttl = 0;
  storeArr.push(this);
}

var seattle = new createStore('seattle', 65, 23, 6.3);// creates store object and its properties using constructor
var tokyo = new createStore('tokyo', 24, 3, 1.2);
var dubai = new createStore('dubai', 28, 11, 3.7);
var paris = new createStore('paris', 38, 20, 2.3);
var lima = new createStore('lima', 16, 2, 4.6);

// generates random numbers and stores them in the cookiesPerHour array
createStore.prototype.generator = function(){
  var i = 0;
  while (i < hours.length){
    var cookieGen = Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust) * this.avgCook;
    this.cookiesPerHour.push(Math.floor(cookieGen));
    i++
  }
  console.log(storeArr, this.cookiesPerHour)
  return (this.cookiesPerHour);

}

// adds cookiesPerHour array and puts in to the total for a store
createStore.prototype.addingTotalPerHour = function(){ //sums up an array
  var i = 0;
  while (i < this.cookiesPerHour.length){
    this.ttl += this.cookiesPerHour[i];
    i++;
  }
  console.log(this.ttl)
  return(this.ttl);
}

// need to create loop to go through all the stores.
function genAllStores(){
  
  var i = 0;
  while(i < storeArr.length){
    storeArr[i].generator();
    storeArr[i].addingTotalPerHour();
    i++
  }
}


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



// renders stores on the page at the total on the for each store
function rowRow(){
  i = 0
  

  
  while(i < storeArr.length){

    var row = document.createElement('tr');
    table.appendChild(row)
    var data = document.createElement('td');
    row.appendChild(data);
    data.textContent = storeArr[i].name
    row.appendChild(data)
    j = 0
    while(j < hours.length){
      var dataOne = document.createElement('td');
      dataOne.textContent = storeArr[i].cookiesPerHour[j];
      row.appendChild(dataOne);
      j++;
      
    }
    var endRow = document.createElement('td')
    row.appendChild(endRow);
    endRow.textContent = storeArr[i].ttl;
    row.appendChild(endRow); 
    i++ 
   }

}

function bottomRow(){
  var tableTwo = document.getElementById('tableTwo')
  var rowOne = document.createElement('tr');
  tableTwo.appendChild(rowOne); 
  var rows = document.createElement('td'); 
  rows.textContent = 'Hour Totals'; 
  rowOne.appendChild(rows);

  var overallTtl = 0;
  var i=0
  while (i < hours.length){
    var j = 0;
    var endTotal = 0;
    while (j < storeArr.length){
      endTotal += storeArr[j].cookiesPerHour[i];
      j++;
    }
    overallTtl += endTotal;
    var row2 = document.createElement('td');
    row2.textContent = (endTotal)
    tableTwo.appendChild(row2);
    i++
  }
  var lastRow = document.createElement('td');
  lastRow.textContent = (overallTtl);
  tableTwo.appendChild(lastRow);
  
}


function formHandler(event) {
  event.preventDefault();

  var name = event.target.name.value;
  var minCust = parseInt(event.target.minCust.value);
  var maxCust = parseInt(event.target.maxCust.value);
  var avgSold = parseInt(event.target.avgSold.value);
  

  var newStore = new CookieStand(name, minCust, maxCust, avgSold);

  
  newStore.generator();
  newStore.addingTotalPerHour();
  rowRow();
  bottomRow();
  console.log('did it work?', storeArr)
}

var newForm = document.getElementById('tableOne');

newForm.addEventListener('submit', formHandler);
genAllStores();

createHead();

rowRow();

bottomRow();



