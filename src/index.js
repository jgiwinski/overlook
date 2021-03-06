// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import Customer from './Customers';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
let welcomeGuest = document.querySelector('.welcome-msg');
let totalSpent = document.querySelector('.total-spent'); 

let currentGuest;

function start(values) {
  let allPeople = makeCustomers(values[0])
  currentGuest = allPeople[0];
  console.log(currentGuest)
  let allRooms = currentGuest.findRoomsBooked(values[2], values[1]);
  console.log(currentGuest.roomsBooked)
  let moneySpent = currentGuest.calculateTotalSpent();
  console.log(moneySpent)
  welcomeGuest.innerHTML = `Welcome ${currentGuest.name}`;
}

// function guestStats(currentGuest, values) {
//   let allTheRooms = currentGuest.findRoomsBooked(values[2], values[1]);
//   console.log(allTheRooms)
// }

function makeCustomers(data) {
  return data.map(customer => new Customer(customer))
}

const customerData = fetchData('/customers', 'customers')
const roomData = fetchData('/rooms', 'rooms')
const bookingData = fetchData('/bookings', 'bookings')

function fetchData(path, key) {
  return fetch(`http://localhost:3001/api/v1${path}`)
    .then(response => response.json())
    .then(data => data[key])
    .catch(error => console.log(error))
}

Promise.all([customerData, roomData, bookingData])
  .then(values => start(values))
