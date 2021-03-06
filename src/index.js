// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import './images/bathroom.jpg';
import Customer from './Customers';


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
let welcomeGuest = document.querySelector('.welcome-msg');
let totalSpent = document.querySelector('.total-spent');
// let pastReservations = document.querySelector('.past-res');
// let futureReservations = document.querySelector('.future-res');
let allReservations = document.querySelector('.all-res');

let currentGuest;

function start(values) {
  let allPeople = makeCustomers(values[0])
  currentGuest = allPeople[0];
  let allRooms = currentGuest.findRoomsBooked(values[2], values[1]);
  welcomeGuest.innerHTML = `Welcome ${currentGuest.name}`;
  totalSpent.innerHTML = `You love us this much:  ${currentGuest.calculateTotalSpent()}!`;
  currentGuest.roomsBooked.forEach((res, i) => {
    allReservations.innerHTML += `
    <img src="/images/bathroom.jpg" alt="Photo of room"/>
    <h3>Room Number: ${currentGuest.roomsBooked[i].number} - ${currentGuest.roomsBooked[i].roomType}</h3>
    <h4>CHECK-IN</h4>
    <h4>Cost: $${currentGuest.roomsBooked[i].costPerNight}</h4>
    `;
  })
}


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
