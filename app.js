'strict'



// number of cookies to make depends on the hours of operation (6:00 AM to 8:00 PM for all locations)

// Pat will need to be able to add and remove locations from the daily projections report,

// modify the input numbers for each location based on day of the week, special events, and other factors. 

// Display the values of each array as unordered lists in the browser

// needs to calculate the number of cookies each location must make every day

function numberOfCookiesNeeded(arr){ 
  var i = 0;
  var j = 0;
  while (i < arr.length){
    j = j + arr[i];
    i++;
  }
  console.log(j);
  return(j);
}


// object locations : Seattle, Tokyo, Dubai, Paris, Lima

var seattle = {
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],
  dayOfWeek: ['sun','mon', 'tues', 'wed', 'thur', 'fri', 'sat'],
  maxCustomers:  65,
  minCustomers: 23,
  avgCookies: 6.3,
  cookiesSold: [],
  cookiesPurchased: function(){
    var cookiesUPH = 0
    while (cookiesUPH < this.hours.length) {
      var cookiesPerHour = Math.floor((Math.random() * (this.maxCustomers - this.minCustomers) + 1)) * this.avgCookies;
      this.hours[cookiesUPH] += ' ' + cookiesPerHour;
      this.cookiesSold.push(cookiesPerHour);
      cookiesUPH++
    }
    console.log(this.hours);
    return(this.hours);
  },

  }

var tokyo = {
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],
  dayOfWeek: ['sun','mon', 'tues', 'wed', 'thur', 'fri', 'sat'],
  maxCustomers:  24,
  minCustomers: 3,
  avgCookies: 1.2,
  cookiesSold: [],
   cookiesPurchased: function (){
    var cookiesUPH = 0
    while (cookiesUPH < this.hours.length) {
      var cookiesPerHour = Math.floor((Math.random() * (this.maxCustomers - this.minCustomers) + 1)) * this.avgCookies;
      this.hours[cookiesUPH] += ' ' + cookiesPerHour;
      this.cookiesSold.push(cookiesPerHour);
      cookiesUPH++
    }
    console.log(this.hours);
    return(this.hours);
  }
  }

var dubai = {
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],
  dayOfWeek: ['sun','mon', 'tues', 'wed', 'thur', 'fri', 'sat'],
  maxCustomers:  28,
  minCustomers: 11,
  avgCookies: 3.7,
  cookiesSold: [],
  cookiesPurchased: function (){
    var cookiesUPH = 0
    while (cookiesUPH < this.hours.length) {
      var cookiesPerHour = Math.floor((Math.random() * (this.maxCustomers - this.minCustomers) + 1)) * this.avgCookies;
      this.hours[cookiesUPH] += ' ' + cookiesPerHour;
      this.cookiesSold.push(cookiesPerHour);
      cookiesUPH++
    }
    console.log(this.hours);
    return(this.hours);
  }
  }


var paris = {
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],
  dayOfWeek: ['sun','mon', 'tues', 'wed', 'thur', 'fri', 'sat'],
  maxCustomers:  38,
  minCustomers: 20,
  avgCookies: 2.3,
  cookiesSold: [],
  cookiesPurchased: function (){
    var cookiesUPH = 0
    while (cookiesUPH < this.hours.length) {
      var cookiesPerHour = Math.floor((Math.random() * (this.maxCustomers - this.minCustomers) + 1)) * this.avgCookies;
      this.hours[cookiesUPH] += ' ' + cookiesPerHour;
      this.cookiesSold.push(cookiesPerHour);
      cookiesUPH++
    }
    console.log(this.hours);
    return(this.hours);
  }
  }

var lima = {
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],
  dayOfWeek: ['sun','mon', 'tues', 'wed', 'thur', 'fri', 'sat'],
  maxCustomers:  16,
  minCustomers: 2,
  avgCookies: 4.6,
  cookiesSold: [],
  cookiesPurchased: function (){
    var cookiesUPH = 0
    while (cookiesUPH < this.hours.length) {
      var cookiesPerHour = Math.floor((Math.random() * (this.maxCustomers - this.minCustomers) + 1)) * this.avgCookies;
      this.hours[cookiesUPH] += ' ' + cookiesPerHour;
      this.cookiesSold.push(cookiesPerHour);
      cookiesUPH++
    }
    console.log(this.hours);
    return(this.hours);
  }
  }

// var seattleEl = document.getElementById('storeseattle');
// seattleEl.textContent = seattle.cookiesPurchased();

// var tokyoEl = document.getElementById('storetokyo');
// tokyoEl.textContent = tokyo.cookiesPurchased();

function makeList(list){
  var listElement = document.createElement('ul');
    
  });
}