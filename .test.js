'use strict';

//Set the day and hours the table will display
var day = prompt('Choose the day.');
var weekdayHours = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'];
var satHours = ['11am', '12pm', '1pm', '2pm', '3pm', '4pm'];

var hours = [];
if (day.toUpperCase().trim()==='SATURDAY'){
  hours = satHours;
} else if (day.toUpperCase().trim()!=='SUNDAY'){
  hours = weekdayHours;
}
document.getElementById('dynamic').colSpan = hours.length;

var hoursEl = document.getElementById('hours');
for(var i=0; i<hours.length; i++){
  var td = document.createElement('td');
  td.textContent = hours[i];
  hoursEl.appendChild(td);
}

//List of existing Venues

Venue.all = [];

//Venue Constructor Function

function Venue(address, min, max, aveSold){
  if (arguments.length<5) {console.error('Address, min, max, and aveSold are required!');}
  this.address = address;
  this.min = min;
  this.max = max;
  this.aveSold = aveSold;
  this.soldHourly = [];

  //Add new venue to the list of venues
  Venue.all.push(this);
}

//Create inital venues
var venueA = new Venue('1st and Pike', 23, 65, 6.3, 'a');
var venueB = new Venue('SeaTac Airport', 3, 24, 1.2, 'b');
var venueC = new Venue('Seattle Center', 11, 38, 3.7, 'c');
var venueD = new Venue('Capitol Hill', 20, 38, 2.3, 'd');
var venueE = new Venue('Alki', 2, 16, 4.6, 'e');

//Function to render simulated data for all venues to the table
Venue.renderAll = function(){
  resetTotalSoldPerHour();
  var venueTr = document.getElementById('venueDisplay');
  venueTr.innerHTML = '';

  for(var i=0; i<Venue.all.length; i++){
    Venue.all[i].render();
  }
  var venueBottomTotalsTr = document.getElementById('bottomTotals');
  venueBottomTotalsTr.innerHTML = '<th>Totals</th>';
  venueA.renderTotals();
};

//Simulate number of customers per hour
Venue.prototype.simCustPerHour = function(){
  var max = this.max;
  var min = this.min;
  return Math.ceil(Math.random()*(max-min)+min);
};

//Simulate number of cookies sold per hour
Venue.prototype.simSoldPerHour = function(){
  return Math.ceil(this.aveSold*this.simCustPerHour());
};

//Resets the array used to get the bottom totals per hour. Without this, new values will be added to the initial total
function resetTotalSoldPerHour(){
  if(day.toUpperCase().trim()=== 'SATURDAY'){
    Venue.prototype.totalSoldPerHour = [0, 0, 0, 0, 0, 0];
  }else if(day.toUpperCase().trim()!== 'SUNDAY'){
    Venue.prototype.totalSoldPerHour = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
}

//Creates an array with the simulated number of cookies sold during every hour the store is open on a set day
Venue.prototype.simSold = function(){
  if (day.toUpperCase().trim()==='SATURDAY'){
    var hours = satHours;
  }else if (day.toUpperCase().trim()==='SUNDAY'){
    hours = 0;
  } else{
    hours = weekdayHours;
  }
  for (var i = 0; i<hours.length; i++){
    var theNum = this.simSoldPerHour();
    this.soldHourly[i] = theNum;
    this.totalSoldPerHour[i] += theNum;
  }
  return this.soldHourly;
};

//Function used to write the simulated hourly cookies sold to the table and the total hourly cookies sold by every store
function getValuesAndTotals(sold, venueList){
  var total = 0;
  for(var i=0; i<sold.length; i++){
    var td = document.createElement('td');
    var soldString = sold[i];
    td.textContent = soldString;
    venueList.appendChild(td);
  }
  var tl = document.createElement('td');
  tl.className = 'total';
  for( i=0; i<sold.length; i++){
    total = total + sold[i];
  }
  tl.textContent = total;
  venueList.appendChild(tl);
}

//Locates the area in which the venue addresses and the aforementioned values are to be written.
Venue.prototype.render = function(){
  var id = this.address;
  var venueDisplay = document.querySelector('#venueDisplay');
  var tr = document.createElement('tr');
  tr.innerHTML = '<td>' + this.address + '</td>';
  venueDisplay.appendChild(tr);

  var sold = this.simSold();

  getValuesAndTotals(sold, tr);
};

Venue.prototype.renderTotals = function(){
  var id = 'bottomTotals';
  var venueList = document.getElementById(id);
  var sold = this.totalSoldPerHour;

  getValuesAndTotals(sold, venueList);
};

//Obtains properties for a new venue and renders it to the table
function handleSubmit(event){
  event.preventDefault();

  var address = event.target.address.value;
  var min = event.target.custMin.value;
  var max = event.target.custMax.value;
  var aveSold = event.target.aveSold.value;

  var newVenue = new Venue(address, min, max, aveSold);
  Venue.renderAll();
}

//Sets up the handleSubmit function
var form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

//Self-explanatory
function startSimulation(){
  resetTotalSoldPerHour();
  venueA.render();
  venueB.render();
  venueC.render();
  venueD.render();
  venueE.render();
  venueA.renderTotals();
}

startSimulation();